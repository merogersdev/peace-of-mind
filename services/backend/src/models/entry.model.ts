import { z } from 'zod';

export const EntrySchema = z.object({
  id: z.cuid(),
  title: z.string().min(1).max(50),
  body: z.string().min(1).max(1000),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  author: z.cuid(),
  authorId: z.cuid(),
});

export type EntryType = z.infer<typeof EntrySchema>;
