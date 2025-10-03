import dotenv from 'dotenv';
import { z } from 'zod';

// Load ENV variables from app root directory
dotenv.config({
  path: '../../.env',
});

// Define ENV variables schema
const envSchema = z.object({
  BACKEND_PORT: z
    .string()
    .refine(
      (port) => parseInt(port) > 0 && parseInt(port) < 65536,
      'Invalid port number',
    ),
  BACKEND_ENV: z.enum(['DEV', 'PROD']),
  BACKEND_DATABASE_URL: z
    .string()
    .refine((url) => url.startsWith('postgresql://'), 'Invalid URL format'),
  BACKEND_DIRECT_URL: z
    .string()
    .refine((url) => url.startsWith('postgresql://'), 'Invalid URL format'),
});

type Env = z.infer<typeof envSchema>;

export const ENV: Env = envSchema.parse(process.env);
