import { z } from 'zod';

export const CuidSchema = z.cuid2();

export type CuidType = z.infer<typeof CuidSchema>;
