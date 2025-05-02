import type { PrismaClient } from "@prisma/client";

export const prismaConfig = {
  log: ["error", "warn"] as const,
  datasources: {
    db: {
      url: process.env.DB_URL,
    },
  },
} satisfies ConstructorParameters<typeof PrismaClient>[0]; 