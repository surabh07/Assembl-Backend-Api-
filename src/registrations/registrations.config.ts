import { registerAs } from '@nestjs/config';

export default registerAs('registrations', () => ({
  checkInCodeLength: parseInt(process.env['CHECK_IN_CODE_LENGTH'] ?? '8', 10),
}));
