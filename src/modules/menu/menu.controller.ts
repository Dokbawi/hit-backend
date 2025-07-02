import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { MenuService } from './menu.service'
import { UserTypeGuard } from '@src/guard/user-type.guard'
import { ReqUser, UserTypes } from '@src/decorator/auth.decorator'
import { RestaurantEntity } from '@src/entity/restaurant/restaurant.entity'
import { JwtAuthGuard } from '@src/guard/jwt-auth.guard'
import { CreateMenuDto, MenuFilterDto } from './menu.dto'

@Controller('menu')
@UseGuards(JwtAuthGuard, UserTypeGuard)
@UserTypes('restaurant')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  public async searchMenu(
    @ReqUser() restaurant: RestaurantEntity,
    @Query() query: MenuFilterDto,
  ) {
    return this.menuService.searchMenu(restaurant.id, query)
  }

  @Post()
  public async createMenu(
    @ReqUser() restaurant: RestaurantEntity,
    @Body() body: CreateMenuDto,
  ) {
    return this.menuService.createMenu(restaurant.id, body)
  }

  @Delete(':id')
  public async deleteMenu(
    @ReqUser() restaurant: RestaurantEntity,
    @Param('id') menuId: number,
  ) {
    return this.menuService.deleteMenu(restaurant.id, menuId)
  }
}
