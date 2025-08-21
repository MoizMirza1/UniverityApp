"use client";
import { useSearchParams } from "next/navigation";
import SignInForm from "@/components/signin/SignInForm";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <div>
        {error && (
          <div className="text-red-500 p-2 border border-red-300 rounded text-center mb-4">
            {error === "CredentialsSignin"
              ? "Invalid email or password"
              : "Something went wrong"}
          </div>
        )}
        <SignInForm />
      </div>
    </div>
  );
}
