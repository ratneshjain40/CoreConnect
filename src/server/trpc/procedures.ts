import { TRPCError } from "@trpc/server";
import { t } from "./trpc"; // Assuming t is initialized in trpc.ts

export const publicProcedure = t.procedure;

export const privateProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      // infers that `session` is non-nullable to downstream resolvers
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
