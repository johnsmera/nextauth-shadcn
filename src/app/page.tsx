import { auth } from "@/lib/auth";
import { LoginAside } from "@/components/features/auth/login-aside";
import { LoginBackground } from "@/components/features/auth/login-background";
import { LoginNavigation } from "@/components/features/auth/login-navigation";
import { Logo } from "@/components/shared/logo";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user) redirect("/dash");

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1fr] h-screen w-screen overflow-hidden relative">
      <div className="flex flex-col p-4 md:p-16 bg-white gap-4 overflow-y-auto m-6 lg:m-0 rounded-xl lg:rounded-none relative z-10">
        <div className="flex-shrink-0 self-start">
          <Logo />
        </div>
        <div className="flex-grow flex lg:block items-center justify-center">
          <div className="w-full max-w-[400px] mx-auto lg:mx-0 lg:w-[400px]">
            <LoginNavigation />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 lg:hidden">
        <LoginBackground />
      </div>

      <LoginAside className="hidden lg:flex" />
    </div>
  );
}
