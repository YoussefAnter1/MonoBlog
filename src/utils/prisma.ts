// import { PrismaClient } from '@prisma/client';
// import { PrismaPg } from "@prisma/adapter-pg";

// const prisma = new PrismaClient({
//   adapter: new PrismaPg({
//     connectionString: process.env.DATABASE_URL!,
//   }),
// });

// export default prisma;
// lib/prisma.ts
// import { PrismaClient } from '@prisma/client';


import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
