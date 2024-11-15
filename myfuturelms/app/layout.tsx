import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Providers } from "./redux/Providers";

export const metadata: Metadata = {
  title: "EduNexus - Learn & Grow",
  description: "An interactive learning platform powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
