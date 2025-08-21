"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
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
    <div>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden p-10">
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg">
            <Image
              src="/images/cat.png"
              alt="User Avatar"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Snoop Cat</h2>
          <p className="text-blue-600 text-sm font-medium mt-1">Admin / Student</p>

          <p className="mt-6 text-gray-600 italic text-sm px-4">
            "This platform has completely transformed how our team collaborates on
            projects. The intuitive interface saves us hours every week."
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 bg-gray-50 p-6 rounded-xl shadow-md border border-gray-100"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              className="border border-gray-200 p-4 w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
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
              className="border border-gray-200 p-4 w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
            } text-white p-4 w-full rounded-xl font-medium transition-all duration-200 shadow-md flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
          <div className="text-center">
            <Link
              href="/"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              ← Go to Home
            </Link>
          </div>
        </form>
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>© 2025 Who? All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
