import { Module } from '@nestjs/common';
import { SpeakersController } from './speakers.controller.js';
import { SpeakersService } from './speakers.service.js';

@Module({
  controllers: [SpeakersController],
  providers: [SpeakersService],
  exports: [SpeakersService],
})
export class SpeakersModule {}
