import { LoginBackground } from "./login-background";

export function LoginAside() {
	return (
		<div className="relative flex items-center justify-center">
			<LoginBackground />

			<h1 className="absolute text-5xl font-extrabold text-left max-w-[400px] tracking-wide ml-16">
				A Revolução do Marketing por{" "}
				<span className="text-secondary">Influência</span>
			</h1>
		</div>
	);
}
