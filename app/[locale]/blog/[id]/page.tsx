// app/blog/[id]/page.tsx
import { Metadata } from 'next';
import BlogPostComponent from '@/components/BlogPostComponent';
import { blogPosts } from '@/data/blog';
import { notFound } from 'next/navigation';
import { config } from '@/data/config'; // Import config for siteUrl
import { getLanguageFromLocale } from '@/hooks/useLanguage';

type Props = {
  params: Promise<{ id: string; locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const postId = Number(params.id);
  const post = blogPosts.find(p => p.id === postId);
  const language = getLanguageFromLocale(params.locale);

  if (!post) {
    return {
      title: language === 'NL' ? "Blog Post Niet Gevonden" : "Blog Post Not Found",
      // Add a more descriptive message for OG tags if post not found
      openGraph: {
        title: language === 'NL' ? "Blog Post Niet Gevonden" : "Blog Post Not Found",
        description: language === 'NL' ? "Deze blog post kon niet worden gevonden." : "This blog post could not be found.",
      }
    };
  }

  const ogTitle = post.title[language];
  const ogDescription = post.content[language].replace(/\s+/g, ' ').trim().substring(0, 160);
  const featureImageUrl = '/images/og-blog-banner.jpg'; // Default for blog posts
  const pageUrl = `${config.business.siteUrl}/blog/${post.id}`;

  return {
    title: post.title[language],
    description: ogDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: pageUrl,
      type: 'article',
      publishedTime: post.date,
      authors: ['Stephen Adei'],
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(
            ogTitle
          )}&brandText=${encodeURIComponent(
            'Stephensprivelessen.nl'
          )}&buttonText=${encodeURIComponent(
            'Lees Blog'
          )}&footerText=${encodeURIComponent(
            'Blog Post | Algemeen'
          )}&featureImageUrl=${encodeURIComponent(featureImageUrl)}`,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [
        `/api/og?title=${encodeURIComponent(
          ogTitle
        )}&brandText=${encodeURIComponent(
          'Stephensprivelessen.nl'
        )}&buttonText=${encodeURIComponent(
          'Lees Blog'
        )}&footerText=${encodeURIComponent(
          'Blog Post | Algemeen'
        )}&featureImageUrl=${encodeURIComponent(featureImageUrl)}`,
      ],
    },
  };
}

export default async function BlogPostPage(props: Props) {
  const params = await props.params;
  const postId = Number(params.id);
  const postExists = blogPosts.some(p => p.id === postId);

  if (!postExists) {
    notFound();
  }

  return <BlogPostComponent id={params.id} />;
}
