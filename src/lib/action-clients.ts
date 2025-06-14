import { TRPCError } from "@trpc/server";
import { UserRole } from "@prisma/client"; // Assuming UserRole is available
import { publicProcedure, privateProcedure } from "~/server/trpc/trpc"; // Adjusted path
import { type Session } from "next-auth";

// Define a Zod schema for metadata to include roleGate
import { z } from "zod";

const metadataSchema = z.object({
  roleGate: z.enum([UserRole.ADMIN, UserRole.USER]).optional(),
});

// Public action using publicProcedure
export const publicAction = publicProcedure;

// Protected action using privateProcedure with RBAC
export const protectedAction = privateProcedure
  .meta(metadataSchema) // Allow metadata to be passed
  .use(async ({ ctx, next, meta }) => {
    const { session } = ctx as { session: Session & { user: { role?: UserRole | null } } }; // Type assertion for session and user role

    // Ensure session and user are available (already handled by privateProcedure, but good for clarity)
    if (!session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User not authenticated." });
    }

    // RBAC check
    const requiredRole = (meta as { roleGate?: UserRole } | undefined)?.roleGate; // Type assertion for meta
    if (requiredRole) {
      const userRole = session.user.role;
      if (!userRole || userRole !== requiredRole) {
        // If role is ADMIN, also allow if user is ADMIN (assuming ADMIN > USER)
        if (!(requiredRole === UserRole.USER && userRole === UserRole.ADMIN)) {
            throw new TRPCError({
                code: "FORBIDDEN",
                message: `User does not have the required role: ${requiredRole}. User role is ${userRole}`,
            });
        }
      }
    }

    return next({
      ctx: {
        ...ctx,
        session: {
          ...session,
          user: session.user,
        },
      },
    });
  });

// Example of how to use these actions (optional, for clarity)
/*
export const examplePublicAction = publicAction
  .input(z.object({ text: z.string() }))
  .query(async ({ input }) => {
    return { greeting: `Hello ${input.text}` };
  });

export const exampleProtectedAction = protectedAction
  .meta({ roleGate: UserRole.ADMIN }) // Example: Requires ADMIN role
  .input(z.object({ secret: z.string() }))
  .mutation(async ({ input, ctx }) => {
    // ctx.session.user is guaranteed to be defined and have the required role
    return { secretMessage: `The secret is ${input.secret} for user ${ctx.session.user.id}` };
  });
*/
