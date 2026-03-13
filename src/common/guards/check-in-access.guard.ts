import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Role } from '../../../prisma/generated/prisma/client/index.js';
import { Messages } from '../constants/messages.js';
import type { CurrentUserPayload } from '../decorators/current-user.decorator.js';
import type { Request } from 'express';

@Injectable()
export class CheckInAccessGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as CurrentUserPayload | undefined;
    const { eventId } = request.params as { eventId?: string };

    if (!user) {
      throw new ForbiddenException(Messages.auth.FORBIDDEN);
    }

    // SUPER_ADMIN and EVENT_MANAGEMENT_LEAD always pass
    if (user.role === Role.SUPER_ADMIN || user.role === Role.EVENT_MANAGEMENT_LEAD) {
      return true;
    }

    // REGISTRATION_DESK must have a desk assignment for this specific event
    if (user.role === Role.REGISTRATION_DESK) {
      if (!eventId) {
        throw new NotFoundException(Messages.events.NOT_FOUND);
      }

      const assignment = await this.prisma.eventDeskAssignment.findUnique({
        where: { eventId_userId: { eventId, userId: user.sub } },
      });

      if (!assignment) {
        throw new ForbiddenException(Messages.auth.FORBIDDEN);
      }

      return true;
    }

    throw new ForbiddenException(Messages.auth.FORBIDDEN);
  }
}
