import 'server-only';
import { auth } from '@/features/auth/server/next-auth-config';

export async function currentUser() {
  const session = await auth();

  return session?.user;
}

export async function currentRole() {
  const session = await auth();

  return session?.user?.role;
}

export async function isAuthenicated() {
  const session = await auth();

  return !!session;
}
