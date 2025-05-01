import { LoginBackground } from "@/components/features/auth/login-background";
import { Logo } from "@/components/shared/logo";

export default function Home() {
	return (
		/* grid de 2 colunas */
		<div className="grid grid-cols-[1fr_1fr] h-screen w-screen">
			<Logo />

			<div className="relative flex items-center justify-center">
				<LoginBackground />

				<h1 className="absolute text-5xl font-bold text-left max-w-[400px] tracking-wide ml-16">
					A Revolução do Marketing por{" "}
					<span className="text-secondary">Influência</span>
				</h1>
			</div>
		</div>
	);
}
