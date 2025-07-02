import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { CustomerEntity } from '@src/entity/customer/customer.entity'
import { RestaurantEntity } from '@src/entity/restaurant/restaurant.entity'
import { JwtPayload, LoginDto } from './auth.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
    @InjectRepository(RestaurantEntity)
    private restaurantRepository: Repository<RestaurantEntity>,
    private jwtService: JwtService,
  ) {}

  // 고객 로그인
  async loginCustomer(loginDto: LoginDto) {
    const customer = await this.customerRepository.findOne({
      where: { userId: loginDto.userId },
    })

    if (
      !customer ||
      !bcrypt.compareSync(loginDto.password, customer.password)
    ) {
      throw new UnauthorizedException('로그인 정보가 잘못되었습니다.')
    }

    const payload: JwtPayload = {
      sub: customer.id,
      userId: customer.userId,
      userType: 'customer',
    }

    return {
      access_token: this.jwtService.sign(payload),
      userType: 'customer',
      user: {
        id: customer.id,
        userId: customer.userId,
        name: customer.name,
      },
    }
  }

  // 식당 로그인
  async loginRestaurant(loginDto: LoginDto) {
    const restaurant = await this.restaurantRepository.findOne({
      where: { userId: loginDto.userId },
    })

    if (
      !restaurant ||
      !bcrypt.compareSync(loginDto.password, restaurant.password)
    ) {
      throw new UnauthorizedException('로그인 정보가 잘못되었습니다.')
    }

    const payload: JwtPayload = {
      sub: restaurant.id,
      userId: restaurant.userId,
      userType: 'restaurant',
    }

    return {
      access_token: this.jwtService.sign(payload),
      userType: 'restaurant',
      user: {
        id: restaurant.id,
        userId: restaurant.userId,
        name: restaurant.name,
        phone: restaurant.phone,
      },
    }
  }

  // JWT 토큰 검증 및 사용자 정보 반환
  async validateUser(payload: JwtPayload) {
    if (payload.userType === 'customer') {
      const customer = await this.customerRepository.findOne({
        where: { id: payload.sub },
      })

      if (!customer) {
        return null
      }

      return { ...customer, userType: 'customer' }
    } else if (payload.userType === 'restaurant') {
      const restaurant = await this.restaurantRepository.findOne({
        where: { id: payload.sub },
      })

      if (!restaurant) {
        return null
      }

      return { ...restaurant, userType: 'restaurant' }
    }

    return null
  }
}
