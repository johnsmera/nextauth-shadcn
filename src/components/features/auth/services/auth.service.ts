import { signIn } from "@/lib/auth";
import {
	type IUserRepository,
	PrismaUserRepository,
} from "../repositories/user.repository";
import type {
	AuthResponse,
	Credentials,
	User,
	AuthErrorWithMessage,
} from "../types/auth.types";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export class AuthService {
	private userRepository: IUserRepository;

	constructor() {
		this.userRepository = new PrismaUserRepository();
	}

	async signInWithCredentials(credentials: Credentials): Promise<AuthResponse> {
		try {
			const result = await signIn("credentials", {
				email: credentials.email,
				password: credentials.password,
				redirect: false,
			});

			if (result?.error) {
				return { error: "Credenciais inválidas" };
			}

			return { success: true };
		} catch (error) {
			if (error instanceof AuthError) {
				const authError = error as AuthErrorWithMessage;
				if (authError.cause?.message === "CredentialsSignin") {
					return { error: "Credenciais inválidas, tente novamente." };
				}
				return { error: "Login ou senha inválidos, tente novamente." };
			}
			throw error;
		}
	}

	async signInWithGoogle() {
		await signIn("google", { redirectTo: "/dash" });
	}

	async register(user: User): Promise<AuthResponse> {
		try {
			const existingUser = await this.userRepository.findByEmail(user.email);

			if (existingUser) {
				return { error: "Este email já está em uso" };
			}

			await this.userRepository.create(user);

			const result = await signIn("credentials", {
				email: user.email,
				password: user.password,
				redirect: false,
			});

			if (result?.error) {
				return { error: "Erro ao fazer login após registro" };
			}

			revalidatePath("/");
			return { success: true };
		} catch (error) {
			console.error("Erro ao registrar usuário:", error);
			return { error: "Ocorreu um erro ao registrar o usuário" };
		}
	}
}
