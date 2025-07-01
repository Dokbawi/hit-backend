import { Catch, ArgumentsHost } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Request, Response } from 'express'

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host)
    const text = this.createErrorText(exception, host)

    console.error(text)
  }

  private createErrorText(exception: unknown, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>()
    const response = host.switchToHttp().getResponse<Response>()

    return `${request.method} ${request.path} ${
      response.statusMessage
    } ${JSON.stringify(exception, null, 2)}`
  }
}
