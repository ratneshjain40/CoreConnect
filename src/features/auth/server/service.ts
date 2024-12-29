import 'server-only';

import { userService } from '@/features/users/server/service';
import { ErrorResponse } from '@/types/errors';
import { login2FASchema, loginWithCredsSchema, newPasswordSchema, registerSchema, resetSchema } from '../schema/auth';
import { z } from 'zod';
import { comparePasswordAndHash, genSixDigitCode, hashAndSaltPassword } from '@/lib/password';
import { authRepo } from './repo';
import { Token, User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { sendPasswordResetEmail } from './mail';

// ---------------------------------------------- Auth with Creds ----------------------------------------------

const TOKEN_EXPIRY_TIME = 300 * 1000;

async function register(data: z.infer<typeof registerSchema>): Promise<User> {
  const password = await hashAndSaltPassword(data.password);
  return await userService.createUser({
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    password: password,
    isTwoFactorEnabled: data.isTwoFactorEnabled,
  });
}

async function loginWithCreds(data: z.infer<typeof loginWithCredsSchema>): Promise<User> {
  const user = await userService.getUserByEmail(data.email);
  if (!user.password) {
    throw new ErrorResponse('Password not associated with account');
  }
  const passwordMatch = await comparePasswordAndHash(data.password, user.password);
  if (!passwordMatch) {
    throw new ErrorResponse('Invalid password');
  }
  return user;
}

// ---------------------------------------------- Two Factor Auth ----------------------------------------------

async function generate2FAToken(user: User): Promise<Token> {
  const code = await genSixDigitCode();
  if (!user.isTwoFactorEnabled) {
    throw new ErrorResponse('2FA not enabled for this account');
  }

  const existingToken = await authRepo.getAllTokensByUserId(user.id, 'TWO_FACTOR');
  if (existingToken.length > 2) {
    return existingToken[0];
  }

  return await authRepo.createToken({
    userId: user.id,
    type: 'TWO_FACTOR',
    expiresAt: new Date(new Date().getTime() + TOKEN_EXPIRY_TIME),
    token: code,
  });
}

async function login2FA(data: z.infer<typeof login2FASchema>): Promise<User> {
  const user = await userService.getUserByEmail(data.email);
  if (!user.isTwoFactorEnabled) {
    throw new ErrorResponse('2FA not enabled for this account');
  }
  const token = await authRepo.getTokenByToken(data.code, 'TWO_FACTOR');
  if (!token) {
    throw new ErrorResponse('Invalid 2FA code');
  }
  return user;
}

// ---------------------------------------------- Verify Email ----------------------------------------------

async function generateEmailVerificationToken(user: User): Promise<Token> {
  const code = uuidv4();

  const existingToken = await authRepo.getAllTokensByUserId(user.id, 'EMAIL_VERIFICATION');
  if (existingToken.length > 2) {
    return existingToken[0];
  }

  return await authRepo.createToken({
    userId: user.id,
    type: 'EMAIL_VERIFICATION',
    expiresAt: new Date(new Date().getTime() + TOKEN_EXPIRY_TIME),
    token: code,
  });
}

async function verifyEmailVerificationToken(token: string): Promise<User> {
  const tokenRecord = await authRepo.getTokenByToken(token, 'EMAIL_VERIFICATION');
  if (!tokenRecord) {
    throw new ErrorResponse('Invalid token');
  }
  const user = await userService.getUserById(tokenRecord.userId);
  userService.updateEmailVerifiedDate(user.id, new Date(Date.now()));
  return user;
}

// ---------------------------------------------- Forgot / Reset Password ----------------------------------------------

async function resetPasswordEmail(data: z.infer<typeof resetSchema>): Promise<User> {
  const user = await userService.getUserByEmail(data.email);
  if (!user) {
    throw new ErrorResponse('User not found');
  }

  const existingToken = await authRepo.getAllTokensByUserId(user.id, 'RESET_PASSWORD');
  if (existingToken.length > 2) {
    return user;
  }

  const code = uuidv4();
  const token = await authRepo.createToken({
    userId: user.id,
    type: 'RESET_PASSWORD',
    expiresAt: new Date(new Date().getTime() + TOKEN_EXPIRY_TIME),
    token: code,
  });
  await sendPasswordResetEmail(user.email, token.token);
  return user;
}

async function resetPassword(data: z.infer<typeof newPasswordSchema>): Promise<User> {
  const tokenRecord = await authRepo.getTokenByToken(data.token, 'RESET_PASSWORD');
  if (!tokenRecord) {
    throw new ErrorResponse('Invalid token');
  }
  const user = await userService.getUserById(tokenRecord.userId);
  if (!user.emailVerified) {
    throw new ErrorResponse('Email not verified');
  }
  const password = await hashAndSaltPassword(data.password);
  return await userService.updatePassword(user.id, password);
}

export const authService = {
  loginWithCreds,
  login2FA,
  generate2FAToken,
  generateEmailVerificationToken,
  register,
  verifyEmailVerificationToken,
  resetPasswordEmail,
  resetPassword,
};
