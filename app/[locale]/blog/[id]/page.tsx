// app/blog/[id]/page.tsx
import { Metadata } from 'next';
import BlogPostComponent from '@/components/BlogPostComponent';
import { blogPosts } from '@/data/blog';
import { notFound } from 'next/navigation';
import { config } from '@/data/config'; // Import config for siteUrl

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const postId = Number(params.id);
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return {
      title: "Blog Post Niet Gevonden",
      // Add a more descriptive message for OG tags if post not found
      openGraph: {
        title: "Blog Post Niet Gevonden",
        description: "Deze blog post kon niet worden gevonden.",
      }
    };
  }

  const ogTitle = post.title.NL;
  const ogDescription = post.summary.NL;
  const featureImageUrl = '/images/og-blog-banner.jpg'; // Default for blog posts
  const pageUrl = `${config.business.siteUrl}/blog/${post.id}`;

  return {
    title: post.title.NL,
    description: post.summary.NL,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: pageUrl,
      type: 'article',
      publishedTime: post.date, // Assuming post object has a date field
      authors: ['Stephen Adei'], // Or dynamically if available
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(
            ogTitle
          )}&brandText=${encodeURIComponent(
            'Stephensprivelessen.nl'
          )}&buttonText=${encodeURIComponent(
            'Lees Blog'
          )}&footerText=${encodeURIComponent(
            `Blog Post | ${post.category?.NL || 'Algemeen'}` // Add category if available
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
          `Blog Post | ${post.category?.NL || 'Algemeen'}`
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