// app/hooks/user/useAccessToken.tsx
"use client";
import { cookies } from "next/headers";

export const useAccessToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  return token;
};
