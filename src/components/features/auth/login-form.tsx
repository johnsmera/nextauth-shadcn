"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "./validations";
import { credentialsSignInAction, signInGoogleAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputLabel } from "@/components/shared/input-label";
import { GoogleIcon } from "@/components/shared/icons/google-icon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  className?: string;
}

export function LoginForm({ className }: LoginFormProps) {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setRememberMe(true);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", data.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      const result = await credentialsSignInAction(formData);

      if (result?.error) {
        setError("root", {
          message: result.error,
        });
        toast.error(result.error);
        setIsLoading(false);
        return;
      }

      push("/dash");
    } catch (error) {
      console.log("Erro ao fazer login:", error);
      toast.error("Ocorreu um erro ao fazer login");
      setIsLoading(false);
    }
  };

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
