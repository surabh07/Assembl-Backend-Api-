import { registerAs } from '@nestjs/config';

export default registerAs('tasks', () => ({
  maxAttachmentSizeMb: parseInt(process.env['TASK_MAX_ATTACHMENT_MB'] ?? '10', 10),
}));
