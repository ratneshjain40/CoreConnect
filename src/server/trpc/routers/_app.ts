import { router } from "~/server/trpc/trpc";
import { authRouter } from "~/features/auth/server/action";
import { blogRouter } from "~/features/blog/server/actions";
import { contactRouter } from "~/features/contact/server/action";
import { eventsRouter } from "~/features/events/server/actions";
import { razorpayRouter } from "~/features/razorpay/server/actions"; // Import the razorpayRouter
// Import other feature routers here once they are created
// e.g., import { postRouter } from "./post";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  // health: publicProcedure.query(() => "yay!"), // Example health check
  auth: authRouter,
  blog: blogRouter,
  contact: contactRouter,
  events: eventsRouter,
  razorpay: razorpayRouter, // Add the razorpayRouter to the appRouter
  // Add other feature routers here
  // e.g., post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
