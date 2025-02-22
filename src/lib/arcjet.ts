import 'server-only';

import { ErrorResponse } from '@/types/errors';
import arcjet, { detectBot, fixedWindow, shield } from '@arcjet/next';
import { headers } from 'next/headers';
// import { ipAddress } from '@vercel/functions';

export const aj = arcjet({
  key: process.env.ARCJET_KEY as string,
  characteristics: ['fingerprint'],
  rules: [
    shield({
      mode: 'LIVE',
    }),
    detectBot({
      mode: 'LIVE',
      allow: ['CATEGORY:SEARCH_ENGINE', 'CURL'],
    }),
    fixedWindow({
      mode: 'LIVE',
      window: '60s',
      max: 5,
    }),
  ],
});

async function IP() {
  const FALLBACK_IP_ADDRESS = '127.0.0.1';

  // Uncomment if running on Vercel
  // const ip = ipAddress(request);
  // return ip ?? FALLBACK_IP_ADDRESS;

  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS;
  }

  const headersResult = await headers();
  return headersResult.get('x-real-ip') ?? FALLBACK_IP_ADDRESS;
}

export async function applyArcjetProtection(userId?: string) {
  const headersList = await headers();
  const host = headersList.get('host');

  const path = new URL(`http://${host}`);
  const req = {
    ip: await IP(),
    method: 'POST',
    host: headersList.get('host'),
    url: path.href,
    headers: headersList,
  };

  const decision = await aj.protect(req, {
    fingerprint: userId ? userId : req.ip,
  });

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      throw new ErrorResponse('Rate limit exceeded. Please try again later.');
    }
    if (decision.reason.isBot()) {
      throw new ErrorResponse('Bot detected.');
    }
    throw new ErrorResponse('Suspicious activity detected.');
  }

  return req;
}
