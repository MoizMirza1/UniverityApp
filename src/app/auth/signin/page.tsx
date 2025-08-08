"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const target = e.target as HTMLFormElement;
    const email = target.email.value;
    const password = target.password.value;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
       callbackUrl: "/"
      });

      if (result?.error) {
        setError(result.error.includes("ECONNREFUSED") 
          ? "Cannot connect to server" 
          : "Invalid email or password");
      } else {
        router.push(result?.url || "/");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("SignIn Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form 
        onSubmit={handleSubmit} 
        className="space-y-4 bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        
        {error && (
          <div className="text-red-500 p-2 border border-red-300 rounded text-center">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            name="email" 
            type="email" 
            className="border p-2 w-full rounded"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input 
            name="password" 
            type="password" 
            className="border p-2 w-full rounded"
            required
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}