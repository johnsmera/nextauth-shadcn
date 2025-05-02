import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashPage() {
  const session = await auth();

  if (!session?.user) redirect("/");

  return <div>{session?.user?.email}</div>;
}
