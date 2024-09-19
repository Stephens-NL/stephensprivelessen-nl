// app/contact/page.tsx
import { Metadata } from 'next';
import React from 'react';
import Placeholder from '@/components/contact/Placeholder';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact", // Dit wordt "Contact | Stephen's Private Lessons" door het template in je layout
    description: "Get in touch with Stephen's Private Lessons to schedule a tutoring session or inquire about our services in mathematics and programming.",
    openGraph: {
      title: "Contact - Stephen's Private Lessons",
      description: "Reach out to us for personalized tutoring services in mathematics and programming.",
      url: "https://www.stephenadei.nl/contact",
      images: [
        {
          url: "https://www.stephenadei.nl/images/jpg/banner2.jpg",
          width: 1200,
          height: 630,
          alt: "Contact Stephen's Private Lessons",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact - Stephen's Private Lessons",
      description: "Get in touch for personalized tutoring services in mathematics and programming.",
      images: ["https://www.stephenadei.nl/images/jpg/banner2.jpg"],
    },
  };
}

const ContactPage = () => {
  return <Placeholder />;
};

export default ContactPage;