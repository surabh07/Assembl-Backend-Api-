import { Module } from '@nestjs/common';
import { EventTemplatesController } from './event-templates.controller.js';
import { EventTemplatesService } from './event-templates.service.js';

@Module({
  controllers: [EventTemplatesController],
  providers: [EventTemplatesService],
  exports: [EventTemplatesService],
})
export class EventTemplatesModule {}
