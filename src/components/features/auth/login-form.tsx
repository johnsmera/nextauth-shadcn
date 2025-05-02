"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputLabel } from "@/components/shared/input-label";
import { GoogleIcon } from "@/components/shared/icons/google-icon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { signInGoogleAction } from "./actions";
import { useLoginForm } from "@/hooks/use-login-form";

interface LoginFormProps {
  className?: string;
}

export function LoginForm({ className }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    rememberMe,
    setRememberMe,
    onSubmit,
  } = useLoginForm();

  return (
    <div className={cn("flex flex-col mt-6 gap-6", className)}>
      <h2 className="text-3xl font-extrabold">Entrar</h2>
      <h4 className="text-sm text-muted-foreground font-medium">
        Non sit purus tempus malesuada poten
      </h4>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputLabel
          label="Email"
          placeholder="e-mail@website.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <InputLabel
          label="Senha"
          placeholder="min. 8 caracteres"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pb-[1px]"
            >
              Lembrar
            </label>
          </div>

          <Link
            href="/forgot-password"
            className="text-sm text-primary font-medium pb-[1px]"
          >
            Esqueceu a senha?
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>

          <Button onClick={signInGoogleAction} variant="outline" type="button">
            <GoogleIcon />
            Entrar com Google
          </Button>
        </div>
      </form>
    </div>
  );
}
