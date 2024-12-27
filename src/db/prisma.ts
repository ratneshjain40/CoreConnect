import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

await prisma.$runCommandRaw({
  createIndexes: 'Token',
  indexes: [
    {
      key: {
        expiresAt: 1,
      },
      name: 'expiresAt_ttl_index',
      expireAfterSeconds: 0,
    },
  ],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
