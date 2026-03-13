import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {}
