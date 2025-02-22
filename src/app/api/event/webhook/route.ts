import { NextRequest, NextResponse } from 'next/server';

import crypto from 'crypto';
import { prisma } from '@/db/prisma';
import { sendPaymentConfirmationEmail } from '@/features/razorpay/server/mail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('X-Razorpay-Signature')!;
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET as string;

    const generatedSignature = crypto.createHmac('sha256', webhookSecret).update(body).digest('hex');

    if (generatedSignature !== signature) {
      return NextResponse.json({ message: 'Signature mismatch' }, { status: 400 });
    }

    const payload = JSON.parse(body);
    const {
      event,
      payload: { payment },
    } = payload;

    if (event === 'payment.captured') {
      const paymentData = await prisma.payment.update({
        where: { razorpayPaymentId: payment.id },
        data: {
          status: 'SUCCESS',
        },
      });

      await sendPaymentConfirmationEmail(paymentData);
    } else if (event === 'payment.failed') {
      const paymentData = await prisma.payment.update({
        where: { razorpayPaymentId: payment.id },
        data: {
          status: 'FAILED',
        },
      });

      console.log('Payment failed:', paymentData);
    }

    return NextResponse.json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ message: 'Error processing webhook' }, { status: 500 });
  }
}
