import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { type Context } from "~/server/trpc/context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const router = t.router;

/**
 * Middleware for logging errors and returning a generic error message for unexpected errors.
 */
const errorMiddleware = t.middleware(async ({ path, type, next, ctx }) => {
  const result = await next();
  if (!result.ok && result.error instanceof TRPCError) {
    console.error(
      `tRPC Error: path=${path} type=${type} code=${result.error.code} message=${result.error.message}`,
      result.error.cause ? `cause=${JSON.stringify(result.error.cause, null, 2)}` : ''
    );
    // Optionally, re-throw a generic error for unexpected server errors
    if (result.error.code === 'INTERNAL_SERVER_ERROR') {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred. Please try again later.',
      });
    }
  }
  return result;
});


/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

/**
 * Reusable middleware that enforces users are logged in before running the procedure.
 */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const privateProcedure = t.procedure.use(enforceUserIsAuthed).use(errorMiddleware); // Apply error middleware to private procedures

// Apply error middleware to public procedures as well if desired
export const publicProcedureWithErrors = publicProcedure.use(errorMiddleware);


export const middleware = t.middleware; // Export middleware factory if needed for custom middlewares
