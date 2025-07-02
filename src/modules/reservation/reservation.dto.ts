import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsDateString,
  Matches,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator'
import { Type } from 'class-transformer'
import { IsTimeString } from '@src/util/decorator/validation.decorator'

export class ReservationFilterDto {
  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsDateString()
  date?: Date

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  minMemberSize?: number

  @IsOptional()
  @IsString()
  menuName?: string
}

export class ReservationMenuDto {
  @IsNumber()
  menuId: number

  @IsNumber()
  @Min(1)
  quantity: number
}

export class CreateReservationDto {
  @IsNumber()
  restaurantId: number

  @IsNumber()
  @Min(1)
  memberSize: number

  @IsDateString()
  date: Date

  @IsTimeString()
  startTime: string

  @IsTimeString()
  endTime: string

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9-]+$/)
  phone: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReservationMenuDto)
  menus: ReservationMenuDto[]
}

export class UpdateReservationDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  memberSize?: number

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReservationMenuDto)
  menus?: ReservationMenuDto[]
}
