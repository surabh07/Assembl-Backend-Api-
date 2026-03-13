import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SlackService {
  private readonly logger = new Logger(SlackService.name);
  private readonly enabled: boolean;
  private readonly webhookUrl: string;

  constructor(private readonly config: ConfigService) {
    this.enabled = this.config.get<boolean>('slack.enabled') ?? false;
    this.webhookUrl = this.config.get<string>('slack.webhookUrl') ?? '';
  }

  postMessage(text: string, blocks?: unknown[]): void {
    if (!this.enabled) return;

    const payload: Record<string, unknown> = { text };
    if (blocks) payload['blocks'] = blocks;

    void this.send(payload);
  }

  postOverdueDigest(count: number, eventTitle?: string): void {
    if (!this.enabled) return;

    const text = eventTitle
      ? `⚠️ *${count} overdue task(s)* for *${eventTitle}*. Check Assembl for details.`
      : `⚠️ *${count} overdue task(s)* require attention. Check Assembl.`;

    this.postMessage(text);
  }

  postEventDayBriefing(eventTitle: string, slotCount: number): void {
    if (!this.enabled) return;

    this.postMessage(`📋 *Event Day:* ${eventTitle} | ${slotCount} scheduled slot(s) today.`);
  }

  postEventStatusChange(eventTitle: string, newStatus: string): void {
    if (!this.enabled) return;

    this.postMessage(`🔔 *Event Status Update:* ${eventTitle} → *${newStatus}*`);
  }

  private async send(payload: unknown): Promise<void> {
    try {
      await axios.post(this.webhookUrl, payload);
      this.logger.log('Slack message sent');
    } catch (err) {
      this.logger.error(`Slack message failed: ${String(err)}`);
    }
  }
}
