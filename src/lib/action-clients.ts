import { z } from 'zod';
import { AuthError } from 'next-auth';
import { UserRole } from '@prisma/client';
import { ErrorResponse } from '@/types/errors';
import { auth } from '@/features/auth/server/next-auth-config';
import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action';

export const actionClient = createSafeActionClient({
  defaultValidationErrorsShape: 'flattened',
  defineMetadataSchema() {
    return z.object({
      roleGate: z.enum([UserRole.ADMIN, UserRole.USER]),
    });
  },
  handleServerError(e) {
    console.error('Action error:', e.message);

    if (e instanceof ErrorResponse) {
      return e.message;
    }

    if (e instanceof AuthError) {
      console.error('Auth error:', e.type);
      if (e.type == 'CredentialsSignin') {
        return 'Invalid credentials!';
      } else {
        return 'Authentication error!';
      }
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
}).metadata({
  roleGate: UserRole.USER,
});

export const authActionClient = actionClient.use(async ({ next, metadata }) => {
  const session = await auth();
  if (!session) {
    throw new ErrorResponse('User not authenticated');
  }
  if (!session.user || !session.user.id || !session.user.email || !session.user.name || !session.user.role) {
    throw new ErrorResponse('User not authenticated');
  }

  if (metadata.roleGate === UserRole.ADMIN && session.user.role !== UserRole.ADMIN) {
    throw new ErrorResponse('User not authorized');
  }

  return next({
    ctx: {
      session: {
        user: session.user,
      },
    },
  });
});
