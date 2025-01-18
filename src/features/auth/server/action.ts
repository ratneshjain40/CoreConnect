'use server';

import { z } from 'zod';
import { authService } from './service';
import { revalidatePath } from 'next/cache';
import { ErrorResponse } from '@/types/errors';
import { emailSchema } from '@/constants/email';
import { signIn, signOut } from './next-auth-config';
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/routes';
import { userRepo } from '@/features/users/server/repo';
import { userService } from '@/features/users/server/service';
import { sendTwoFactorEmail, sendVerificationEmail } from './mail';
import { actionClient, authActionClient } from '@/lib/action-clients';
import { loginSchema, newPasswordSchema, registerSchema } from '../schema/auth';

export const registerUser = actionClient.schema(registerSchema).action(async (data) => {
  const existingUser = await userRepo.getUserByEmail(data.parsedInput.email);

  if (existingUser) {
    throw new ErrorResponse('User already exists. Please Login!');
  } else {
    const user = await authService.register(data.parsedInput);
    const emailToken = await authService.generateEmailVerificationToken(user);
    await sendVerificationEmail(user.email, emailToken.token);

    return { success: 'Confirmation email sent!' };
  }
});

export const loginUser = actionClient.schema(loginSchema).action(async (data) => {
  if ('password' in data.parsedInput) {
    let existingUser = await userService.getUserByEmail(data.parsedInput.email); // automatically throws error since using service

    if (existingUser.emailVerified) {
      if (!existingUser.isTwoFactorEnabled) {
        // Continue with normal login flow through NextAuth
        await signIn('credentials', {
          email: data.parsedInput.email,
          password: data.parsedInput.password,
          redirectTo: data.parsedInput.callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });

        return { success: 'Logged in successfully!' };
      } else {
        // If 2FA is enabled, check creds and then generate a 2FA token
        let user = await authService.loginWithCreds(data.parsedInput);
        const twoFactorToken = await authService.generate2FAToken(user);
        await sendTwoFactorEmail(user.email, twoFactorToken.token);

        return { success: 'Confirmation email sent!' };
      }
    } else {
      const emailToken = await authService.generateEmailVerificationToken(existingUser);
      await sendVerificationEmail(existingUser.email, emailToken.token);

      throw new ErrorResponse('Email not verified. Confirmation email sent!');
    }
  } else {
    await signIn('credentials', {
      email: data.parsedInput,
      code: data.parsedInput.code,
      redirectTo: data.parsedInput.callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return { success: 'Logged in successfully!' };
  }
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
