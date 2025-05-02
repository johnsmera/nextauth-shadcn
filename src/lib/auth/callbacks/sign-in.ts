import { PrismaClient } from "@prisma/client";
import type { Account, GoogleProfile } from "../types";
import type { User } from "next-auth";

const prisma = new PrismaClient();

export async function handleSignIn(params: {
  user: User;
  account: Account | null;
  profile?: GoogleProfile;
}) {
  const { account, profile } = params;

  if (account?.provider === "google" && profile) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: profile.email },
      });

      const existingGoogleUser = await prisma.userGoogle.findFirst({
        where: { googleId: profile.sub },
      });

      if (!existingUser) {
        const newUser = await prisma.user.create({
          data: {
            email: profile.email,
            password: "",
            phone: "",
          },
        });

        await prisma.userGoogle.create({
          data: {
            userId: newUser.id.toString(),
            googleId: profile.sub,
          },
        });
      }

      if (!existingGoogleUser && existingUser) {
        await prisma.userGoogle.create({
          data: {
            userId: existingUser.id.toString(),
            googleId: profile.sub,
          },
        });
      }

      return true;
    } catch (error) {
      console.error("Erro ao processar login do Google:", error);
      return false;
    }
  }
  return true;
} 