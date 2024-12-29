import 'server-only';
import { ErrorResponse } from '@/types/errors';
import { userRepo } from './repo';
import { z } from 'zod';
import { createUserSchema } from '../schema/user';

async function getUserByEmail(email: string) {
  const user = await userRepo.getUserByEmail(email);
  if (!user) {
    throw new ErrorResponse('User not found for this email');
  }
  return user;
}

async function getUserById(id: string) {
  const user = await userRepo.getUserById(id);
  console.log('USER:', user);
  if (!user) {
    throw new ErrorResponse('User not found');
  }
  return user;
}

async function createUser(data: z.infer<typeof createUserSchema>) {
  const existingUser = await userRepo.getUserByEmail(data.email);
  if (existingUser) {
    throw new ErrorResponse('User already exists with this email');
  }
  return await userRepo.createUser(data);
}

async function updateEmailVerifiedDate(id: string, date: Date) {
  return await userRepo.updateEmailVerifiedDate(id, date);
}

async function updatePassword(id: string, password: string) {
  return await userRepo.updatePassword(id, password);
}

export const userService = {
  getUserByEmail,
  getUserById,
  createUser,
  updateEmailVerifiedDate,
  updatePassword,
};
