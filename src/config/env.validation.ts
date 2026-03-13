import Joi from 'joi';

export const envValidationSchema = Joi.object({
  // App
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),

  // Database (NeonDB pooled connection string)
  DATABASE_URL: Joi.string().required().description('NeonDB pooled connection string'),

  // JWT
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_REFRESH_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES_IN: Joi.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),

  // SMTP
  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.number().default(587),
  SMTP_USER: Joi.string().required(),
  SMTP_PASS: Joi.string().required(),
  SMTP_FROM: Joi.string().required(),

  // Frontend
  FRONTEND_URL: Joi.string().uri().required(),

  // Optional: Twilio WhatsApp
  TWILIO_ACCOUNT_SID: Joi.string().optional(),
  TWILIO_AUTH_TOKEN: Joi.string().optional(),
  TWILIO_WHATSAPP_FROM: Joi.string().optional(),

  // Optional: Microsoft Teams webhook
  TEAMS_WEBHOOK_URL: Joi.string().uri().optional(),

  // Optional: Slack webhook
  SLACK_WEBHOOK_URL: Joi.string().uri().optional(),

  // Optional: Discord webhook
  DISCORD_WEBHOOK_URL: Joi.string().uri().optional(),

  // Optional: Google Calendar OAuth
  GOOGLE_CALENDAR_CLIENT_ID: Joi.string().optional(),
  GOOGLE_CALENDAR_CLIENT_SECRET: Joi.string().optional(),
  GOOGLE_CALENDAR_REDIRECT_URI: Joi.string().uri().optional(),
  GOOGLE_CALENDAR_ID: Joi.string().optional(),
});
