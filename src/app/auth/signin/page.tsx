"use client";
import { useSearchParams } from "next/navigation";
import SignInForm from "@/components/signin/SignInForm";
import Image from "next/image";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-md xl:max-w-lg">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200 text-center mb-4 text-sm">
              {error === "CredentialsSignin"
                ? "Invalid email or password. Please try again."
                : "Something went wrong. Please try again."}
            </div>
          )}
          <SignInForm />
        </div>
      </div>

      {/* Right side - Image (hidden on small screens) */}
      <div className="hidden lg:flex lg:flex-1 items-center justify-center">
        <div className="relative w-full h-full p-8">
          <Image
            src="/images/cat.png"
            alt="Sign In Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
