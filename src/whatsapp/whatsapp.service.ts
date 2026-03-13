import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import twilio from 'twilio';

export interface TaskReminderPayload {
  taskTitle: string;
  dueDate: string;
  eventTitle?: string;
}

export interface BriefingPayload {
  eventTitle: string;
  date: string;
  slotCount: number;
  slots: Array<{ title: string; startTime: string; location?: string }>;
}

export interface EventReminderPayload {
  eventTitle: string;
  startDate: string;
  location?: string;
  checkInCode: string;
  isVirtual: boolean;
}

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);
  private readonly enabled: boolean;
  private readonly client: twilio.Twilio | null = null;
  private readonly from: string;

  constructor(private readonly config: ConfigService) {
    this.enabled = this.config.get<boolean>('whatsapp.enabled') ?? false;
    this.from = this.config.get<string>('whatsapp.from') ?? '';

    if (this.enabled) {
      const accountSid = this.config.getOrThrow<string>('whatsapp.accountSid');
      const authToken = this.config.getOrThrow<string>('whatsapp.authToken');
      this.client = twilio(accountSid, authToken);
    }
  }

  sendTaskOverdue(phone: string, payload: TaskReminderPayload): void {
    if (!this.enabled || !this.client) return;

    const message =
      `⏰ Task Overdue: "${payload.taskTitle}"\n` +
      `Due: ${payload.dueDate}\n` +
      (payload.eventTitle ? `Event: ${payload.eventTitle}\n` : '') +
      `Please update the task status in Assembl.`;

    void this.send(phone, message);
  }

  sendDailyBriefing(phone: string, payload: BriefingPayload): void {
    if (!this.enabled || !this.client) return;

    const slotLines = payload.slots
      .slice(0, 3)
      .map((s) => `• ${s.startTime}: ${s.title}`)
      .join('\n');

    const message =
      `📋 Daily Briefing — ${payload.eventTitle}\n` +
      `Date: ${payload.date} | ${payload.slotCount} slot(s)\n\n` +
      slotLines;

    void this.send(phone, message);
  }

  sendEventReminder(phone: string, payload: EventReminderPayload): void {
    if (!this.enabled || !this.client) return;

    const message =
      `🎉 Event tomorrow: ${payload.eventTitle}\n` +
      `When: ${payload.startDate}\n` +
      (payload.isVirtual ? 'Format: Virtual\n' : `Where: ${payload.location ?? 'TBD'}\n`) +
      `Check-in code: ${payload.checkInCode}`;

    void this.send(phone, message);
  }

  private async send(phone: string, body: string): Promise<void> {
    if (!this.client) return;

    try {
      await this.client.messages.create({
        from: this.from,
        to: `whatsapp:${phone}`,
        body: body.slice(0, 1600),
      });
      this.logger.log(`WhatsApp sent to ${phone}`);
    } catch (err) {
      this.logger.error(`WhatsApp send failed to ${phone}: ${String(err)}`);
    }
  }
}
