import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "University administration portal",
};

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    notFound();
  }

  return (
    <section className="bg-[#f1f3f5] min-h-screen flex">
      <Sidebar />
      <div className="flex-1 lg:pl-64">
        <Header />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </section>
  );
}