import { Module } from '@nestjs/common';
import { AttendeesController } from './attendees.controller.js';
import { AttendeesService } from './attendees.service.js';

@Module({
  controllers: [AttendeesController],
  providers: [AttendeesService],
  exports: [AttendeesService],
})
export class AttendeesModule {}
