import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('meeting-notes')
@Controller('meeting-notes')
export class MeetingNotesController {}
