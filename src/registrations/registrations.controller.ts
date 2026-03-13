import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('registrations')
@Controller('registrations')
export class RegistrationsController {}
