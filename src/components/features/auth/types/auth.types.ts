import type { AuthError } from "next-auth";

export interface AuthErrorWithMessage extends AuthError {
  cause?: {
    message?: string;
  };
}

export interface AuthResponse {
  success?: boolean;
  error?: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  email: string;
  password: string;
} 