import { IsOptional, IsString, IsNumber, Min, IsEnum } from 'class-validator'
import { MenuCategory } from './menu.enum'
import { Type } from 'class-transformer'

export class MenuFilterDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  minPrice?: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  maxPrice?: number
}

export class CreateMenuDto {
  @IsString()
  name: string

  @IsEnum(MenuCategory)
  category: MenuCategory

  @IsNumber()
  @Min(0)
  price: number

  @IsString()
  description: string
}
