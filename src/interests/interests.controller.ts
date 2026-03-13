import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('interests')
@Controller('interests')
export class InterestsController {}
