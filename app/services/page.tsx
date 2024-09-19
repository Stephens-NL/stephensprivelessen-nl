// app/services/page.tsx
import { Metadata } from 'next';
import React from 'react';
import Intro from '@/components/Intro';
import Services from '@/components/Services';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Services", // Dit zal "Services | Stephen's Private Lessons" worden
    description: "Discover the personalized tutoring services offered by Stephen's Private Lessons. From mathematics to programming, we offer tailored lessons for all levels.",
    openGraph: {
      title: "Our Services - Stephen's Private Lessons",
      description: "Learn more about the tutoring services in mathematics and programming provided by Stephen's Private Lessons.",
      url: "https://www.stephenadei.nl/services",
      images: [
        {
          url: "https://www.stephenadei.nl/images/jpg/banner2.jpg",
          width: 1200,
          height: 630,
          alt: "Stephen's Private Lessons Services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Our Services - Stephen's Private Lessons",
      description: "Explore the tutoring services for mathematics and programming at Stephen's Private Lessons.",
      images: ["https://www.stephenadei.nl/images/jpg/banner2.jpg"],
    },
  };
}

const ServicesPage = () => {
  return (
    <>
      <Intro />
      <Services />
    </>
  );
};

export default ServicesPage;