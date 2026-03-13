import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Messages } from '../constants/messages.js';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  handleRequest<TUser>(err: Error | null, user: TUser | false): TUser {
    if (err ?? !user) {
      throw new UnauthorizedException(Messages.auth.UNAUTHORIZED);
    }
    return user;
  }

  override canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    return super.canActivate(context) as boolean | Promise<boolean>;
  }
}
