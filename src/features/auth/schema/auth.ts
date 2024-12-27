import { z } from 'zod';
import { emailSchema } from '../schema/email';

const loginWithCredsSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, { message: 'Password is required.' })
    .regex(/^[A-Za-z0-9!@#$%^&*()_+=\-`~,.<>?/;:'"\[\]{}|]+$/, {
      message: 'Password contains invalid characters.',
    }),
});

const login2FASchema = z.object({
  email: emailSchema,
  code: z.string().regex(/^\d+$/, {
    message: 'Code must only contain numbers.',
  }),
});

const loginSchema = z.union([loginWithCredsSchema, login2FASchema]).and(
  z.object({
    callbackUrl: z.string().optional(),
  })
);

const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required.' })
    .max(20, { message: 'First name must not exceed 20 characters.' })
    .regex(/^[A-Za-z]+$/, {
      message: 'First name can only contain alphabets.',
    }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required.' })
    .max(20, { message: 'Last name must not exceed 20 characters.' })
    .regex(/^[A-Za-z]+$/, {
      message: 'Last name can only contain alphabets.',
    }),
  email: emailSchema,
  password: z
    .string()
    .min(6, { message: 'Minimum 6 characters required.' })
    .max(20, { message: 'Maximum 20 characters allowed.' })
    .regex(/^[A-Za-z0-9!@#$%^&*()_+=\-`~,.<>?/;:'"\[\]{}|]+$/, {
      message: 'Password contains invalid characters.',
    }),
  isTwoFactorEnabled: z.boolean().optional(),
});

const resetSchema = z.object({
  email: emailSchema,
});

const newPasswordSchema = z.object({
  token: z.string(),
  password: z
    .string()
    .min(6, { message: 'Minimum 6 characters required.' })
    .max(20, { message: 'Maximum 20 characters allowed.' })
    .regex(/^[A-Za-z0-9!@#$%^&*()_+=\-`~,.<>?/;:'"\[\]{}|]+$/, {
      message: 'Password contains invalid characters.',
    }),
});

export { loginWithCredsSchema, login2FASchema, loginSchema, registerSchema, resetSchema, newPasswordSchema };
