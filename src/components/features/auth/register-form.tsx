"use client";

import { Button } from "@/components/ui/button";
import { InputLabel } from "@/components/shared/input-label";
import { cn } from "@/lib/utils";
import { useRegisterForm } from "@/hooks/use-register-form";

interface RegisterFormProps {
  className?: string;
}

export function RegisterForm({ className }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
  } = useRegisterForm();

  return (
    <div className={cn("flex flex-col mt-6 gap-6", className)}>
      <h2 className="text-3xl font-extrabold">Cadastrar</h2>

      <h4 className="text-sm text-muted-foreground font-medium">
        Crie sua conta para começar a usar nossos serviços
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

        <InputLabel
          label="Confirmar Senha"
          placeholder="confirme sua senha"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <div className="flex flex-col gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Criando conta..." : "Criar conta"}
          </Button>
        </div>
      </form>
    </div>
  );
}
