// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname;
    const role = req.nextauth.token?.role;

    // Redirect to appropriate dashboard based on role
    if (path === "/dashboard") {
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      if (role === "faculty") {
        return NextResponse.redirect(new URL("/faculty", req.url));
      }
    }

    // Protect admin routes
    if (path.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/auth/unauthorized", req.url));
    }

    // Protect faculty routes
    if (path.startsWith("/faculty") && role !== "faculty") {
      return NextResponse.redirect(new URL("/auth/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/admin/:path*", "/faculty/:path*"],
};