import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  REDIS_URL: z.string().url(),
  FRONTEND_URL: z.string().url().default('http://localhost:5173'),
});

export const env = envSchema.parse(process.env);
