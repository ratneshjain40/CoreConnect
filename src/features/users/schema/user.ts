import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6).optional(),
  isTwoFactorEnabled: z.boolean().optional(),
});
