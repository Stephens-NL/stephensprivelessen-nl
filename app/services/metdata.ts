// app/metadata.ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stephen's Elite Private Tutoring",
  description: "Exclusive one-on-one tutoring in mathematics and programming, tailored to your needs.",
  openGraph: {
    title: "Stephen's Elite Private Tutoring",
    description: "Experience personalized education with Stephen's elite tutoring services in mathematics and programming. Tailored to unlock your full potential.",
    url: "https://www.yourwebsite.com",
    images: [
      {
        url: "/images/luxury-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Stephen's Elite Private Tutoring - Where Excellence Meets Education",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stephen's Elite Private Tutoring",
    description: "Step into a world of bespoke learning with Stephen's premium tutoring services in mathematics and programming.",
    images: ["/images/luxury-banner.jpg"],
  },
  // ...other metadata
};