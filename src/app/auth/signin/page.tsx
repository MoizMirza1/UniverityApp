"use client";
import { useSearchParams } from "next/navigation";
import SignInForm from "@/components/signin/SignInForm";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex"
    style={{ backgroundImage: "url('/images/background.jpg')" }}>
      <div className="w-full lg:w-2/3 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
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

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/3 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/cat.png')" }}
        >
 
        </div>
      </div>
    </div>
  );
}