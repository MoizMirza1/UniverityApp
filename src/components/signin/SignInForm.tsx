"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link"; 

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const target = e.target as HTMLFormElement;
    const email = target.email.value;
    const password = target.password.value;

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-8 px-4 sm:px-6 lg:px-4">
      <div className="w-full max-w-xl bg-gradient-to-br from-blue-100 to-gray-100 rounded-2xl shadow-xl overflow-hidden p-8">
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
          <p className="text-gray-600 mt-2">Access your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a
                href="#"
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                Forgot password?
              </a>
            </div>
            <input
              name="password"
              type="password"
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading
                ? "bg-blue-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white p-3 w-full rounded-lg font-medium transition-all duration-200 flex items-center justify-center h-12`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
          
          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
          </div>
        </form>
        
        <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>© 2025 Anonymous. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}