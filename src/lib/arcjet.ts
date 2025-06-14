import 'server-only';

import { ErrorResponse } from '@/types/errors';
import arcjet, { detectBot, fixedWindow, shield } from '@arcjet/next';
import { headers } from 'next/headers';
// import { ipAddress } from '@vercel/functions';

// Configure different rules for different types of actions
const createRateLimitRules = (type: 'auth' | 'email' | 'general') => {
  const commonRules = [
    shield({
      mode: 'LIVE',
    }),
    detectBot({
      mode: 'LIVE',
      allow: ['CATEGORY:SEARCH_ENGINE'],
    }),
  ];

  // Different rate limits based on action type
  const rateLimits = {
    auth: fixedWindow({
      mode: 'LIVE',
      window: '60s',
      max: 5, // Strict limit for auth actions
    }),
    email: fixedWindow({
      mode: 'LIVE',
      window: '300s', // 5 minutes
      max: 3, // Very strict limit for email sending
    }),
    general: fixedWindow({
      mode: 'LIVE',
      window: '60s',
      max: 15, // More generous for general actions
    }),
  };

  return [...commonRules, rateLimits[type]];
};

// Default client with general rate limiting
export const aj = arcjet({
  key: process.env.ARCJET_KEY as string,
  characteristics: ['fingerprint'],
  rules: createRateLimitRules('general'),
});

// Specialized clients for different action types
export const authAj = arcjet({
  key: process.env.ARCJET_KEY as string,
  characteristics: ['fingerprint'],
  rules: createRateLimitRules('auth'),
});

export const emailAj = arcjet({
  key: process.env.ARCJET_KEY as string,
  characteristics: ['fingerprint'],
  rules: createRateLimitRules('email'),
});

async function IP() {
  const FALLBACK_IP_ADDRESS = '127.0.0.1';

  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS;
  }

  return headersList.get('x-real-ip') ?? FALLBACK_IP_ADDRESS;
}

// General protection function
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

// Specialized wrapper for auth actions
export async function withAuthRateLimit<T>(action: () => Promise<T>, userId?: string): Promise<T> {
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

  const decision = await authAj.protect(req, {
    fingerprint: userId ? userId : req.ip,
  });

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      throw new ErrorResponse('Too many login attempts. Please try again later.');
    }
    if (decision.reason.isBot()) {
      throw new ErrorResponse('Bot detected. If you are a real user, please try again later.');
    }
    throw new ErrorResponse('Suspicious activity detected.');
  }

  return action();
}

// Specialized wrapper for email actions
export async function withEmailRateLimit<T>(action: () => Promise<T>, email?: string): Promise<T> {
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

  const decision = await emailAj.protect(req, {
    fingerprint: email ? email : req.ip,
  });

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      throw new ErrorResponse('Too many email requests. Please try again in a few minutes.');
    }
    if (decision.reason.isBot()) {
      throw new ErrorResponse('Bot detected. If you are a real user, please try again later.');
    }
    throw new ErrorResponse('Suspicious activity detected.');
  }

  return action();
}
