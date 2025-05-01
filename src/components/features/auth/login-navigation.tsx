"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./login-form";

export function LoginNavigation() {
	const [activeTab, setActiveTab] = useState("signin");

	const renderSigninContent = () => {
		return <LoginForm />;
	};

	return (
		<div>
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
