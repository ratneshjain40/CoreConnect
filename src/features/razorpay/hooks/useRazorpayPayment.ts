import { useState } from 'react';
import { EventRegistration } from '@/features/events/schema/event';

type UseRazorpayPaymentProps = {
  eventRegistration: EventRegistration;
  eventId: string;
  userId: string;
  amount: number;
};

type PaymentStatus = 'idle' | 'success' | 'failed' | 'verification_failed';

type UseRazorpayPaymentReturn = {
  isProcessing: boolean;
  paymentStatus: PaymentStatus;
  handlePayment: () => Promise<void>;
};

export const useRazorpayPayment = ({
  eventRegistration,
  eventId,
  userId,
  amount,
}: UseRazorpayPaymentProps): UseRazorpayPaymentReturn => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('idle');

    try {
      // Step 1: Create order on the backend
      const res = await fetch('/api/event/createOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, userId, amount }),
      });

      const orderData = await res.json();
      console.log(orderData);

      if (res.ok) {
        // Step 2: Initialize Razorpay Checkout
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay key ID
          amount: orderData.amount, // Amount in paise
          currency: 'INR',
          order_id: orderData.id,
          name: 'Event Payment',
          description: `Payment for Event ${eventRegistration.eventSlug}`,
          handler: async (response: any) => {
            // Step 3: Verify payment on the backend
            const verifyRes = await fetch('/api/event/verifyPayment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpayOrderId: orderData.id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok) {
              setPaymentStatus('success');
            } else {
              setPaymentStatus('verification_failed');
            }
          },
          prefill: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            contact: '1234567890',
          },
          notes: {
            event_id: eventId,
            user_id: userId,
            eventRegistrationData: JSON.stringify(eventRegistration),
          },
        };

        console.log(options);

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      } else {
        setPaymentStatus('failed');
      }
    } catch (error) {
      setPaymentStatus('failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    paymentStatus,
    handlePayment,
  };
}; 