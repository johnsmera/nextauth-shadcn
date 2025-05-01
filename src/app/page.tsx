import { LoginForm } from "@/components/features/auth/login-form";
import { Logo } from "@/components/shared/logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
	return (
		<div className="grid grid-cols-[1fr_1fr] h-screen w-screen">
			<div className="flex p-16 flex-col gap-16">
				<Logo />

				<Tabs defaultValue="account" className="w-[400px]">
					<TabsList>
						<TabsTrigger value="account">Entrar</TabsTrigger>
						<TabsTrigger value="password">Cadastrar</TabsTrigger>
					</TabsList>
					<TabsContent value="account">Login Form</TabsContent>
					<TabsContent value="password">Signin form</TabsContent>
				</Tabs>
			</div>

			<LoginForm />
		</div>
	);
}
