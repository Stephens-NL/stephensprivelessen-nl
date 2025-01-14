// app/blog/page.tsx
import { Metadata } from 'next';
import { BlogList } from '@/components/Blog';
import React from 'react';

export const metadata: Metadata = {
  title: "Blog | Stephens Privelessen Amsterdam",
  description: "Lees onze blog over wiskunde, statistiek, scriptiebegeleiding en studietips. Praktische artikelen en inzichten voor studenten en professionals.",
  keywords: [
    'blog stephens privelessen',
    'wiskunde blog',
    'statistiek artikelen',
    'studietips blog',
    'scriptiebegeleiding blog',
    'wiskunde tutorials',
    'statistiek uitleg',
    'methodologie blog',
    'data analyse tips',
    'onderzoeksmethoden blog',
    'academische vaardigheden',
    'studiebegeleiding blog',
  ],
  openGraph: {
    title: "Blog | Stephens Privelessen Amsterdam",
    description: "Ontdek onze blog met artikelen over wiskunde, statistiek en academische vaardigheden.",
    url: "https://www.stephensprivelessen.nl/blog",
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'en_US',
    siteName: 'Stephens Privelessen',
    images: [
      {
        url: '/images/blog-banner.jpg',
        width: 1200,
        height: 630,
        alt: "Blog Stephens Privelessen Amsterdam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Stephens Privelessen Amsterdam",
    description: "Artikelen over wiskunde, statistiek en academische vaardigheden.",
    images: ['/images/blog-banner.jpg'],
  },
  alternates: {
    canonical: '/blog',
    languages: {
      'nl-NL': '/blog',
      'en-US': '/blog',
    },
  },
};

const BlogPage = () => {
  return <BlogList />;
};

export default BlogPage;