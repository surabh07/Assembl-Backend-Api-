import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '../../prisma/generated/prisma/client/index.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // PrismaNeon takes PoolConfig — manages pool internally
    const adapter = new PrismaNeon({ connectionString: process.env['DATABASE_URL']! });
    super({ adapter });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
