import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import type { AuthService } from "../auth.service";
import type { PrismaUserRepository } from "../../repositories/user.repository";
import type { AuthError as AuthErrorType } from "next-auth";

// Mock das dependências
jest.mock("../../repositories/user.repository");
jest.mock("@/lib/auth", () => ({
	signIn: jest.fn().mockImplementation(async () => ({ error: null })),
}));
jest.mock("next/cache", () => ({
	revalidatePath: jest.fn(),
}));
jest.mock("next-auth", () => {
	class AuthError extends Error {
		constructor(message: string) {
			super(message);
			this.name = "AuthError";
		}
	}
	return { AuthError };
});

describe("AuthService", () => {
	let authService: AuthService;
	let mockUserRepository: jest.Mocked<PrismaUserRepository>;
	let mockSignIn: jest.Mock;
	let mockRevalidatePath: jest.Mock;
	let AuthError: typeof AuthErrorType;

	beforeEach(() => {
		// Resetar todos os mocks antes de cada teste
		jest.clearAllMocks();

		// Criar instância do serviço
		const AuthServiceClass = require("../auth.service").AuthService;
		authService = new AuthServiceClass();

		// Criar mock do repositório
		mockUserRepository = {
			findByEmail: jest.fn(),
			create: jest.fn(),
		} as unknown as jest.Mocked<PrismaUserRepository>;

		// Injetar o mock do repositório no serviço
		(
			authService as unknown as { userRepository: typeof mockUserRepository }
		).userRepository = mockUserRepository;

		// Obter referência para os mocks
		mockSignIn = require("@/lib/auth").signIn;
		mockRevalidatePath = require("next/cache").revalidatePath;
		AuthError = require("next-auth").AuthError;
	});

	describe("signInWithCredentials", () => {
		it("deve retornar sucesso quando as credenciais são válidas", async () => {
			// Arrange
			mockSignIn.mockImplementationOnce(async () => ({ error: null }));

			// Act
			const result = await authService.signInWithCredentials({
				email: "test@example.com",
				password: "password123",
			});

			// Assert
			expect(result).toEqual({ success: true });
			expect(mockSignIn).toHaveBeenCalledWith("credentials", {
				email: "test@example.com",
				password: "password123",
				redirect: false,
			});
		});

		it("deve retornar erro quando as credenciais são inválidas", async () => {
			// Arrange
			mockSignIn.mockImplementationOnce(async () => ({
				error: "Invalid credentials",
			}));

			// Act
			const result = await authService.signInWithCredentials({
				email: "test@example.com",
				password: "wrongpassword",
			});

			// Assert
			expect(result).toEqual({ error: "Credenciais inválidas" });
		});

		it("deve lidar com erros de autenticação", async () => {
			// Arrange
			const error = new AuthError("CredentialsSignin") as AuthErrorType;
			error.cause = { message: "CredentialsSignin" };
			mockSignIn.mockImplementationOnce(async () => {
				throw error;
			});

			// Act
			const result = await authService.signInWithCredentials({
				email: "test@example.com",
				password: "wrongpassword",
			});

			// Assert
			expect(result).toEqual({
				error: "Credenciais inválidas, tente novamente.",
			});
		});
	});

	describe("register", () => {
		it("deve registrar um novo usuário com sucesso", async () => {
			// Arrange
			mockSignIn.mockImplementationOnce(async () => ({ error: null }));
			mockUserRepository.findByEmail.mockResolvedValue(null);
			mockUserRepository.create.mockResolvedValue({
				id: 1,
				email: "newuser@example.com",
				password: "hashedpassword",
				phone: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			});

			// Act
			const result = await authService.register({
				email: "newuser@example.com",
				password: "password123",
			});

			// Assert
			expect(result).toEqual({ success: true });
			expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
				"newuser@example.com",
			);
			expect(mockUserRepository.create).toHaveBeenCalledWith({
				email: "newuser@example.com",
				password: "password123",
			});
			expect(mockRevalidatePath).toHaveBeenCalledWith("/");
		});

		it("deve retornar erro quando o email já está em uso", async () => {
			// Arrange
			mockUserRepository.findByEmail.mockResolvedValue({
				id: 1,
				email: "existing@example.com",
				password: "hashedpassword",
				phone: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			});

			// Act
			const result = await authService.register({
				email: "existing@example.com",
				password: "password123",
			});

			// Assert
			expect(result).toEqual({ error: "Este email já está em uso" });
			expect(mockUserRepository.create).not.toHaveBeenCalled();
		});
	});
});
