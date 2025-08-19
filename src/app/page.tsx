// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          University Management System
        </h1>
        <p className="text-center text-gray-600">
          Welcome to our university portal. Please sign in to access your account.
        </p>

        {!session ? (
          <div className="space-y-4">
            <Link href="/auth/signin" className="w-full">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                Sign In
              </button>
            </Link>
            <p className="text-sm text-center text-gray-500">
              Don't have an account? Contact administrator
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-green-600">
              You're already signed in as {session.user?.name}
            </p>
            <div className="flex flex-col space-y-2">
              {session.user?.role === "admin" && (
                <Link href="/admin" className="w-full">
                  <button className="w-full bg-white text-blue-600 py-2 px-4 rounded border border-blue-600 hover:bg-blue-50 transition-colors">
                    Go to Admin Dashboard
                  </button>
                </Link>
              )}
              {session.user?.role === "faculty" && (
                <Link href="/faculty" className="w-full">
                  <button className="w-full bg-white text-blue-600 py-2 px-4 rounded border border-blue-600 hover:bg-blue-50 transition-colors">
                    Go to Faculty Dashboard
                  </button>
                </Link>
              )}
              {session.user?.role === "student" && (
                <Link href="/student" className="w-full">
                  <button className="w-full bg-white text-blue-600 py-2 px-4 rounded border border-blue-600 hover:bg-blue-50 transition-colors">
                    Go to Student Dashboard
                  </button>
                </Link>
              )}
              {/* <Link href="/api/auth/signout" className="w-full">
                <button className="w-full bg-transparent text-gray-600 py-2 px-4 rounded hover:bg-gray-100 transition-colors">
                  Sign Out
                </button>
              </Link> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}