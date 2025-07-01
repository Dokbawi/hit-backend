import { Body, Controller, Get, Post } from '@nestjs/common'
import { CustomerService } from './customer.service'

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('')
  public async login() {}
}
