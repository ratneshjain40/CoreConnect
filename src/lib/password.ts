import bcrypt from 'bcryptjs';

export async function hashAndSaltPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePasswordAndHash(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function genSixDigitCode(): Promise<string> {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
