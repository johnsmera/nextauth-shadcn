import NextAuth from "next-auth";
import { googleProvider } from "./providers/google-provider";
import { credentialsProvider } from "./providers/credentials-provider";
import { handleSignIn } from "./callbacks/sign-in";
import type { GoogleProfile } from "./types";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [googleProvider, credentialsProvider],
	callbacks: {
		signIn: async ({ user, account, profile }) => {
			return await handleSignIn({
				user,
				account: account || null,
				profile: profile as GoogleProfile,
			});
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
