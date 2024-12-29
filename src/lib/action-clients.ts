import { auth } from '@/features/auth/server/next-auth-config';
import { ErrorResponse } from '@/types/errors';
import { UserRole } from '@prisma/client';
import { AuthError } from 'next-auth';
import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action';
import { z } from 'zod';

export const actionClient = createSafeActionClient({
  defaultValidationErrorsShape: 'flattened',
  // defineMetadataSchema() {
  //   return z.object({
  //     roleGate: z.enum([UserRole.ADMIN, UserRole.USER]).default(UserRole.USER).optional(),
  //   });
  // },
  handleServerError(e) {
    console.error('Action error:', e.message);

    if (e instanceof ErrorResponse) {
      return e.message;
    }

    if (e instanceof AuthError) {
      if (e.type == 'CredentialsSignin') {
        return { error: 'Invalid credentials!' };
      } else {
        return { error: 'Authentication error!' };
      }
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authActionClient = actionClient.use(async ({ next, metadata }) => {
  const session = await auth();
  if (!session) {
    throw new ErrorResponse('User not authenticated');
  }
  if (!session.user || !session.user.id || !session.user.email || !session.user.name || !session.user.role) {
    throw new ErrorResponse('User not authenticated');
  }

  // if (metadata.roleGate === UserRole.ADMIN && session.user.role !== UserRole.ADMIN) {
  //   throw new ErrorResponse('User not authorized');
  // }

  return next({
    ctx: {
      session: {
        user: session.user,
      },
    },
  });
});
