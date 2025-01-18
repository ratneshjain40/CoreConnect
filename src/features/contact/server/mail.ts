import 'server-only';

import { resend, domain_email } from '@/lib/mail';
import { ContactFormType } from '../schema/contact';

export async function sendContactEmail(data: ContactFormType) {
  await resend.emails.send({
    from: domain_email as string,
    to: process.env.COMPANY_EMAIL_ADDRESS as string,
    subject: 'Eamil from: ' + data.email,
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px;">
        <h2 style="color: #4CAF50;">Entomon Institute of Invertebrate Zoology</h2>
        <p style="font-size: 18px;">You have received a new message from ${data.name}</p>
        <p style="font-size: 18px;">Message: ${data.message}</p>
        ${data.phone ? `<p style="font-size: 18px;">Phone: ${data.phone}</p>` : ''}
      </div>
    `,
  });
}
