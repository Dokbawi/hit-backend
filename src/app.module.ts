import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { mysqlConfig } from './util/typeorm'
import { customerModule } from './modules/customer/customer.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => mysqlConfig,
    }),
    customerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
