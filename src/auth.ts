import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
		CredentialsProvider({
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
		}),
	],
	callbacks: {
		async signIn({ account, profile }) {
			if (account?.provider === "google") {
				try {
					// Verifica se já existe um usuário com este email
					const existingUser = await prisma.user.findUnique({
						where: { email: profile?.email as string },
					});

					// Verifica se já existe um vínculo com o Google
					const existingGoogleUser = await prisma.userGoogle.findFirst({
						where: { googleId: profile?.sub as string },
					});

					if (!existingUser) {
						// Cria um novo usuário se não existir
						const newUser = await prisma.user.create({
							data: {
								email: profile?.email as string,
								password: "", // Senha vazia pois o usuário usa Google
								phone: "", // Telefone vazio inicialmente
							},
						});

						// Cria o vínculo com o Google
						await prisma.userGoogle.create({
							data: {
								userId: newUser.id.toString(),
								googleId: profile?.sub as string,
							},
						});
					}
					if (!existingGoogleUser && existingUser) {
						// Se o usuário existe mas não tem vínculo com Google, cria o vínculo
						await prisma.userGoogle.create({
							data: {
								userId: existingUser.id.toString(),
								googleId: profile?.sub as string,
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
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
			}
			return session;
		},
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
});
