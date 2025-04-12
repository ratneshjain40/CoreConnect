import 'server-only';
import { resend, domain_email, domain, EmailLayout, Button, CodeDisplay } from '@/lib/mail';

export async function sendTwoFactorEmail(email: string, token: string) {
  await resend.emails.send({
    from: domain_email as string,
    to: email,
    subject: 'Your Two-Factor Authentication Code',
    html: twoFactorEmailTemplate(token),
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  await resend.emails.send({
    from: domain_email as string,
    to: email,
    subject: 'Reset Your Password',
    html: passwordResetEmailTemplate(token, domain ?? ''),
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const result = await resend.emails.send({
    from: domain_email as string,
    to: email,
    subject: 'Confirm Your Email',
    html: verificationEmailTemplate(token, domain ?? ''),
  });
  console.log(result);
  return result;
}

// Template for password reset email
export const passwordResetEmailTemplate = (token: string, domain: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  const content = `
    <p>We received a request to reset the password for your Entomon Institute account. To proceed with resetting your password, please click the button below:</p>
    ${Button({ text: 'Reset Password', url: resetLink, color: '#FF5722' })}
    <p style="margin-top: 25px; font-size: 14px; color: #666;">This link will expire in 24 hours. If you did not request a password reset, please ignore this email or contact our support team if you have concerns.</p>
  `;

  return EmailLayout({
    content,
    accentColor: '#FF5722',
    title: 'Reset Your Password',
  });
};

// Template for email verification
export const verificationEmailTemplate = (token: string, domain: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const content = `
    <p>Thank you for registering with the Entomon Institute of Invertebrate Zoology! We're excited to have you join our community of researchers, enthusiasts, and conservationists.</p>
    <p>To complete your registration and verify your email address, please click the button below:</p>
    ${Button({ text: 'Verify Email Address', url: confirmLink, color: '#2196F3' })}
    <p style="margin-top: 25px; font-size: 14px; color: #666;">If you did not create an account with us, please ignore this email or contact our support team.</p>
  `;

  return EmailLayout({
    content,
    accentColor: '#2196F3',
    title: 'Verify Your Email Address',
  });
};

// Template for two-factor authentication email
export const twoFactorEmailTemplate = (token: string) => {
  const content = `
    <p style="margin-bottom: 25px;">You've requested a two-factor authentication code to secure your account. Please use the code below to complete your sign-in:</p>
    ${CodeDisplay({ code: token })}
    <p style="margin-top: 25px; font-size: 14px; color: #666;">This code will expire in 10 minutes. If you did not request this code, please contact our support team immediately.</p>
  `;

  return EmailLayout({
    content,
    accentColor: '#4CAF50',
    title: 'Your Two-Factor Authentication Code',
  });
};
