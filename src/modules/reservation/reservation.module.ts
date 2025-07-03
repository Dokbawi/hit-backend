import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReservationController } from './reservation.controller'
import { ReservationService } from './reservation.service'
import { ReservationEntity } from '@src/entity/reservation/reservation.entity'
import { ReservationMenuEntity } from '@src/entity/reservation/reservation-menu.entity'
import { MenuEntity } from '@src/entity/restaurant/menu.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservationEntity,
      ReservationMenuEntity,
      MenuEntity,
    ]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [],
})
export class ReservationModule {}
