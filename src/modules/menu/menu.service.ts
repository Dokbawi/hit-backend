import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MenuEntity } from '@src/entity/restaurant/menu.entity'
import {
  Between,
  FindOptionsWhere,
  IsNull,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm'
import { CreateMenuDto, MenuFilterDto } from './menu.dto'

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  public async searchMenu(restaurantId: number, query: MenuFilterDto) {
    const { maxPrice, minPrice, name } = query

    const whereConditions = {
      restaurantId,
      deletedAt: IsNull(),
    } as FindOptionsWhere<MenuEntity>

    if (name) {
      whereConditions.name = Like(`%${name}%`)
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      whereConditions.price = Between(minPrice, maxPrice)
    } else if (minPrice !== undefined) {
      whereConditions.price = MoreThanOrEqual(minPrice)
    } else if (maxPrice !== undefined) {
      whereConditions.price = LessThanOrEqual(maxPrice)
    }

    return await this.menuRepository.find({
      where: whereConditions,
      order: {
        createdAt: 'DESC',
      },
    })
  }

  public async createMenu(restaurantId: number, body: CreateMenuDto) {
    const { category, name, price, description } = body

    const existingMenu = await this.menuRepository.findOne({
      where: {
        restaurantId,
        name,
        deletedAt: IsNull(),
      },
    })

    if (existingMenu) {
      throw new BadRequestException(`이미 존재하는 메뉴입니다: ${name}`)
    }

    try {
      const menu = this.menuRepository.create({
        restaurantId,
        category,
        name,
        price,
        description,
      })

      const savedMenu = await this.menuRepository.save(menu)
      return savedMenu
    } catch (error) {
      throw new BadRequestException('메뉴 생성 중 오류가 발생했습니다. ')
    }
  }

  public async deleteMenu(restaurantId: number, menuId: number) {
    const existingMenu = await this.menuRepository.findOne({
      where: {
        restaurantId,
        id: menuId,
        deletedAt: IsNull(),
      },
    })

    if (!existingMenu) {
      throw new BadRequestException('존재하지 않는 메뉴입니다.')
    }

    // soft delete
    existingMenu.deletedAt = new Date()
    const deletedMenu = await this.menuRepository.save(existingMenu)

    return deletedMenu
  }
}
