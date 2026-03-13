import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, calendar_v3 } from 'googleapis';

export interface CalendarEventPayload {
  id: string;
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  isVirtual?: boolean;
}

@Injectable()
export class GoogleCalendarService {
  private readonly logger = new Logger(GoogleCalendarService.name);
  private readonly enabled: boolean;
  private readonly calendarId: string;
  private calendar: calendar_v3.Calendar | null = null;

  constructor(private readonly config: ConfigService) {
    this.enabled = this.config.get<boolean>('googleCalendar.enabled') ?? false;
    this.calendarId = this.config.get<string>('googleCalendar.calendarId') ?? 'primary';

    if (this.enabled) {
      const clientId = this.config.getOrThrow<string>('googleCalendar.clientId');
      const clientSecret = this.config.getOrThrow<string>('googleCalendar.clientSecret');
      const redirectUri = this.config.getOrThrow<string>('googleCalendar.redirectUri');

      const auth = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
      this.calendar = google.calendar({ version: 'v3', auth });
    }
  }

  syncEvent(event: CalendarEventPayload): void {
    if (!this.enabled || !this.calendar) return;
    void this.upsertEvent(event);
  }

  private async upsertEvent(event: CalendarEventPayload): Promise<void> {
    if (!this.calendar) return;

    try {
      const resource: calendar_v3.Schema$Event = {
        summary: event.title,
        description: event.description,
        location: event.location,
        start: { dateTime: event.startDate.toISOString() },
        end: { dateTime: event.endDate.toISOString() },
      };

      // Check if event already exists by extendedProperties
      const existing = await this.calendar.events.list({
        calendarId: this.calendarId,
        privateExtendedProperty: [`assembl_event_id=${event.id}`],
      });

      if (existing.data.items && existing.data.items.length > 0) {
        const existingId = existing.data.items[0]?.id;
        if (existingId) {
          await this.calendar.events.update({
            calendarId: this.calendarId,
            eventId: existingId,
            requestBody: resource,
          });
          this.logger.log(`Google Calendar event updated: ${event.title}`);
          return;
        }
      }

      await this.calendar.events.insert({
        calendarId: this.calendarId,
        requestBody: {
          ...resource,
          extendedProperties: { private: { assembl_event_id: event.id } },
        },
      });

      this.logger.log(`Google Calendar event created: ${event.title}`);
    } catch (err) {
      this.logger.error(`Google Calendar sync failed: ${String(err)}`);
    }
  }
}
