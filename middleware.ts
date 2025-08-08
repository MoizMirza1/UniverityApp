import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
  callbacks: {
    authorized: async ({ token, req }) => {
      if (!token) return false;
      
      // Verify token with backend on protected routes
      if (req.nextUrl.pathname.startsWith('/admin') || 
          req.nextUrl.pathname.startsWith('/faculty')) {
        try {
          const res = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          });
          return res.ok;
        } catch {
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/admin/:path*", "/faculty/:path*"],
};