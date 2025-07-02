import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { SetMetadata } from '@nestjs/common'

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  },
)

export type UserType = 'customer' | 'restaurant'
export const USER_TYPES_KEY = 'userTypes'
export const UserTypes = (...userTypes: UserType[]) =>
  SetMetadata(USER_TYPES_KEY, userTypes)
