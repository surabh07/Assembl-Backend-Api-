import { Module } from '@nestjs/common';
import { EventDayPocController } from './event-day-poc.controller.js';
import { EventDayPocService } from './event-day-poc.service.js';

@Module({
  controllers: [EventDayPocController],
  providers: [EventDayPocService],
  exports: [EventDayPocService],
})
export class EventDayPocModule {}
