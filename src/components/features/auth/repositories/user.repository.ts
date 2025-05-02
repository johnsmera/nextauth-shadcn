import { prisma } from "@/lib/prisma";
import type { User } from "../types/auth.types";
import { hash } from "bcryptjs";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
}

export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async create(user: User) {
    const hashedPassword = await hash(user.password, 10);
    
    return prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
      },
    });
  }
} 