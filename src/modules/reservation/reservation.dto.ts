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
  ArrayMinSize,
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
  @Min(1, { message: '인원수는 최소 1명 이상이어야 합니다.' })
  memberSize: number

  @IsDateString(
    {},
    { message: '올바른 날짜 형식을 입력해주세요. (YYYY-MM-DD)' },
  )
  date: Date

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: '시작 시간은 HH:mm 형식이어야 합니다. (00:00 ~ 23:59)',
  })
  startTime: string

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: '종료 시간은 HH:mm 형식이어야 합니다. (00:00 ~ 23:59)',
  })
  endTime: string

  @IsString()
  @IsNotEmpty()
  phone: string

  @IsArray()
  @ArrayMinSize(1, { message: '최소 1개의 메뉴를 선택해야 합니다.' })
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
