// components/AppLayout.tsx
"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import MainLayout from "./MainLayout.tsx";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect("/auth/signin");
  }

  return <MainLayout>{children}</MainLayout>;
}