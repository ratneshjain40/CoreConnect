import 'server-only';

import { resend, domain_email } from '@/lib/mail';

export async function sendPaymentConfirmationEmail(data: any) {
  await resend.emails.send({
    from: domain_email as string,
    to: data.email as string,
    subject: 'Payment Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px;">
        <h2 style="color: #4CAF50;">Entomon Institute of Invertebrate Zoology</h2>
        <p style="font-size: 18px;">You have successfully paid for ${data.productId.name}</p>
        <p style="font-size: 18px;">Amount: ${data.amount} INR</p>
      </div>
    `,
  });
}
