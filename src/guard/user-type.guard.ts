import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { USER_TYPES_KEY, UserType } from '@src/util/decorator/auth.decorator'

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredUserTypes = this.reflector.getAllAndOverride<UserType[]>(
      USER_TYPES_KEY,
      [context.getHandler(), context.getClass()],
    )

    if (!requiredUserTypes) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    return requiredUserTypes.some((type) => type === user.userType)
  }
}
