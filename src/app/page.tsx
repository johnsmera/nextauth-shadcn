import { LoginAside } from "@/components/features/auth/login-aside";
import { LoginNavigation } from "@/components/features/auth/login-navigation";
import { Logo } from "@/components/shared/logo";

export default function Home() {
	return (
		<div className="grid grid-cols-[1fr_1fr] h-screen w-screen overflow-hidden">
			<div className="flex flex-col p-4 md:p-16 bg-white gap-4 overflow-y-auto">
				<div className="flex-shrink-0">
					<Logo />
				</div>
				<div className="flex-grow flex items-center justify-center">
					<LoginNavigation />
				</div>
			</div>

			<LoginAside />
		</div>
	);
}
