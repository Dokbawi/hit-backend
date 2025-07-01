import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CustomerEntity } from '@src/entity/customer/customer.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  public async getCustomer() {}
}
