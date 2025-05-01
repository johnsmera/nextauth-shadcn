import { LoginBackground } from "./login-background";
import { cn } from "@/lib/utils";

interface LoginAsideProps {
	className?: string;
}

export function LoginAside({ className }: LoginAsideProps) {
	return (
		<div className={cn("relative flex items-center justify-center", className)}>
			<LoginBackground />

			<h1 className="absolute text-5xl font-extrabold text-left max-w-[400px] tracking-wide ml-16">
				A Revolução do Marketing por{" "}
				<span className="text-secondary">Influência</span>
			</h1>
		</div>
	);
}
