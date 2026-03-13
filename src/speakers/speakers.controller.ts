import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('speakers')
@Controller('speakers')
export class SpeakersController {}
