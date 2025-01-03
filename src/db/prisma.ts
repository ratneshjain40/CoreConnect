import 'server-only';

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

prisma.$extends({
  query: {
    $allModels: {
      $allOperations({ model, operation, args, query }) {
        /* your custom logic here */
        const before = Date.now()
        const res = query(args)
        const after = Date.now()
        console.log(`Query ${model}.${operation} took ${after - before}ms`)
        return res
      },
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
