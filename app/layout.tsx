'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LanguageProvider } from "../contexts/LanguageContext";
import type { ReactNode } from "react";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <LanguageProvider>
        <body className={inter.className}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </LanguageProvider>
    </html>
  );
}