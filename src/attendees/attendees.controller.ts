import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('attendees')
@Controller('attendees')
export class AttendeesController {}
