"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <Link 
        href="/" 
        className="hover:text-gray-300 transition-colors cursor-pointer"
        onClick={() => router.push("/")}
      >
        University System
      </Link>
      {session && (
        <div className="flex items-center gap-4">
          <span>Hello, {session.user?.name}</span>
          <button 
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
}