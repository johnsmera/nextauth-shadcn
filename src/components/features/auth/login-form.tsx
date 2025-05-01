import { InputLabel } from "@/components/shared/input-label";
import { cn } from "@/lib/utils";

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
		</div>
	);
}
