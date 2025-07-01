import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomerController } from './customer.controller'
import { CustomerService } from './customer.service'
import { CustomerEntity } from '@src/entity/customer/customer.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [],
})
export class customerModule {}
