"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "./validations";
import { registerAction } from "./actions";
import { Button } from "@/components/ui/button";
import { InputLabel } from "@/components/shared/input-label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface RegisterFormProps {
  className?: string;
}

export function RegisterForm({ className }: RegisterFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormData) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        const result = await registerAction(formData);

        if (result?.error) {
          setError("root", {
            message: result.error,
          });
          toast.error(result.error);
          return;
        }

        toast.success("Conta criada com sucesso!");
        router.push("/dash");
      } catch {
        toast.error("Ocorreu um erro ao criar a conta");
      }
    });
  };

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
