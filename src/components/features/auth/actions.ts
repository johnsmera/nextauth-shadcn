"use server";

import { signIn } from "@/auth";
import { loginSchema } from "./validations";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";

interface AuthErrorWithMessage extends AuthError {
	cause?: {
		message?: string;
	};
}

export async function credentialsSignInAction(formData: FormData) {
	try {
		const email = formData.get("email");
		const password = formData.get("password");

		const validatedFields = loginSchema.safeParse({
			email,
			password,
		});

		if (!validatedFields.success) {
			return { error: "Campos inválidos" };
		}

		const result = await signIn("credentials", {
			email: validatedFields.data.email,
			password: validatedFields.data.password,
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
			console.log(error);
			return { error: "Login ou senha inválidos, tente novamente." };
		}
		throw error;
	}
}

export async function signInGoogleAction() {
	await signIn("google", { redirectTo: "/dash" });
}

export async function registerAction(formData: FormData) {
	try {
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return { error: "Este email já está em uso" };
		}

		const hashedPassword = await hash(password, 10);

		await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		});

		const result = await signIn("credentials", {
			email,
			password,
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
