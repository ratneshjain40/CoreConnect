import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json();

    const paymentData = await prisma.payment.findUnique({
      where: { razorpayOrderId },
    });

    if (!paymentData) {
      return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string)
      .update(razorpayOrderId + '|' + razorpayPaymentId)
      .digest('hex');

    if (generatedSignature !== razorpaySignature) {
      return NextResponse.json({ message: 'Payment verification failed' }, { status: 400 });
    }

    // Update payment status
    await prisma.payment.update({
      where: { razorpayOrderId },
      data: {
        razorpayPaymentId,
        status: 'SUCCESS',
      },
    });

    return NextResponse.json({ message: 'Payment verified successfully' });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ message: 'Error verifying payment' }, { status: 500 });
  }
}
