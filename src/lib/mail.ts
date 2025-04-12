import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);
export const domain = process.env.NEXT_PUBLIC_APP_URL;
export const domain_email = process.env.EMAIL_ADDRESS;

// Common header and footer components for all emails
export const EmailHeader = (props: { title: string; color: string }) => `
  <div style="text-align: center; padding: 30px 0 20px 0;">
    <img src="https://entomoninstitute.com/images/entomon-logo.png" alt="Entomon Institute Logo" style="max-width: 180px; height: auto;" />
    <h1 style="color: ${props.color}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 20px 0 10px; font-size: 24px; font-weight: 600;">${props.title}</h1>
  </div>
`;

export const EmailFooter = () => `
  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e6e6e6; text-align: center; color: #666; font-size: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <p>© ${new Date().getFullYear()} Entomon Institute of Invertebrate Zoology. All rights reserved.</p>
    <div style="margin: 15px 0;">
      <a href="https://entomoninstitute.com/terms" style="color: #666; text-decoration: none; margin: 0 10px;">Terms</a>
      <a href="https://www.entomoninstitute.com/privacy-policy" style="color: #666; text-decoration: none; margin: 0 10px;">Privacy</a>
      <a href="https://www.entomoninstitute.com/contact" style="color: #666; text-decoration: none; margin: 0 10px;">Contact</a>
    </div>

    <div style="margin: 15px 0;">
      <a href="mailto:entomoninstitute@gmail.com" style="text-decoration: none; margin: 0 8px;"><img src="https://entomoninstitute.com/images/gmail.svg" alt="Email" width="24" height="24" /></a>
      <a href="https://www.linkedin.com/company/entomon-institute/" style="text-decoration: none; margin: 0 8px;"><img src="https://entomoninstitute.com/images/linkedin.svg" alt="LinkedIn" width="24" height="24" /></a>
      <a href="https://www.instagram.com/entomon_institute" style="text-decoration: none; margin: 0 8px;"><img src="https://entomoninstitute.com/images/instagram.svg" alt="Instagram" width="24" height="24" /></a>
    </div>
  </div>
`;

// Base email layout
export const EmailLayout = (props: {
  content: string;
  backgroundColor?: string;
  accentColor?: string;
  title: string;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${props.title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); max-width: 90%;">
          <tr>
            <td style="padding: 0;">
              <div style="background-color: ${props.accentColor || '#4CAF50'}; height: 8px;"></div>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px;">
              ${EmailHeader({ title: props.title, color: props.accentColor || '#4CAF50' })}
              <div style="color: #333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                ${props.content}
              </div>
              ${EmailFooter()}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// Button component
export const Button = (props: { text: string; url: string; color: string }) => `
  <div style="text-align: center; margin: 30px 0;">
    <a href="${props.url}" style="display: inline-block; padding: 12px 24px; background-color: ${props.color}; color: white; text-decoration: none; border-radius: 4px; font-weight: 600; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; text-align: center; transition: background-color 0.3s ease;">
      ${props.text}
    </a>
  </div>
`;

// Code display component
export const CodeDisplay = (props: { code: string }) => `
  <div style="text-align: center; margin: 25px 0;">
    <div style="display: inline-block; padding: 15px 30px; background-color: #f7f7f7; border: 1px solid #e0e0e0; border-radius: 4px; font-family: monospace; font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #333;">
      ${props.code}
    </div>
  </div>
`;

// Decorative element - subtle insect silhouette
export const InsectDecoration = (props: { position: 'top' | 'bottom' }) => `
  <div style="position: absolute; ${props.position === 'top' ? 'top: 20px; right: 20px;' : 'bottom: 20px; left: 20px;'} opacity: 0.1; z-index: 1;">
    <img src="https://bijlmakers.com/wp-content/uploads/2018/10/potato-beetle-2766872_1920-700x554.jpg" alt="" width="80" height="80" />
  </div>
`;
