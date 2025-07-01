import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as morgan from 'morgan'
import { AllExceptionFilter } from './filter/all-exceptions.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const { httpAdapter } = app.get(HttpAdapterHost)

  app.useGlobalPipes(new ValidationPipe())
  app.use(morgan(':method :url :status'))
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter))

  await app.listen(3000)
}
bootstrap()
