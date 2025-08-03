
import "next-auth";
import { DefaultSession } from "next-auth";
export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  imageUrl: string
  githubUrl?: string
  liveUrl?: string
}

// types/next-auth.d.ts
declare module "next-auth" {
  interface User {
    role: "admin" | "faculty" | "student"; // Add your roles here
    id: string;
  }

  interface Session {
    user: {
      role: string;
      id: string;
    } & DefaultSession["user"];
  }
}