"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loading from "./components/Loading";
import { AuthProvider } from "./(auth)/provider/AuthContext";

export default function ClientWrapper({
  children,
  serverTokens,
}: {
  children: React.ReactNode;
  serverTokens: { accessToken: string | null; refreshToken: string | null };
}) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AuthProvider serverTokens={serverTokens}>
      {loading && <Loading />}
      {children}
    </AuthProvider>
  );
}
