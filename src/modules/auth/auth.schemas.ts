import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8)
    .max(100)
    .regex(/[A-Z]/, 'Password must include an uppercase letter')
    .regex(/[a-z]/, 'Password must include a lowercase letter')
    .regex(/[0-9]/, 'Password must include a number')
    .regex(/[^A-Za-z0-9]/, 'Password must include a special character'),
  name: z.string().trim().min(2).max(100)
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1)
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
