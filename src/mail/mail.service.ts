import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: nodemailer.Transporter;
  private readonly templatesDir: string;
  private readonly from: string;
  private readonly frontendUrl: string;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.getOrThrow<string>('mail.host'),
      port: this.config.getOrThrow<number>('mail.port'),
      secure: false,
      auth: {
        user: this.config.getOrThrow<string>('mail.user'),
        pass: this.config.getOrThrow<string>('mail.pass'),
      },
    });

    this.from = this.config.getOrThrow<string>('mail.from');
    this.frontendUrl = this.config.get<string>('mail.frontendUrl') ?? '';
    // Templates are at project root /templates/ — dist is at /dist/
    this.templatesDir = path.resolve(__dirname, '../../..', 'templates');
  }

  async sendWelcome(email: string, name: string): Promise<void> {
    await this.send(email, 'Welcome to Assembl!', 'welcome', {
      name,
      frontendUrl: this.frontendUrl,
    });
  }

  async sendPasswordReset(email: string, name: string, resetUrl: string): Promise<void> {
    await this.send(email, 'Reset your Assembl password', 'password-reset', {
      name,
      resetUrl,
    });
  }

  async sendRegistrationConfirmation(
    email: string,
    name: string,
    eventTitle: string,
    checkInCode: string,
    startDate: string,
    location: string | null,
    isVirtual: boolean,
    icsAttachment?: Buffer,
  ): Promise<void> {
    await this.send(
      email,
      `Registration Confirmed: ${eventTitle}`,
      'registration-confirmation',
      { name, eventTitle, checkInCode, startDate, location, isVirtual },
      icsAttachment
        ? [{ filename: 'event.ics', content: icsAttachment, contentType: 'text/calendar' }]
        : undefined,
    );
  }

  async sendEventReminder(
    email: string,
    name: string,
    eventTitle: string,
    startDate: string,
    location: string | null,
    isVirtual: boolean,
    checkInCode: string,
  ): Promise<void> {
    await this.send(email, `Reminder: ${eventTitle} is tomorrow!`, 'event-reminder', {
      name,
      eventTitle,
      startDate,
      location,
      isVirtual,
      checkInCode,
    });
  }

  async sendReviewRequest(
    email: string,
    name: string,
    eventTitle: string,
    reviewUrl: string,
  ): Promise<void> {
    await this.send(email, `How was ${eventTitle}? Share your review`, 'review-request', {
      name,
      eventTitle,
      reviewUrl,
    });
  }

  async sendTaskAssigned(
    email: string,
    name: string,
    taskTitle: string,
    eventTitle?: string,
    dueDate?: string,
  ): Promise<void> {
    await this.send(email, `Task assigned: ${taskTitle}`, 'task-assigned', {
      name,
      taskTitle,
      eventTitle,
      dueDate,
    });
  }

  async sendTaskOverdue(
    email: string,
    name: string,
    taskTitle: string,
    dueDate: string,
    eventTitle?: string,
  ): Promise<void> {
    await this.send(email, `Overdue task: ${taskTitle}`, 'task-overdue', {
      name,
      taskTitle,
      dueDate,
      eventTitle,
    });
  }

  async sendDailyBriefing(
    email: string,
    name: string,
    eventTitle: string,
    date: string,
    slots: Array<{ title: string; startTime: string; location?: string }>,
  ): Promise<void> {
    await this.send(email, `Today's briefing: ${eventTitle}`, 'daily-briefing', {
      name,
      eventTitle,
      date,
      slots,
    });
  }

  async sendEventBlast(
    email: string,
    subject: string,
    eventTitle: string,
    bodyHtml: string,
  ): Promise<void> {
    await this.send(email, subject, 'event-blast', { eventTitle, bodyHtml });
  }

  async sendMeetingNotesBroadcast(
    email: string,
    name: string,
    noteTitle: string,
    content: string,
    actionItems: string[],
    noteUrl: string,
  ): Promise<void> {
    await this.send(email, `Meeting Notes: ${noteTitle}`, 'meeting-notes-broadcast', {
      name,
      noteTitle,
      content,
      actionItems,
      noteUrl,
    });
  }

  private compileTemplate(templateName: string, context: Record<string, unknown>): string {
    const templatePath = path.join(this.templatesDir, `${templateName}.hbs`);
    const source = fs.readFileSync(templatePath, 'utf-8');
    const template = Handlebars.compile(source);
    return template({ ...context, year: new Date().getFullYear() });
  }

  private async send(
    to: string,
    subject: string,
    templateName: string,
    context: Record<string, unknown>,
    attachments?: nodemailer.SendMailOptions['attachments'],
  ): Promise<void> {
    try {
      const html = this.compileTemplate(templateName, context);
      await this.transporter.sendMail({ from: this.from, to, subject, html, attachments });
      this.logger.log(`Email sent to ${to}: ${subject}`);
    } catch (err) {
      this.logger.error(`Failed to send email to ${to}: ${String(err)}`);
    }
  }
}
