import { prisma } from '@/db/prisma';
import { Prisma, Token, TokenType } from '@prisma/client';

async function createToken(data: Prisma.TokenCreateInput): Promise<Token> {
  return await prisma.token.create({
    data,
  });
}

async function getTokenByToken(token: string, tokenType: TokenType): Promise<Token | null> {
  return await prisma.token.findUnique({
    where: {
      token,
      type: tokenType,
    },
  });
}

async function getAllTokensByUserId(userId: string, tokenType: TokenType): Promise<Token[]> {
  return await prisma.token.findMany({
    where: {
      userId,
      type: tokenType,
    },
  });
}

export const authRepo = {
  createToken,
  getTokenByToken,
  getAllTokensByUserId,
};
