import 'server-only';
import { resend, domain_email, domain } from '@/lib/mail';

export async function sendTwoFactorEmail(email: string, token: string) {
  await resend.emails.send({
    from: domain_email as string,
    to: email,
    subject: 'Your Two-Factor Authentication Code',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px;">
        <h2 style="color: #4CAF50;">Entomon Institute of Invertebrate Zoology</h2>
        <p style="font-size: 18px;">Your 2FA code is:</p>
        <div style="font-size: 24px; font-weight: bold; color: #333; margin: 10px 0;">${token}</div>
        <p>If you did not request this, please contact support.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: domain_email as string,
    to: email,
    subject: 'Reset Your Password',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px;">
        <h2 style="color: #FF5722;">Entomon Institute of Invertebrate Zoology</h2>
        <p style="font-size: 18px;">We received a request to reset your password.</p>
        <a href="${resetLink}" style="display: inline-block; margin: 20px 0; padding: 10px 20px; background-color: #FF5722; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you did not request this, please ignore this email or contact support.</p>
      </div>
    `,
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const a = await resend.emails.send({
    from: domain_email as string,
    to: email,
    subject: 'Confirm Your Email',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px;">
        <h2 style="color: #2196F3;">Entomon Institute of Invertebrate Zoology</h2>
        <p style="font-size: 18px;">Thank you for registering! Please confirm your email address to complete your registration.</p>
        <a href="${confirmLink}" style="display: inline-block; margin: 20px 0; padding: 10px 20px; background-color: #2196F3; color: white; text-decoration: none; border-radius: 5px;">Confirm Email</a>
        <p>If you did not sign up, please ignore this email or contact support.</p>
      </div>
    `,
  });
  console.log(a);
}
