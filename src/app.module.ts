import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { mysqlConfig } from './util/typeorm'
import { MenuModule } from './modules/menu/menu.module'
import { AuthModule } from './modules/auth/auth.module'
import { ReservationModule } from './modules/reservation/reservation.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => mysqlConfig,
    }),
    MenuModule,
    ReservationModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
