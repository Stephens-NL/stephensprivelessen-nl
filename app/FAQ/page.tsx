// app/FAQ/page.tsx
import { Metadata } from 'next';
import FAQPage from '../../components/Faq';

// Dynamische metadata voor de FAQ-pagina
export const metadata: Metadata = {
  title: "FAQ",
  description: "Find answers to frequently asked questions about Stephen's personalized tutoring services in mathematics and programming.",
  openGraph: {
    title: "FAQ - Stephen's Private Lessons",
    description: "Learn more about Stephen's tutoring services through our frequently asked questions.",
    url: "https://www.stephenadei.nl/FAQ",
    images: [
      {
        url: "https://www.stephenadei.nl/images/FAQ-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Stephen's Private Tutoring FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - Stephen's Private Lessons",
    description: "Find answers to common questions about Stephen's personalized tutoring services.",
    images: ["https://www.stephenadei.nl/images/FAQ-banner.jpg"],
  },
};

export default function FAQ() {
  return <FAQPage />;
}