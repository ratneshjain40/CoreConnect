import { NextRequest, NextResponse } from 'next/server';

import crypto from 'crypto';
import { prisma } from '@/db/prisma';
import { sendPaymentConfirmationEmail } from '@/features/razorpay/server/mail';
import { registerUserForEvent } from '@/features/events/server/actions';
import { EventRegistration } from '@/features/events/schema/event';
import { eventService } from '@/features/events/server/service';

export async function POST(req: NextRequest) {
  try {
    console.log('Webhook received');
    const body = await req.text();
    const signature = req.headers.get('X-Razorpay-Signature')!;
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET as string;

    const generatedSignature = crypto.createHmac('sha256', webhookSecret).update(body).digest('hex');

    if (generatedSignature !== signature) {
      console.log('Signature mismatch');
      return NextResponse.json({ message: 'Signature mismatch' }, { status: 400 });
    }
    
    const bdy = JSON.parse(body);
    if (bdy.event === 'payment.captured') {
      console.log(bdy.payload.payment.entity);
      const razorpayOrderId = bdy.payload.payment.entity.order_id as string;
      const notes = bdy.payload.payment.entity.notes;
      const eventId = notes.event_id as string;
      const userId = notes.user_id as string;
      const eventRegistrationData = JSON.parse(notes.eventRegistrationData) as EventRegistration;

      const paymentData = await prisma.payment.findUnique({
        where: { razorpayOrderId },
      });
  
      if (!paymentData) {
        return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
      }

      await prisma.payment.update({
        where: { razorpayOrderId },
        data: { status: 'SUCCESS' },
      });

      await eventService.registerUserForEvent(userId, eventRegistrationData);
    }

    return NextResponse.json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ message: 'Error processing webhook' }, { status: 500 });
  }
}
