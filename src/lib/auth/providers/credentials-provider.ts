import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Senha", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      throw new Error("Email e senha são obrigatórios");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: credentials.email as string,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password as string,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error("Senha inválida");
    }

    return {
      id: user.id.toString(),
      email: user.email,
    };
  },
}); 