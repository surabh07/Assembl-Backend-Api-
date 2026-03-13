import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  @Cron('0 9 * * *', { name: 'overdue-tasks' })
  handleOverdueTasks(): void {
    this.logger.log('Cron: checking overdue tasks');
  }

  @Cron('0 6 * * *', { name: 'event-day-briefings' })
  handleEventDayBriefings(): void {
    this.logger.log('Cron: sending event day briefings');
  }

  @Cron('0 8 * * *', { name: 'event-reminders-and-reviews' })
  handleEventRemindersAndReviews(): void {
    this.logger.log('Cron: sending event reminders and review requests');
  }
}
