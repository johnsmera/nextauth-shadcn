import { PrismaClient } from "@prisma/client";

declare global {
  let prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV !== "production") {
  global.prisma = global.prisma || new PrismaClient();
} 