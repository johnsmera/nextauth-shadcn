"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./login-form";
import { cn } from "@/lib/utils";

interface LoginNavigationProps {
	className?: string;
}

export function LoginNavigation({ className }: LoginNavigationProps) {
	const [activeTab, setActiveTab] = useState("signin");

	const renderSigninContent = () => {
		return (
			<div className="flex flex-col gap-4">
				<LoginForm />
				<span className="text-sm text-center text-muted-foreground">
					Ainda não tem conta?{" "}
					<span
						className="text-primary font-medium cursor-pointer"
						onClick={() => setActiveTab("signup")}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setActiveTab("signup");
							}
						}}
					>
						Assine agora
					</span>
				</span>
			</div>
		);
	};

	return (
		<div className={cn("w-full", className)}>
			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className="w-[400px]"
			>
				<TabsList>
					<TabsTrigger value="signin">Entrar</TabsTrigger>
					<TabsTrigger value="signup">Cadastrar</TabsTrigger>
				</TabsList>
				<TabsContent value="signin">{renderSigninContent()}</TabsContent>
				<TabsContent value="signup">Signin form</TabsContent>
			</Tabs>
		</div>
	);
}
