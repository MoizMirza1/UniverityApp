import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  // // Redirect unauthenticated users to sign-in
  // if (!session) {
  //   redirect("/auth/signin");
  // }

  // Redirect authenticated users to dashboard
  redirect("/dashboard");
}