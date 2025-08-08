import "./globals.css";
import type { Metadata } from "next";
import { inter } from "./fonts";
import DefaultLayout from "@/components/DefaultLayout";
import { getServerSession } from "next-auth";
import SessionProviders from "@/components/context/SessionProviders";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "University System",
  description: "University management portal",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);


  
 return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviders session={session}>
          {children}
        </SessionProviders>
      </body>
    </html>
  );
}