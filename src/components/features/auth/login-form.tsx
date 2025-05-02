import { GoogleIcon } from "@/components/shared/icons/google-icon";
import { InputLabel } from "@/components/shared/input-label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LoginFormProps {
	className?: string;
}

export function LoginForm({ className }: LoginFormProps) {
	return (
		<div className={cn("flex flex-col mt-6 gap-6", className)}>
			<h2 className="text-3xl font-extrabold">Entrar</h2>

			<h4 className="text-sm text-muted-foreground font-medium">
				Non sit purus tempus malesuada poten
			</h4>

			<InputLabel label="Email" placeholder="e-mail@website.com" />
			<InputLabel label="Senha" placeholder="min. 8 caracteres" />

			<div className="flex justify-between">
				<div className="flex items-center gap-2">
					<Checkbox id="remember" />
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
				<Button>Entrar</Button>
				<Button variant="outline">
					<GoogleIcon />
					Entrar com Google
				</Button>
			</div>
		</div>
	);
}
