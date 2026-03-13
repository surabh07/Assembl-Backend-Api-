import { registerAs } from '@nestjs/config';

export default registerAs('googleCalendar', () => ({
  clientId: process.env['GOOGLE_CALENDAR_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CALENDAR_CLIENT_SECRET'],
  redirectUri: process.env['GOOGLE_CALENDAR_REDIRECT_URI'],
  calendarId: process.env['GOOGLE_CALENDAR_ID'],
  enabled: !!(
    process.env['GOOGLE_CALENDAR_CLIENT_ID'] && process.env['GOOGLE_CALENDAR_CLIENT_SECRET']
  ),
}));
