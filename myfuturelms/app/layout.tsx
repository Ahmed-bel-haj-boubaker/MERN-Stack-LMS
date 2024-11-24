import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Providers } from "./redux/Providers";
import { AuthProvider } from "./(auth)/provider/AuthContext";
import { cookies } from "next/headers"; // Import server-side cookies

export const metadata: Metadata = {
  title: "EduNexus - Learn & Grow",
  description: "An interactive learning platform powered by AI.",
};

// Helper function to fetch server-side tokens
async function getServerTokens() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value || null;
  const refreshToken = cookieStore.get("refresh_token")?.value || null;
  return { accessToken, refreshToken };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serverTokens = await getServerTokens();

  return (
    <AuthProvider serverTokens={serverTokens}>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </AuthProvider>
  );
}
