import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { mysqlConfig } from './util/typeorm'
import { MenuModule } from './modules/menu/menu.module'
import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => mysqlConfig,
    }),
    MenuModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
