import { z } from 'zod';

export const HabitSchema = z.object({
  id: z.cuid2(),
  category: z.string().min(1).max(50),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  author: z.cuid2(),
  authorId: z.cuid2(),
});

export type HabitType = z.infer<typeof HabitSchema>;
