import { registerAs } from '@nestjs/config';

export default registerAs('slack', () => ({
  webhookUrl: process.env['SLACK_WEBHOOK_URL'],
  enabled: !!process.env['SLACK_WEBHOOK_URL'],
}));
