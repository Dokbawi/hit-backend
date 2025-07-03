import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  FindOptionsWhere,
  In,
  IsNull,
  Like,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm'
import { ReservationStatus } from './reservation.enum'
import {
  CreateReservationDto,
  ReservationFilterDto,
  ReservationMenuDto,
  UpdateReservationDto,
} from './reservation.dto'
import { ReservationEntity } from '@src/entity/reservation/reservation.entity'
import { ReservationMenuEntity } from '@src/entity/reservation/reservation-menu.entity'
import { MenuEntity } from '@src/entity/restaurant/menu.entity'
import { CustomerEntity } from '@src/entity/customer/customer.entity'
import { RestaurantEntity } from '@src/entity/restaurant/restaurant.entity'

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,

    @InjectRepository(ReservationMenuEntity)
    private readonly reservationMenuRepository: Repository<ReservationMenuEntity>,

    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  public async searchReservation(
    user: CustomerEntity | RestaurantEntity,
    query: ReservationFilterDto,
  ) {
    const { date, minMemberSize, phone, menuName } = query
    const userType = (user as any)?.userType
    let queryBuilder = this.reservationRepository
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.reservationMenus', 'reservationMenus')
      .leftJoinAndSelect('reservationMenus.menu', 'menu')
      .andWhere('reservation.status != :cancelledStatus', {
        cancelledStatus: ReservationStatus.CANCELLED,
      })

    if (userType === 'customer') {
      queryBuilder = queryBuilder
        .leftJoinAndSelect('reservation.customer', 'customer')
        .leftJoinAndSelect('reservation.restaurant', 'restaurant')
        .andWhere('customer.id = :userId', { userId: user.id })
    } else if (userType === 'restaurant') {
      queryBuilder = queryBuilder
        .leftJoinAndSelect('reservation.restaurant', 'restaurant')
        .leftJoinAndSelect('reservation.customer', 'customer')
        .andWhere('restaurant.id = :userId', { userId: user.id })
    }

    if (phone) {
      queryBuilder = queryBuilder.andWhere('reservation.phone LIKE :phone', {
        phone: `%${phone}%`,
      })
    }

    if (date) {
      queryBuilder = queryBuilder.andWhere('reservation.date = :date', { date })
    }

    if (minMemberSize) {
      queryBuilder = queryBuilder.andWhere(
        'reservation.memberSize >= :minMemberSize',
        { minMemberSize },
      )
    }

    if (menuName) {
      const subQuery = this.reservationRepository
        .createQueryBuilder('r')
        .select('r.id')
        .leftJoin('r.reservationMenus', 'rm')
        .leftJoin('rm.menu', 'm')
        .where('m.name LIKE :menuName', { menuName: `%${menuName}%` })
        .getQuery()

      queryBuilder.andWhere(`reservation.id IN (${subQuery})`)
      queryBuilder.setParameter('menuName', `%${menuName}%`)
    }

    return await queryBuilder.orderBy('reservation.createdAt', 'DESC').getMany()
  }

  public async createReservation(
    customerId: number,
    body: CreateReservationDto,
  ) {
    const { date, endTime, startTime, restaurantId, memberSize, phone, menus } =
      body

    await this.validateMenusExist(restaurantId, menus)

    this.validateReservationTime(startTime, endTime)

    await this.validateReservationConflict(
      restaurantId,
      date,
      startTime,
      endTime,
    )

    const queryRunner =
      this.reservationRepository.manager.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const reservation = this.reservationRepository.create({
        customerId,
        date,
        startTime,
        endTime,
        restaurantId,
        memberSize,
        phone,
      })

      const savedReservation = await queryRunner.manager.save(reservation)

      if (menus && menus.length > 0) {
        const reservationMenus = menus.map((menu) =>
          this.reservationMenuRepository.create({
            reservationId: savedReservation.id,
            menuId: menu.menuId,
            quantity: menu.quantity,
          }),
        )

        await queryRunner.manager.save(reservationMenus)
      }

      await queryRunner.commitTransaction()

      return await this.reservationRepository.findOne({
        where: { id: savedReservation.id },
        relations: [
          'customer',
          'restaurant',
          'reservationMenus',
          'reservationMenus.menu',
        ],
      })
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new BadRequestException('예약 생성 중 오류가 발생했습니다.')
    } finally {
      await queryRunner.release()
    }
  }

  private async validateMenusExist(
    restaurantId: number,
    menus: ReservationMenuDto[],
  ) {
    const menuIds = menus?.map((menu) => menu.menuId)
    const existingMenus = await this.menuRepository.find({
      where: {
        id: In(menuIds),
        restaurantId,
        deletedAt: IsNull(),
      },
    })

    if (existingMenus.length !== menuIds.length) {
      const existingMenuIds = existingMenus.map((menu) => menu.id)
      const missingMenuIds = menuIds.filter(
        (id) => !existingMenuIds.includes(id),
      )
      throw new BadRequestException(
        `존재하지 않는 메뉴가 포함되어 있습니다: ${missingMenuIds.join(', ')}`,
      )
    }
  }

  private validateReservationTime(startTime: string, endTime: string) {
    if (startTime >= endTime) {
      throw new BadRequestException(
        '시작 시간은 종료 시간보다 이전이어야 합니다.',
      )
    }
  }

  private async validateReservationConflict(
    restaurantId: number,
    date: Date,
    startTime: string,
    endTime: string,
  ) {
    const overlappingReservation = await this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.restaurantId = :restaurantId', { restaurantId })
      .andWhere('reservation.date = :date', { date })
      .andWhere('reservation.status != :cancelledStatus', {
        cancelledStatus: ReservationStatus.CANCELLED,
      })
      .andWhere('reservation.deletedAt IS NULL')
      .andWhere(
        '(reservation.startTime < :endTime AND reservation.endTime > :startTime)',
        { startTime, endTime },
      )
      .getOne()

    if (overlappingReservation) {
      throw new BadRequestException(
        `해당 시간대에 이미 예약이 존재합니다: ${date} ${startTime} ~ ${endTime}`,
      )
    }
  }

  public async updateReservation(
    customerId: number,
    reservationId: number,
    body: UpdateReservationDto,
  ) {
    const { memberSize, menus } = body

    const existingReservation = await this.reservationRepository.findOne({
      where: {
        id: reservationId,
        customerId,
        deletedAt: IsNull(),
      },
      relations: ['reservationMenus'],
    })

    if (!existingReservation) {
      throw new BadRequestException('존재하지 않는 예약입니다.')
    }

    if (existingReservation.status === ReservationStatus.CANCELLED) {
      throw new BadRequestException('취소된 예약은 수정할 수 없습니다.')
    }

    if (menus) {
      await this.validateMenusExist(existingReservation.restaurantId, menus)
    }

    const queryRunner =
      this.reservationRepository.manager.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      if (memberSize !== undefined) {
        existingReservation.memberSize = memberSize
        await queryRunner.manager.save(existingReservation)
      }

      if (menus !== undefined) {
        await queryRunner.manager.delete(ReservationMenuEntity, {
          reservationId,
        })

        if (menus.length > 0) {
          const newReservationMenus = menus.map((menu) =>
            this.reservationMenuRepository.create({
              reservationId,
              menuId: menu.menuId,
              quantity: menu.quantity,
            }),
          )

          await queryRunner.manager.save(newReservationMenus)
        }
      }

      await queryRunner.commitTransaction()

      return await this.reservationRepository.findOne({
        where: { id: reservationId },
        relations: [
          'customer',
          'restaurant',
          'reservationMenus',
          'reservationMenus.menu',
        ],
      })
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new BadRequestException('예약 수정 중 오류가 발생했습니다.')
    } finally {
      await queryRunner.release()
    }
  }

  public async deleteReservation(customerId: number, reservationId: number) {
    const existingReservation = await this.reservationRepository.findOne({
      where: {
        customerId,
        id: reservationId,
      },
    })

    if (!existingReservation) {
      throw new BadRequestException('존재하지 않는 예약입니다.')
    }

    if (existingReservation.status === ReservationStatus.CANCELLED) {
      throw new BadRequestException('이미 취소된 예약입니다.')
    }

    existingReservation.status = ReservationStatus.CANCELLED

    const cancelledReservation =
      await this.reservationRepository.save(existingReservation)

    return {
      message: '예약이 성공적으로 취소되었습니다.',
      reservation: cancelledReservation,
    }
  }
}
