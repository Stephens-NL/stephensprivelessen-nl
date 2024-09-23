// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "../components/Footer";
import { ReactNode } from "react";
import { Metadata } from 'next';
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Stephen's Private Lessons - Tutoring Services",
    template: "%s | Stephen's Private Lessons",
  },
  description: "Stephen offers personalized tutoring in mathematics and programming. Enhance your skills with tailored lessons.",
  openGraph: {
    type: "website",
    url: "https://www.stephenadei.nl",
    title: "Stephen's Private Lessons - Tutoring Services",
    description: "Stephen provides expert tutoring in mathematics and programming, tailored to each student's needs.",
    images: [
      {
        url: "https://www.stephenadei.nl/images/jpg/banner2.jpg",
        width: 1200,
        height: 630,
        alt: "Stephen's Private Tutoring Services",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stephen's Private Lessons - Tutoring Services",
    description: "Get personalized tutoring in mathematics and programming with Stephen's Private Lessons.",
    images: ["https://www.stephenadei.nl/images/jpg/banner.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl" className={inter.className}>
      <body>
        <LanguageProvider>

        <Header />
        <main>{children}</main>
        <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}