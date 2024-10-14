import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });
import "@fortawesome/fontawesome-free/css/all.min.css";
import TopBar from "./components/Topbar";

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
        <TopBar />

        <div className="shadow-md sticky top-0 z-50">
          <Navbar />
        </div>

        <main className="container mx-auto px-4 md:px-8 py-6">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
