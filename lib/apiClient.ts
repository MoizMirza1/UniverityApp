
import { getSession } from "next-auth/react";

export const apiClient = async (url: string, options: RequestInit = {}) => {
  const session = await getSession();
  
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (session?.accessToken) {
    headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
};