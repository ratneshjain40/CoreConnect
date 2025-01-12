'use server';

import { actionClient, authActionClient } from '@/lib/action-clients';
import { loginSchema, newPasswordSchema, registerSchema } from '../schema/auth';
import { authService } from './service';
import { signIn, signOut } from './next-auth-config';
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/routes';
import { userService } from '@/features/users/server/service';
import { sendTwoFactorEmail, sendVerificationEmail } from './mail';
import { z } from 'zod';
import { ErrorResponse } from '@/types/errors';
import { emailSchema } from '@/constants/email';
import { revalidatePath } from 'next/cache';

export const registerUser = actionClient.schema(registerSchema).action(async (data) => {
  const existingUser = await userService.getUserByEmail(data.parsedInput.email);
  if (existingUser) {
    const emailToken = await authService.generateEmailVerificationToken(existingUser);
    await sendVerificationEmail(existingUser.email, emailToken.token);
  } else {
    const user = await authService.register(data.parsedInput);
    const emailToken = await authService.generateEmailVerificationToken(user);
    await sendVerificationEmail(user.email, emailToken.token);
  }
  return { success: 'Confirmation email sent!' };
});

export const loginUser = actionClient.schema(loginSchema).action(async (data) => {
  const parsedInput = data.parsedInput;
  if ('password' in parsedInput) {
    let user = await userService.getUserByEmail(parsedInput.email);
    if (user.emailVerified) {
      if (!user.isTwoFactorEnabled) {
        // Continue with normal login flow through NextAuth
        await signIn('credentials', {
          email: parsedInput.email,
          password: parsedInput.password,
          redirectTo: parsedInput.callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });
      } else {
        // If 2FA is enabled, check creds and then generate a 2FA token
        let user = await authService.loginWithCreds(parsedInput);
        const twoFactorToken = await authService.generate2FAToken(user);
        await sendTwoFactorEmail(user.email, twoFactorToken.token);
        return { success: 'Confirmation email sent!' };
      }
    } else {
      const emailToken = await authService.generateEmailVerificationToken(user);
      await sendVerificationEmail(user.email, emailToken.token);
      throw new ErrorResponse('Email not verified. Confirmation email sent!');
    }
  } else {
    await signIn('credentials', {
      email: parsedInput,
      code: parsedInput.code,
      redirectTo: parsedInput.callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  }
  return { success: 'Logged in successfully!' };
});

export const verifyEmail = actionClient.schema(z.object({ token: z.string() })).action(async (data) => {
  await authService.verifyEmailVerificationToken(data.parsedInput.token);
  return { success: 'Email verified!' };
});

export const sendResetPasswordEmail = actionClient.schema(z.object({ email: emailSchema })).action(async (data) => {
  await authService.resetPasswordEmail(data.parsedInput);
  return { success: 'Password reset email sent!' };
});

export const resetPassword = actionClient.schema(newPasswordSchema).action(async (data) => {
  await authService.resetPassword(data.parsedInput);
  return { success: 'Password reset!' };
});

export const logout = authActionClient.action(async () => {
  await signOut();
  revalidatePath('/', 'layout');
  return { success: 'Password reset!' };
});
