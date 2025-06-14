import { TRPCError } from '@trpc/server';
import { sendContactEmail } from './mail';
import { contactSchema } from '../schema/contact';
import { router, publicProcedure } from '~/server/trpc/trpc';
import { withEmailRateLimit } from '@/lib/arcjet'; // Assuming this is a utility function

export const contactRouter = router({
  sendContactMessage: publicProcedure // Renamed from contactUs for clarity, was sendContact
    .input(contactSchema)
    .mutation(async ({ input }) => {
      try {
        // The withEmailRateLimit function is expected to handle its own errors or pass them through.
        // If withEmailRateLimit throws, it will be caught by the generic catch block.
        return await withEmailRateLimit(async () => {
          await sendContactEmail(input);
          return { success: 'Admin will contact you shortly.' };
        }, input.email);
      } catch (error: any) {
        // Log the error for server-side inspection
        console.error("Failed to send contact email:", error);

        // Check if the error is from withEmailRateLimit (if it throws specific errors)
        // For now, assume any error from it or sendContactEmail is an internal error.
        // If rate limiting itself has a specific error (e.g. too many requests),
        // withEmailRateLimit should ideally throw a TRPCError with code 'TOO_MANY_REQUESTS'.
        // If not, we default to INTERNAL_SERVER_ERROR.
        if (error instanceof TRPCError) { // Re-throw if it's already a TRPCError
            throw error;
        }

        // Customize the message or code based on the error if possible
        // For example, if Arcjet a specific error for rate limit exceeded
        // if (error.message === "Rate limit exceeded") {
        //   throw new TRPCError({ code: 'TOO_MANY_REQUESTS', message: 'You are sending messages too quickly. Please try again later.' });
        // }

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to send your message. Please try again later.',
          cause: error, // Keep original error as cause for server logs
        });
      }
    }),
});

export type ContactRouter = typeof contactRouter;
