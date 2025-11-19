// src/app/(protected)/dashboard/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authOptions";
import DashboardClient from "@/components/dashboard/dashboard";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const sessionData = {
    user: {
      name: session.user?.name ?? "",
      email: session.user?.email ?? "",
      image: session.user?.image ?? null,
    },
  };

  return <DashboardClient session={sessionData} />;
}
