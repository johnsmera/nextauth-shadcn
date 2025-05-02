import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O email é obrigatório")
    .email("Por favor, insira um email válido")
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .min(1, "A senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(32, "A senha deve ter no máximo 32 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>; 