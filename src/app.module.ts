import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';

import { envValidationSchema } from './config/env.validation.js';

// Config registrations
import authConfig from './auth/auth.config.js';
import mailConfig from './mail/mail.config.js';
import supabaseConfig from './supabase/supabase.config.js';
import cronConfig from './cron/cron.config.js';
import tasksConfig from './tasks/tasks.config.js';
import registrationsConfig from './registrations/registrations.config.js';
import whatsappConfig from './whatsapp/whatsapp.config.js';
import teamsNotifyConfig from './teams-notify/teams-notify.config.js';
import slackConfig from './slack/slack.config.js';
import discordConfig from './discord/discord.config.js';
import googleCalendarConfig from './google-calendar/google-calendar.config.js';

// Core modules
import { PrismaModule } from './prisma/prisma.module.js';

// Integration modules
import { SupabaseModule } from './supabase/supabase.module.js';
import { WhatsappModule } from './whatsapp/whatsapp.module.js';
import { TeamsNotifyModule } from './teams-notify/teams-notify.module.js';
import { SlackModule } from './slack/slack.module.js';
import { DiscordModule } from './discord/discord.module.js';
import { GoogleCalendarModule } from './google-calendar/google-calendar.module.js';

// Feature modules
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { ProfileModule } from './profile/profile.module.js';
import { DashboardModule } from './dashboard/dashboard.module.js';
import { SearchModule } from './search/search.module.js';
import { ActivityModule } from './activity/activity.module.js';
import { EventsModule } from './events/events.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { OrganizationsModule } from './organizations/organizations.module.js';
import { SpeakersModule } from './speakers/speakers.module.js';
import { EventTemplatesModule } from './event-templates/event-templates.module.js';
import { MediaModule } from './media/media.module.js';
import { TeamsModule } from './teams/teams.module.js';
import { ScheduleSlotModule } from './schedule/schedule.module.js';
import { EventDayPocModule } from './event-day-poc/event-day-poc.module.js';
import { CheckInModule } from './check-in/check-in.module.js';
import { AttendeesModule } from './attendees/attendees.module.js';
import { InterestsModule } from './interests/interests.module.js';
import { GalleryModule } from './gallery/gallery.module.js';
import { ReviewsModule } from './reviews/reviews.module.js';
import { MeetingNotesModule } from './meeting-notes/meeting-notes.module.js';
import { NotificationsModule } from './notifications/notifications.module.js';
import { InsightsModule } from './insights/insights.module.js';
import { AuditLogsModule } from './audit-logs/audit-logs.module.js';
import { RegistrationsModule } from './registrations/registrations.module.js';
import { CronModule } from './cron/cron.module.js';
import { MailModule } from './mail/mail.module.js';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
      load: [
        authConfig,
        mailConfig,
        supabaseConfig,
        cronConfig,
        tasksConfig,
        registrationsConfig,
        whatsappConfig,
        teamsNotifyConfig,
        slackConfig,
        discordConfig,
        googleCalendarConfig,
      ],
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    // Cron scheduling
    ScheduleModule.forRoot(),

    // Core
    PrismaModule,

    // Mail
    MailModule,

    // Integrations
    SupabaseModule,
    WhatsappModule,
    TeamsNotifyModule,
    SlackModule,
    DiscordModule,
    GoogleCalendarModule,

    // Features
    AuthModule,
    UsersModule,
    ProfileModule,
    DashboardModule,
    SearchModule,
    ActivityModule,
    EventsModule,
    CategoriesModule,
    OrganizationsModule,
    SpeakersModule,
    EventTemplatesModule,
    MediaModule,
    TeamsModule,
    ScheduleSlotModule,
    EventDayPocModule,
    CheckInModule,
    AttendeesModule,
    InterestsModule,
    GalleryModule,
    ReviewsModule,
    MeetingNotesModule,
    NotificationsModule,
    InsightsModule,
    AuditLogsModule,
    RegistrationsModule,
    CronModule,
  ],
})
export class AppModule {}
