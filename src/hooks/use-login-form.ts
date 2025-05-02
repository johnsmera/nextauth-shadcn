import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/components/features/auth/validations";
import { credentialsSignInAction } from "@/components/features/auth/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLoginForm() {
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

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    rememberMe,
    setRememberMe,
    onSubmit,
  };
} 