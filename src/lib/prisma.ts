import { PrismaClient } from "@prisma/client";
import { prismaConfig } from "@/config/prisma";

const prismaClientSingleton = () => {
  return new PrismaClient(prismaConfig);
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
} 