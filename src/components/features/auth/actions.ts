"use server";

import { loginSchema } from "./validations";
import { AuthService } from "./services/auth.service";

export async function credentialsSignInAction(formData: FormData) {
	const email = formData.get("email");
	const password = formData.get("password");

	const validatedFields = loginSchema.safeParse({
		email,
		password,
	});

	if (!validatedFields.success) {
		return { error: "Campos inválidos" };
	}

	const authService = new AuthService();
	return authService.signInWithCredentials({
		email: validatedFields.data.email,
		password: validatedFields.data.password,
	});
}

export async function signInGoogleAction() {
	const authService = new AuthService();
	await authService.signInWithGoogle();
}

export async function registerAction(formData: FormData) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const authService = new AuthService();
	return authService.register({ email, password });
}
