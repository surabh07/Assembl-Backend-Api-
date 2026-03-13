import { registerAs } from '@nestjs/config';

export default registerAs('supabase', () => ({
  url: process.env['SUPABASE_URL'],
  anonKey: process.env['SUPABASE_ANON_KEY'],
  serviceKey: process.env['SUPABASE_SERVICE_KEY'],
  bucket: process.env['SUPABASE_BUCKET'],
}));
