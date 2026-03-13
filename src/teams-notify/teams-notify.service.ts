import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface OverdueTask {
  title: string;
  assignee: string;
  eventTitle?: string;
  dueDate: string;
}

@Injectable()
export class TeamsNotifyService {
  private readonly logger = new Logger(TeamsNotifyService.name);
  private readonly enabled: boolean;
  private readonly webhookUrl: string;

  constructor(private readonly config: ConfigService) {
    this.enabled = this.config.get<boolean>('teamsNotify.enabled') ?? false;
    this.webhookUrl = this.config.get<string>('teamsNotify.webhookUrl') ?? '';
  }

  postOverdueTaskDigest(tasks: OverdueTask[]): void {
    if (!this.enabled || tasks.length === 0) return;

    const rows = tasks.slice(0, 10).map((t) => ({
      type: 'TableRow',
      cells: [
        { type: 'TableCell', items: [{ type: 'TextBlock', text: t.title }] },
        { type: 'TableCell', items: [{ type: 'TextBlock', text: t.assignee }] },
        { type: 'TableCell', items: [{ type: 'TextBlock', text: t.dueDate }] },
      ],
    }));

    const card = this.buildCard(
      `⚠️ ${tasks.length} Overdue Task(s)`,
      `The following tasks are overdue as of today. Please take action.`,
      rows.length > 0
        ? [
            {
              type: 'TextBlock',
              text: rows
                .map(
                  (r) =>
                    `• ${String(r.cells[0]?.items[0]?.text ?? '')} (${String(r.cells[1]?.items[0]?.text ?? '')})`,
                )
                .join('\n'),
            },
          ]
        : [],
    );

    void this.post(card);
  }

  postDailyBriefingSummary(eventTitle: string, slotCount: number): void {
    if (!this.enabled) return;

    const card = this.buildCard(
      `📋 Event Day Briefing: ${eventTitle}`,
      `Today's event has ${slotCount} schedule slot(s). Check Assembl for full details.`,
      [],
    );

    void this.post(card);
  }

  postEventUpdate(eventTitle: string, change: string): void {
    if (!this.enabled) return;

    const card = this.buildCard(`🔔 Event Update: ${eventTitle}`, change, []);

    void this.post(card);
  }

  private buildCard(title: string, text: string, _extraBody: unknown[]): unknown {
    return {
      type: 'message',
      attachments: [
        {
          contentType: 'application/vnd.microsoft.card.adaptive',
          content: {
            $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
            type: 'AdaptiveCard',
            version: '1.4',
            body: [
              { type: 'TextBlock', text: title, weight: 'Bolder', size: 'Medium' },
              { type: 'TextBlock', text, wrap: true },
            ],
          },
        },
      ],
    };
  }

  private async post(card: unknown): Promise<void> {
    try {
      await axios.post(this.webhookUrl, card);
      this.logger.log('Teams notification sent');
    } catch (err) {
      this.logger.error(`Teams notification failed: ${String(err)}`);
    }
  }
}
