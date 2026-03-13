import { Module } from '@nestjs/common';
import { MeetingNotesController } from './meeting-notes.controller.js';
import { MeetingNotesService } from './meeting-notes.service.js';

@Module({
  controllers: [MeetingNotesController],
  providers: [MeetingNotesService],
  exports: [MeetingNotesService],
})
export class MeetingNotesModule {}
