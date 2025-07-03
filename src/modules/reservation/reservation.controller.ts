import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ReservationService } from './reservation.service'
import { UserTypeGuard } from '@src/guard/user-type.guard'
import { ReqUser, UserTypes } from '@src/util/decorator/auth.decorator'
import { JwtAuthGuard } from '@src/guard/jwt-auth.guard'
import { CustomerEntity } from '@src/entity/customer/customer.entity'
import {
  CreateReservationDto,
  ReservationFilterDto,
  UpdateReservationDto,
} from './reservation.dto'
import { RestaurantEntity } from '@src/entity/restaurant/restaurant.entity'

@Controller('reservation')
@UseGuards(JwtAuthGuard, UserTypeGuard)
@UserTypes('customer')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  @UserTypes('customer', 'restaurant')
  public async searchReservation(
    @ReqUser() user: CustomerEntity | RestaurantEntity,
    @Query() query: ReservationFilterDto,
  ) {
    return this.reservationService.searchReservation(user, query)
  }

  @Post()
  public async createReservation(
    @ReqUser() customer: CustomerEntity,
    @Body() body: CreateReservationDto,
  ) {
    return this.reservationService.createReservation(customer.id, body)
  }

  @Put(':id')
  public async updateReservation(
    @ReqUser() customer: CustomerEntity,
    @Param('id') reservationId: number,
    @Body() body: UpdateReservationDto,
  ) {
    return this.reservationService.updateReservation(
      customer.id,
      reservationId,
      body,
    )
  }

  @Delete(':id')
  public async deleteReservation(
    @ReqUser() customer: CustomerEntity,
    @Param('id') reservationId: number,
  ) {
    return this.reservationService.deleteReservation(customer.id, reservationId)
  }
}
