import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Inter } from "next/font/google";
import { cookies } from "next/headers"; // Server-side only
import { Providers } from "./redux/Providers";
import ClientWrapper from "./ClientWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EduNexus - Learn & Grow",
  description: "An interactive learning platform powered by AI.",
};

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
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ClientWrapper serverTokens={serverTokens}>{children}</ClientWrapper>
        </Providers>
      </body>
    </html>
  );
}
