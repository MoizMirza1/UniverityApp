import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 dark:bg-gray-900">
      <div className="text-center max-w-md">
        {/* 404 Graphic */}
        <div className="mb-8 relative">
          <span className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</span>
          
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4 dark:text-white">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8 text-lg dark:text-gray-300">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        {/* Main Action Button */}
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mb-4"
        >
          Return to Homepage
        </Link>

        {/* Secondary Links */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 mb-3">Try these instead:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/blog"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Contact
            </Link>
            <Link
              href="/help"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}