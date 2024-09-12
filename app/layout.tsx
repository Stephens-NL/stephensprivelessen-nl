'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LanguageProvider } from "../contexts/LanguageContext";
import type { ReactNode } from "react";
import { usePathname } from 'next/navigation';
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils";


const inter = Inter({ subsets: ["latin"] });
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showHeader = !pathname?.includes('feedback');

  return (
    <html lang="nl">
      <LanguageProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {showHeader && <Header />}
          <main className="flex-grow">{children}</main>
          {showHeader && <Footer />}
        </body>
      </LanguageProvider>
    </html>
  );
}