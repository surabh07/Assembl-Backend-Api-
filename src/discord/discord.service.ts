import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class DiscordService {
  private readonly logger = new Logger(DiscordService.name);
  private readonly enabled: boolean;
  private readonly webhookUrl: string;

  constructor(private readonly config: ConfigService) {
    this.enabled = this.config.get<boolean>('discord.enabled') ?? false;
    this.webhookUrl = this.config.get<string>('discord.webhookUrl') ?? '';
  }

  postMessage(content: string, embeds?: unknown[]): void {
    if (!this.enabled) return;

    const payload: Record<string, unknown> = { content };
    if (embeds) payload['embeds'] = embeds;

    void this.send(payload);
  }

  postEventPublished(eventTitle: string, eventSlug: string, frontendUrl: string): void {
    if (!this.enabled) return;

    this.postMessage(
      `🎉 **New Event Published:** ${eventTitle}\n${frontendUrl}/events/${eventSlug}`,
    );
  }

  postEventDayReminder(eventTitle: string): void {
    if (!this.enabled) return;

    this.postMessage(`📅 **Today's Event:** ${eventTitle} — Check Assembl for your schedule.`);
  }

  postReviewRequest(eventTitle: string): void {
    if (!this.enabled) return;

    this.postMessage(
      `⭐ **Post-event Review:** How was ${eventTitle}? Share your feedback in Assembl!`,
    );
  }

  private async send(payload: unknown): Promise<void> {
    try {
      await axios.post(this.webhookUrl, payload);
      this.logger.log('Discord message sent');
    } catch (err) {
      this.logger.error(`Discord message failed: ${String(err)}`);
    }
  }
}
