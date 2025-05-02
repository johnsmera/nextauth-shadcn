import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/components/features/auth/validations";
import { registerAction } from "@/components/features/auth/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useRegisterForm() {
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

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
  };
} 