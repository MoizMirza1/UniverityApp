
"use client"
import Link from "next/link";
export default function Custom500() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-5xl font-bold text-red-600 mb-4">500</h1>
      <p className="text-lg mb-6">Oops! Something went wrong with the server.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Home
      </Link>
    </main>
  );
}
