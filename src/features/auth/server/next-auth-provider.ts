import 'server-only';

import { ErrorResponse } from '@/types/errors';
import { CredentialsSignin, NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { login2FASchema, loginWithCredsSchema } from '../schema/auth';
import { authService } from './service';

export default {
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        try {
          const creds = loginWithCredsSchema.safeParse(credentials);
          if (creds.success) {
            let user = await authService.loginWithCreds(creds.data);
            if (user.isTwoFactorEnabled) {
              return null;
            }
            return user;
          } else {
            const creds2fa = login2FASchema.safeParse(credentials);
            if (creds2fa.success) {
              return authService.login2FA(creds2fa.data);
            }
          }
          return null;
        } catch (e) {
          if (e instanceof ErrorResponse) {
            throw new CredentialsSignin(e.message);
          }
          throw new CredentialsSignin('Invalid credentials');
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
