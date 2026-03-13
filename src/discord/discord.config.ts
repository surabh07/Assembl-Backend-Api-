import { registerAs } from '@nestjs/config';

export default registerAs('discord', () => ({
  webhookUrl: process.env['DISCORD_WEBHOOK_URL'],
  enabled: !!process.env['DISCORD_WEBHOOK_URL'],
}));
