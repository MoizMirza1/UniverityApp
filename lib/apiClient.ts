
import { getSession } from "next-auth/react";

// lib/apiClient.ts
export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const session = await getSession();
  
  const headers = {
    ...options.headers,
  };

  if (!headers["Content-Type"] && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (session?.accessToken) {
    headers["Authorization"] = `Bearer ${session.accessToken}`;
  }


  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const apiUrl = `${baseUrl}/api${endpoint}`; 

  const res = await fetch(apiUrl, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  if (res.status === 204) {
    return { data: null } as any;
  }

  return res.json();
};