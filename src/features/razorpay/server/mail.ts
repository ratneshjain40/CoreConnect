import 'server-only';

import { resend, domain_email, EmailLayout } from '@/lib/mail';

interface PaymentConfirmationData {
  email: string;
  name: string;
  productId: {
    name: string;
  };
  amount: number;
}

export async function sendPaymentConfirmationEmail(data: PaymentConfirmationData): Promise<void> {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px;">
      <h2 style="color: #4CAF50;">Entomon Institute of Invertebrate Zoology</h2>
      <p style="font-size: 18px;">You have successfully paid for ${data.productId.name}</p>
      <p style="font-size: 18px;">Amount: ₹${data.amount.toLocaleString('en-IN')}</p>
    </div>
  `;

  await resend.emails.send({
    from: domain_email as string,
    to: data.email,
    subject: 'Payment Confirmation',
    html: EmailLayout({
      content: emailHtml,
      title: 'Payment Confirmation',
      accentColor: '#4CAF50',
    }),
  });
}

export async function sendPaymentSuccessEmailToAdmin(data: PaymentConfirmationData): Promise<void> {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px;">
      <h2 style="color: #4CAF50;">Entomon Institute of Invertebrate Zoology</h2>
      <p style="font-size: 18px;">A user has successfully paid for ${data.productId.name}</p>
      <p style="font-size: 18px;">User Email: ${data.email}</p>
      <p style="font-size: 18px;">User Name: ${data.name}</p>
      <p style="font-size: 18px;">Amount: ₹${data.amount.toLocaleString('en-IN')}</p>
    </div>
  `;

  await resend.emails.send({
    from: domain_email as string,
    to: process.env.ADMIN_EMAIL as string,
    subject: 'Payment Success',
    html: EmailLayout({
      content: emailHtml,
      title: 'Payment Success',
      accentColor: '#4CAF50',
    }),
  });
}
