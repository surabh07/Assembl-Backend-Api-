import { registerAs } from '@nestjs/config';

export default registerAs('cron', () => ({
  timezone: process.env['CRON_TIMEZONE'] ?? 'UTC',
}));
