import { Metadata } from 'next';
import About from '../../components/About'
import React from 'react'

export const metadata: Metadata = {
  title: "About Us", // This will result in "About Us | Stephen's Private Lessons"
  description: "Learn about Stephen's journey and vision in providing personalized tutoring services.",
  openGraph: {
    title: "About Us - Stephen's Private Lessons",
    description: "Discover how Stephen's experiences inspired him to offer tailored tutoring services.",
    url: "https://www.stephenadei.nl/about",
    images: [
      {
        url: "https://www.stephenadei.nl/images/about-banner.jpg",
        width: 1200,
        height: 630,
        alt: "About Stephen's Private Tutoring",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Stephen's Private Lessons",
    description: "Learn about Stephen's vision in providing personalized tutoring services.",
    images: ["https://www.stephenadei.nl/images/about-banner.jpg"],
  },
};

const page = () => {
  return (
    <About />
  )
}

export default page