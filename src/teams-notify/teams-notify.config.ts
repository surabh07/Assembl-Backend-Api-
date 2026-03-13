import { registerAs } from '@nestjs/config';

export default registerAs('teamsNotify', () => ({
  webhookUrl: process.env['TEAMS_WEBHOOK_URL'],
  enabled: !!process.env['TEAMS_WEBHOOK_URL'],
}));
