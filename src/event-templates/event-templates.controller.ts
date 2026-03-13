import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('event-templates')
@Controller('event-templates')
export class EventTemplatesController {}
