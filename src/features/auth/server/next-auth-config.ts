import 'server-only';
import { prisma } from '@/db/prisma';
import NextAuth, { CredentialsSignin, DefaultSession, NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { login2FASchema, loginWithCredsSchema } from '../schema/auth';
import { authService } from './service';
import { userService } from '@/features/users/server/service';
import { UserRole } from '@prisma/client';
import { ErrorResponse } from '@/types/errors';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
    } & DefaultSession['user'];
  }
}

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: UserRole;
};

const providersConfig = {
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        try {
          const creds = loginWithCredsSchema.safeParse(credentials);
          if (creds.success) {
            let user = await authService.loginWithCreds(creds.data);
            if (user.isTwoFactorEnabled) {
              console.info('authorize: null')
              return null;
            }
            console.info('authorize ' + JSON.stringify(user))
            return user;
          } else {
            const creds2fa = login2FASchema.safeParse(credentials);
            if (creds2fa.success) {
              let user = await authService.login2FA(creds2fa.data);
              console.info('authorize ' + JSON.stringify(user))
            }
          }
          console.info('authorize: null')
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

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  callbacks: {
    // Add Role to JWT
    async jwt({ token }) {
      console.info('JWT: ' + JSON.stringify(token))
      if (!token.sub) return token;
      const user = await userService.getUserById(token.sub);
      token.role = user.role;
      return token;
    },

    // Add Role to session
    async session({ session, token }) {
      console.info("Session: " + JSON.stringify(session))
      console.info('Session: ' + JSON.stringify(token))
      if (!session.user) return session;
      session.user.id = token.sub as string;
      session.user.role = token.role!! as UserRole;
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET as string,
  providers: providersConfig.providers,
});
