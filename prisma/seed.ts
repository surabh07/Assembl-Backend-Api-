import 'dotenv/config';
import { PrismaClient } from './generated/prisma/client/index.js';
import { TEMPLATE_DEFAULTS } from '../src/common/constants/template-defaults.constant.js';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('Seeding database...');

  // Seed built-in event templates (organizationId = null)
  const templates = [
    {
      name: 'Hackathon',
      description: 'Template for hackathon events',
      templateType: 'HACKATHON' as const,
      defaultFields: TEMPLATE_DEFAULTS.HACKATHON,
      isActive: true,
    },
    {
      name: 'Conference',
      description: 'Template for conference events',
      templateType: 'CONFERENCE' as const,
      defaultFields: TEMPLATE_DEFAULTS.CONFERENCE,
      isActive: true,
    },
    {
      name: 'Concert',
      description: 'Template for concert events',
      templateType: 'CONCERT' as const,
      defaultFields: TEMPLATE_DEFAULTS.CONCERT,
      isActive: true,
    },
    {
      name: 'Workshop',
      description: 'Template for workshop events',
      templateType: 'WORKSHOP' as const,
      defaultFields: TEMPLATE_DEFAULTS.WORKSHOP,
      isActive: true,
    },
    {
      name: 'Meetup',
      description: 'Template for meetup events',
      templateType: 'MEETUP' as const,
      defaultFields: TEMPLATE_DEFAULTS.MEETUP,
      isActive: true,
    },
    {
      name: 'Seminar',
      description: 'Template for seminar events',
      templateType: 'SEMINAR' as const,
      defaultFields: TEMPLATE_DEFAULTS.SEMINAR,
      isActive: true,
    },
  ];

  for (const template of templates) {
    const existing = await prisma.eventTemplate.findFirst({
      where: {
        templateType: template.templateType,
        organizationId: null,
      },
    });

    if (!existing) {
      await prisma.eventTemplate.create({ data: template });
      console.log(`Created template: ${template.name}`);
    } else {
      console.log(`Template already exists: ${template.name}`);
    }
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
