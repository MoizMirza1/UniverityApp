import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  // REQUIRED: Add secret for encryption
  secret: process.env.NEXTAUTH_SECRET,
  
  // REQUIRED: Session strategy
  session: {
    strategy: "jwt", // Explicitly set JWT strategy
    maxAge: 30 * 24 * 60 * 60, // 30 days session duration
  },

  // REQUIRED: JSON Web Token configuration
  jwt: {
    encryption: true, // Enable encryption
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock user - replace with real DB check
        if (credentials?.email === "admin@university.edu" && 
            credentials?.password === "123") {
          return {
            id: "1",
            name: "Admin",
            email: "admin@university.edu",
            role: "admin"
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // After successful sign in, redirect to dashboard
      // The middleware will handle the role-based redirection
      if (url.startsWith(baseUrl + "/auth/signin") || url === baseUrl + "/") {
       return baseUrl + "/";
      }
      return url;
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  }
};