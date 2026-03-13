import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../../prisma/generated/prisma/client/index.js';
import { ROLES_KEY } from '../decorators/roles.decorator.js';
import { Messages } from '../constants/messages.js';
import type { CurrentUserPayload } from '../decorators/current-user.decorator.js';
import type { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as CurrentUserPayload | undefined;

    if (!user) {
      throw new ForbiddenException(Messages.auth.FORBIDDEN);
    }

    const hasRole = requiredRoles.some((role) => user.role === role);
    if (!hasRole) {
      throw new ForbiddenException(Messages.auth.FORBIDDEN);
    }

    return true;
  }
}
