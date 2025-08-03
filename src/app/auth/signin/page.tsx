// app/auth/signin/page.tsx
"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.target as HTMLFormElement);

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      // Redirect manually to error page with error code
      router.push(`/auth/error?error=${result.error}&callbackUrl=${encodeURIComponent(callbackUrl)}`);
    } else if (result?.url) {
      router.push(result.url);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="text-red-500 p-2 border border-red-300 rounded">
            {error}
          </div>
        )}
        <div>
          <label>Email</label>
          <input 
            name="email" 
            type="email" 
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            name="password" 
            type="password" 
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Sign In
        </button>
      </form>
    </div>
  );
}