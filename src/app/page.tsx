import { LoginAside } from "@/components/features/auth/login-aside";
import { LoginNavigation } from "@/components/features/auth/login-navigation";
import { Logo } from "@/components/shared/logo";

export default function Home() {
	return (
		<div className="grid grid-cols-[1fr_1fr] h-screen w-screen overflow-hidden">
			<div className="flex p-16 flex-col bg-white overflow-hidden">
				<Logo />

				<LoginNavigation />
			</div>

			<LoginAside />
		</div>
	);
}
