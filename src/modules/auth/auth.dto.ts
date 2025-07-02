import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  userId: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export interface JwtPayload {
  sub: number
  userId: string
  userType: 'customer' | 'restaurant'
  iat?: number
  exp?: number
}
