import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';
import { v4 as uuidv4 } from 'uuid';
import Razorpay from 'razorpay';

// Validate Razorpay configuration
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error('Razorpay credentials are not properly configured');
}

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.eventId || !body.userId || !body.amount) {
      return NextResponse.json({ message: 'Missing required fields: eventId, userId, or amount' }, { status: 400 });
    }

    const { eventId, userId, amount } = body;

    // Validate amount is a number and greater than 0
    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ message: 'Amount must be a positive number' }, { status: 400 });
    }

    const trx = uuidv4();
    const orderAmount = Math.round(amount * 100); // Convert to paise and ensure it's an integer

    // Create Razorpay order
    const orderData = {
      amount: orderAmount,
      currency: 'INR',
      receipt: `trx-${trx}`,
      payment_capture: true,
    };

    const order = await razorpayInstance.orders.create(orderData);

    if (!order || !order.id) {
      return NextResponse.json({ message: 'Invalid order response from Razorpay' }, { status: 500 });
    }

    await prisma.payment.create({
      data: {
        trxId: trx,
        userId,
        eventId,
        razorpayOrderId: order.id,
        amount,
        status: 'PENDING',
      },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Error creating order',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
