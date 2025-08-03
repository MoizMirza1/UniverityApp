// app/auth/error/page.tsx
'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const errorMessages: Record<string, string> = {
  CredentialsSignin: 'Invalid email or password',
  OAuthSignin: 'Error signing in with provider',
  SessionRequired: 'Please sign in to access this page',
  default: 'An authentication error occurred',
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center space-y-6">
          {/* Error Icon */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Error Message */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Sign In Error</h2>
            <p className="mt-2 text-gray-600">
              {error ? errorMessages[error] || errorMessages.default : errorMessages.default}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <Link
              href={`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
               Go to Sign In
            </Link>
          
          </div>
        </div>
      </div>
    </div>
  )
}