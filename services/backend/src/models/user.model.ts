import { z } from 'zod';

import { EntrySchema } from './entry.model';
import { HabitSchema } from './habit.model';

export const UserSchema = z.object({
  id: z.cuid2(),
  email: z.email(),
  givenName: z.string().min(1).max(30),
  familyName: z.string().min(1).max(30),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  entries: z.array(EntrySchema),
  habits: z.array(HabitSchema),
});

export type UserType = z.infer<typeof UserSchema>;
