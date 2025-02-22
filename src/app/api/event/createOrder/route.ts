import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';
import { v4 as uuidv4 } from 'uuid';
import Razorpay from 'razorpay';

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(req: NextRequest) {
  try {
    const { eventId, userId, amount } = await req.json();

    // Create Razorpay order
    const order = await razorpayInstance.orders.create({
      amount: amount * 100, // Amount in paise (smallest unit of INR)
      currency: 'INR',
      receipt: `order-${eventId}-${userId}-${uuidv4().slice(0, 8)}`,
      payment_capture: true,
    });

    if (!order) {
      return NextResponse.json({ message: 'Order creation failed' }, { status: 500 });
    }

    await prisma.payment.create({
      data: {
        userId,
        eventId,
        razorpayOrderId: order.id,
        razorpayPaymentId: '',
        amount,
        status: 'PENDING',
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ message: 'Error creating order' }, { status: 500 });
  }
}
