import { withAuth } from "next-auth/middleware";
export default withAuth({
  callbacks: {
    authorized: async ({ token, req }) => {
      if (!token) return false;

      const protectedPaths = ['/dashboard', '/admin', '/faculty','/student'];
      if (!protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))) return true;

      const verifyUrl = `${process.env.BACKEND_API_URL}/verify`;
      console.log("Middleware verifying token at:", verifyUrl);

      try {
        const res = await fetch(verifyUrl, {
          headers: { Authorization: `Bearer ${token.accessToken}` },
        });
        console.log("Verify API response status:", res.status);

        if (!res.ok) {
          console.log("Token invalid or expired");
          return false; 
        }
        return true;
      } catch (err) {
        console.log("Error calling verify API:", err);
        return false; 
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard",
    "/admin/:path*",
    "/admin",
    "/student",
    "/student/:path*",
    "/faculty/:path*",
    "/faculty"
  ],
};
