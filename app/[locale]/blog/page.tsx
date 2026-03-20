// app/blog/page.tsx
import { BlogList } from '@/components/Blog';
import React from 'react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl ? "Blog | Stephens Privelessen Amsterdam" : "Blog | Stephens Private Tutoring Amsterdam",
    description: isNl
      ? "Lees onze blog over wiskunde, statistiek, scriptiebegeleiding en studietips. Praktische artikelen en inzichten voor studenten en professionals."
      : "Read our blog about mathematics, statistics, thesis supervision and study tips. Practical articles and insights for students and professionals.",
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
      title: isNl ? "Blog | Stephens Privelessen Amsterdam" : "Blog | Stephens Private Tutoring Amsterdam",
      description: isNl
        ? "Ontdek onze blog met artikelen over wiskunde, statistiek en academische vaardigheden."
        : "Discover our blog with articles on mathematics, statistics and academic skills.",
      url: "https://www.stephensprivelessen.nl/blog",
      type: 'website',
      locale: 'nl_NL',
      alternateLocale: 'en_US',
      siteName: 'Stephens Privelessen',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent("Blog A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Lees Artikelen" : "Read Articles")}&footerText=${encodeURIComponent(isNl ? "Wiskunde, Statistiek & Tips" : "Maths, Statistics & Tips")}&featureImageUrl=/images/blog-banner.jpg`,
          width: 1200,
          height: 630,
          alt: isNl ? "Blog Stephens Privelessen Amsterdam" : "Blog Stephens Private Tutoring Amsterdam",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isNl ? "Blog | Stephens Privelessen Amsterdam" : "Blog | Stephens Private Tutoring Amsterdam",
      description: isNl
        ? "Artikelen over wiskunde, statistiek en academische vaardigheden."
        : "Articles on mathematics, statistics and academic skills.",
      images: [`/api/og?title=${encodeURIComponent("Blog A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Lees Artikelen" : "Read Articles")}&footerText=${encodeURIComponent(isNl ? "Wiskunde, Statistiek & Tips" : "Maths, Statistics & Tips")}&featureImageUrl=/images/blog-banner.jpg`],
    },
    alternates: {
      canonical: '/blog',
      languages: {
        'nl-NL': '/blog',
        'en-US': '/blog',
      },
    },
  };
}

const BlogPage = () => {
  return <BlogList />;
};

export default BlogPage;