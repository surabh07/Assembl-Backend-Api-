import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private readonly client: SupabaseClient;
  private readonly bucket: string;

  constructor(private readonly config: ConfigService) {
    const url = this.config.getOrThrow<string>('supabase.url');
    const serviceKey = this.config.getOrThrow<string>('supabase.serviceKey');
    this.bucket = this.config.getOrThrow<string>('supabase.bucket');
    this.client = createClient(url, serviceKey);
  }

  async uploadFile(
    path: string,
    buffer: Buffer,
    mimeType: string,
  ): Promise<{ path: string; publicUrl: string }> {
    const { data, error } = await this.client.storage
      .from(this.bucket)
      .upload(path, buffer, { contentType: mimeType, upsert: true });

    if (error) {
      this.logger.error(`Supabase upload error: ${error.message}`);
      throw error;
    }

    const { data: urlData } = this.client.storage.from(this.bucket).getPublicUrl(data.path);

    return { path: data.path, publicUrl: urlData.publicUrl };
  }

  async deleteFile(path: string): Promise<void> {
    const { error } = await this.client.storage.from(this.bucket).remove([path]);

    if (error) {
      this.logger.error(`Supabase delete error: ${error.message}`);
      throw error;
    }
  }

  getPublicUrl(path: string): string {
    const { data } = this.client.storage.from(this.bucket).getPublicUrl(path);
    return data.publicUrl;
  }
}
