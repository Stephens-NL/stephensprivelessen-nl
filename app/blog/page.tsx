// app/blog/page.tsx
import { Metadata } from 'next';
import { BlogList } from '../../components/Blog';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog", // Dit wordt "Blog | Stephen's Private Lessons" door het template in je layout
    description: "Explore the latest articles on mathematics, programming, and personalized tutoring services.",
    openGraph: {
      title: "Blog - Stephen's Private Lessons",
      description: "Stay updated with the latest blog posts on tutoring, mathematics, and programming.",
      url: "https://www.stephenadei.nl/blog",
      images: [
        {
          url: "https://www.stephenadei.nl/images/jpg/banner2.jpg",
          width: 1200,
          height: 630,
          alt: "Stephen's Blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog - Stephen's Private Lessons",
      description: "Latest blog posts on mathematics and programming.",
      images: ["https://www.stephenadei.nl/images/jpg/banner2.jpg"],
    },
  };
}

const BlogPage = () => {
  return <BlogList />;
};

export default BlogPage;