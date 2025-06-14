import 'server-only';

import { resend, domain_email, EmailLayout } from '@/lib/mail';
import { ContactFormType } from '../schema/contact';

export async function sendContactEmail(data: ContactFormType) {
  const emailContent = `
    <p style="font-size: 16px; margin-bottom: 25px;">You have received a new message from the contact form.</p>
    
    <div style="background-color: #f9f9f9; border-left: 4px solid #4CAF50; padding: 15px; margin-bottom: 25px;">
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      <p><strong>Message:</strong></p>
      <div style="padding: 10px 0;">${data.message}</div>
    </div>
  `;

  await resend.emails.send({
    from: domain_email as string,
    to: process.env.ADMIN_EMAIL as string,
    subject: `Contact Form: ${data.name}`,
    html: EmailLayout({
      title: 'New Contact Form Submission',
      content: emailContent,
      accentColor: '#4CAF50',
    }),
  });
}
