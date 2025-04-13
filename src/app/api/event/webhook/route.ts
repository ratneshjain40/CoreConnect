import { NextRequest, NextResponse } from 'next/server';

import crypto from 'crypto';
import { prisma } from '@/db/prisma';
import { sendPaymentConfirmationEmail } from '@/features/razorpay/server/mail';
import { EventRegistration } from '@/features/events/schema/event';
import { eventService } from '@/features/events/server/service';

// Types for Razorpay webhook payload
type RazorpayPaymentEntity = {
  order_id: string;
  notes: {
    event_id: string;
    user_id: string;
    eventRegistrationData: string;
  };
};

type RazorpayWebhookPayload = {
  event: string;
  payload: {
    payment: {
      entity: RazorpayPaymentEntity;
    };
  };
};

export async function POST(req: NextRequest) {
  try {
    console.log('Webhook received');
    const body = await req.text();
    const signature = req.headers.get('X-Razorpay-Signature');

    if (!signature) {
      console.error('Missing Razorpay signature');
      return NextResponse.json({ message: 'Missing signature' }, { status: 400 });
    }

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('Missing RAZORPAY_WEBHOOK_SECRET');
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    const generatedSignature = crypto.createHmac('sha256', webhookSecret).update(body).digest('hex');

    if (generatedSignature !== signature) {
      console.error('Signature mismatch');
      return NextResponse.json({ message: 'Signature mismatch' }, { status: 400 });
    }
    
    const payload = JSON.parse(body) as RazorpayWebhookPayload;
    
    if (payload.event === 'payment.captured') {
      const { order_id: razorpayOrderId, notes } = payload.payload.payment.entity;
      
      if (!notes?.event_id || !notes?.user_id || !notes?.eventRegistrationData) {
        console.error('Missing required notes in payment entity');
        return NextResponse.json({ message: 'Invalid payment data' }, { status: 400 });
      }

      const eventId = notes.event_id;
      const userId = notes.user_id;
      const eventRegistrationData = JSON.parse(notes.eventRegistrationData) as EventRegistration;

      const paymentData = await prisma.payment.findUnique({
        where: { razorpayOrderId },
        include: {
          user: {
            select: {
              email: true
            }
          },
          event: {
            select: {
              title: true
            }
          }
        }
      });
  
      if (!paymentData) {
        console.error('Payment not found for order:', razorpayOrderId);
        return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
      }

      // Update payment status
      await prisma.payment.update({
        where: { razorpayOrderId },
        data: { status: 'SUCCESS' },
      });

      console.log('Payment data:', paymentData);
      // Register user for event
      await eventService.registerUserForEvent(userId, eventRegistrationData);

      // Send confirmation email
      await sendPaymentConfirmationEmail({
        email: paymentData.user.email,
        productId: { name: paymentData.event.title },
        amount: paymentData.amount,
      });
    }

    return NextResponse.json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { 
        message: 'Error processing webhook',
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}
