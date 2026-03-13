import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('check-in')
@Controller('check-in')
export class CheckInController {}
