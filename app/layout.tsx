// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "../components/Footer";
import { LanguageProvider } from "../contexts/LanguageContext";
import { ReactNode } from "react";

export const metadata = {
  title: {
    default: "Stephen's Private Lessons - Tutoring Services", // Default title
    template: "%s | Stephen's Private Lessons", // Allows pages to append their title
  },
  description: "Stephen offers personalized tutoring in mathematics and programming. Enhance your skills with tailored lessons.",
  openGraph: {
    type: "website",
    url: "https://www.stephenadei.nl",
    title: "Stephen's Private Lessons - Tutoring Services",
    description: "Stephen provides expert tutoring in mathematics and programming, tailored to each student's needs.",
    images: [
      {
        url: "https://www.stephenadei.nl/images/jpg/banner.jpg", // Default image for openGraph
        width: 1200,
        height: 630,
        alt: "Stephen's Private Tutoring Services",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stephen's Private Lessons - Tutoring Services",
    description: "Get personalized tutoring in mathematics and programming with Stephen's Private Lessons.",
    images: ["https://www.stephenadei.nl/images/jpg/banner.jpg"], // Default image for Twitter
  },
};

const inter = Inter({ subsets: ["latin"] });

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