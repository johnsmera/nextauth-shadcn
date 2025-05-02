import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/features/auth/logout-button";

export default async function DashPage() {
  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Informações do Usuário
            </h2>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {session.user.email}
            </p>
            {session.user.name && (
              <p className="text-gray-600">
                <span className="font-medium">Nome:</span> {session.user.name}
              </p>
            )}
          </div>

          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
