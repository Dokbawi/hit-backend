import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/restaurant')
  public async loginRestaurant(@Body() loginDto: LoginDto) {
    return this.authService.loginRestaurant(loginDto)
  }

  @Post('login/customer')
  public async loginCustomer(@Body() loginDto: LoginDto) {
    return this.authService.loginCustomer(loginDto)
  }
}
