import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MenuController } from './menu.controller'
import { MenuService } from './menu.service'
import { MenuEntity } from '@src/entity/restaurant/menu.entity'

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity])],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [],
})
export class MenuModule {}
