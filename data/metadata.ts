import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Stephen's Elite Private Tutoring",
  description: "Exclusive one-on-one tutoring in mathematics and programming, tailored to your needs.",
  openGraph: {
    title: "Stephen's Elite Private Tutoring",
    description: "Experience personalized education with Stephen's elite tutoring services in mathematics and programming.",
    url: "https://www.stephenadei.nl",
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
    description: "Step into a world of bespoke learning with Stephen's premium tutoring services.",
    images: ["/images/luxury-banner.jpg"],
  },
};