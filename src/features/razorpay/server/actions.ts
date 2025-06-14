import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, privateProcedure } from '~/server/trpc/trpc';
import { prisma } from '~/server/db'; // Adjusted import path for prisma
import { v4 as uuidv4 } from 'uuid';
import Razorpay from 'razorpay';
import { UserRole } from '@prisma/client'; // Included for consistency, though roleGate not used for this specific action

// Validate Razorpay configuration
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error('Razorpay credentials are not properly configured. This will cause errors at runtime.');
  // Not throwing an error here to allow server to start, but logging it.
  // In a real app, you might want to throw to prevent startup without proper config.
}

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!, // Added non-null assertion
  key_secret: process.env.RAZORPAY_KEY_SECRET!, // Added non-null assertion
});

export const razorpayRouter = router({
  createOrder: privateProcedure
    .input(
      z.object({
        eventId: z.string().min(1, "Event ID is required"),
        amount: z.number().positive("Amount must be a positive number"),
        // userId is from context, no longer from input body
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { eventId, amount } = input;
      const userId = ctx.session.user.id; // Get userId from session context

      // Razorpay key check before proceeding with an order
      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
          throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Payment provider is not configured.',
          });
      }

      const trx = uuidv4();
      const orderAmountPaise = Math.round(amount * 100); // Convert to paise

      try {
        // Create Razorpay order
        const orderData = {
          amount: orderAmountPaise,
          currency: 'INR',
          receipt: `trx-${trx}`, // Unique receipt ID
          payment_capture: true, // Auto capture payment
        };

        const order = await razorpayInstance.orders.create(orderData);

        if (!order || !order.id) {
          console.error("Invalid order response from Razorpay:", order);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to create payment order with provider.',
          });
        }

        // Save payment record to your database
        await prisma.payment.create({
          data: {
            trxId: trx,
            userId,
            eventId,
            razorpayOrderId: order.id,
            amount, // Store amount in rupees (original value)
            status: 'PENDING', // Initial status
          },
        });

        // Return the order details to the client (especially order.id for Razorpay checkout)
        return {
          orderId: order.id,
          amount: order.amount, // Amount in paise
          currency: order.currency,
          receipt: order.receipt,
        };

      } catch (error: any) {
        console.error('Error creating Razorpay order:', error);
        // Check if it's a Razorpay specific error for more details
        if (error.statusCode && error.error && error.error.description) {
             throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: `Payment provider error: ${error.error.description}`,
                cause: error,
             });
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error creating order. Please try again.',
          cause: error instanceof Error ? error : new Error(String(error)),
        });
      }
    }),
});

export type RazorpayRouter = typeof razorpayRouter;
