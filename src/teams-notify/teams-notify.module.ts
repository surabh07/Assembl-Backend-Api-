import { Global, Module } from '@nestjs/common';
import { TeamsNotifyService } from './teams-notify.service.js';

@Global()
@Module({
  providers: [TeamsNotifyService],
  exports: [TeamsNotifyService],
})
export class TeamsNotifyModule {}
