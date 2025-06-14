import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { authService } from './service';
import { revalidatePath } from 'next/cache';
import { emailSchema } from '@/constants/email';
import { signIn, signOut } from './next-auth-config'; // Assuming this is still relevant for credentials sign in
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/routes';
import { userRepo } from '@/features/users/server/repo';
import { userService } from '@/features/users/server/service';
import { sendTwoFactorEmail, sendVerificationEmail } from './mail';
import { loginSchema, newPasswordSchema, registerSchema } from '../schema/auth';
import { withAuthRateLimit, withEmailRateLimit } from '@/lib/arcjet'; // Assuming these are utility functions
import { router, publicProcedure, privateProcedure } from '~/server/trpc/trpc'; // Corrected import path

export const authRouter = router({
  registerUser: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      return await withAuthRateLimit(async () => {
        const existingUser = await userRepo.getUserByEmail(input.email);

        if (existingUser) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'User already exists. Please Login!' });
        } else {
          const user = await authService.register(input);
          const emailToken = await authService.generateEmailVerificationToken(user);

          await withEmailRateLimit(async () => await sendVerificationEmail(user.email, emailToken.token), user.email);

          return { success: 'Confirmation email sent!' };
        }
      });
    }),

  loginUser: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input }) => {
      return await withAuthRateLimit(async () => {
        if ('password' in input) {
          const existingUser = await userService.getUserByEmail(input.email);

          if (!existingUser) { // Check if user exists first
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid credentials!' });
          }

          if (existingUser.emailVerified) {
            if (!existingUser.isTwoFactorEnabled) {
              try {
                await signIn('credentials', {
                  email: input.email,
                  password: input.password,
                  redirectTo: input.callbackUrl || DEFAULT_LOGIN_REDIRECT,
                });
                // signIn with redirectTo will cause a redirect, so this message might not be seen
                // unless the redirect is handled on the client-side after the mutation resolves
                return { success: 'Logged in successfully!' };
              } catch (error: any) {
                // NextAuth's signIn can throw errors for invalid credentials
                if (error.type === 'CredentialsSignin') {
                  throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentials!' });
                }
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Login failed.' });
              }
            } else {
              const user = await authService.loginWithCreds(input); // This should validate credentials
              if (!user) { // If loginWithCreds returns null/false for bad creds
                throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentials!' });
              }
              const twoFactorToken = await authService.generate2FAToken(user);
              await withEmailRateLimit(async () => await sendTwoFactorEmail(user.email, twoFactorToken.token), user.email);
              return { success: 'Confirmation email sent!', twoFactor: true }; // Indicate 2FA step
            }
          } else {
            const emailToken = await authService.generateEmailVerificationToken(existingUser);
            await withEmailRateLimit(
              async () => await sendVerificationEmail(existingUser.email, emailToken.token),
              existingUser.email
            );
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'Email not verified. Confirmation email sent!' });
          }
        } else if ('code' in input) { // Handling 2FA code or other code-based login
            try {
                await signIn('credentials', { // Assuming 'credentials' can handle 2FA codes or a different provider like 'email' for magic links
                    email: input.email,
                    code: input.code,
                    redirectTo: input.callbackUrl || DEFAULT_LOGIN_REDIRECT,
                });
                return { success: 'Logged in successfully!' };
            } catch (error: any) {
                if (error.type === 'CredentialsSignin') { // Or a more specific error for invalid codes
                    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid code!' });
                }
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Login failed.' });
            }
        } else {
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid login input.' });
        }
      });
    }),

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      return await withAuthRateLimit(async () => {
        try {
          await authService.verifyEmailVerificationToken(input.token);
          return { success: 'Email verified!' };
        } catch (error) {
          if (error instanceof TRPCError) throw error; // Re-throw TRPC errors
          // Log original error for debugging: console.error(error)
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid or expired token.' });
        }
      });
    }),

  sendResetPasswordEmail: publicProcedure
    .input(z.object({ email: emailSchema }))
    .mutation(async ({ input }) => {
      return await withEmailRateLimit(async () => {
        try {
          await authService.resetPasswordEmail(input);
          return { success: 'Password reset email sent!' };
        } catch (error) {
           if (error instanceof TRPCError) throw error;
           // Log original error
           console.error("sendResetPasswordEmail failed:", error);
           // Check if it's a "user not found" type of error, if service throws specific errors
           // For now, a generic message.
           throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Could not send password reset email.' });
        }
      }, input.email);
    }),

  resetPassword: publicProcedure
    .input(newPasswordSchema)
    .mutation(async ({ input }) => {
      return await withAuthRateLimit(async () => {
        try {
          await authService.resetPassword(input);
          return { success: 'Password reset!' };
        } catch (error) {
          if (error instanceof TRPCError) throw error;
          // Log original error
          console.error("resetPassword failed:", error);
          // Could be invalid token, or other issues
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Password reset failed. Invalid token or data.' });
        }
      });
    }),

  logout: privateProcedure // Use privateProcedure for authenticated actions
    .mutation(async ({ ctx }) => { // ctx is available in privateProcedure
      try {
        await signOut({ redirect: false }); // signOut from next-auth
        revalidatePath('/', 'layout'); // Revalidate cache if needed
        return { success: 'Logged out successfully!' };
      } catch (error) {
        console.error("Logout failed:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Logout failed.' });
      }
    }),
});

// Export the type of the router for typing convenience elsewhere if needed
export type AuthRouter = typeof authRouter;
