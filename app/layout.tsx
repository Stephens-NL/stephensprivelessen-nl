'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";
import type { ReactNode } from "react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

function MetadataManager() {
  const { language } = useLanguage();

  const metaTitle = language === 'EN' ? "Stephen's Elite Private Tutoring" : "Stephen's Excellente Privélessen";
  const metaDescription = language === 'EN' 
    ? "Exclusive one-on-one tutoring in mathematics and programming, tailored to your needs." 
    : "Exclusieve één-op-één bijles in wiskunde en programmeren, op maat gemaakt voor jouw behoeften.";

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content="/images/luxury-banner.jpg" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content="/images/luxury-banner.jpg" />
    </Head>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl">
      <LanguageProvider>
        <MetadataManager />
        <body className={inter.className}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </LanguageProvider>
    </html>
  );
}