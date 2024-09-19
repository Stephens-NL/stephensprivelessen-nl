// app/blog/[id]/page.tsx
import { Metadata } from 'next';
import BlogPostComponent from '@/components/BlogPostComponent';
import { BlogPost } from '@/data';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const defaultTitle = 'Blog Post';
  const defaultDescription = 'Read our blog post';
  let postTitle = defaultTitle;
  let postDescription = defaultDescription;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`);
    const data = await res.json();
    const post = data.blogPosts.find((post: BlogPost) => post.id === Number(params.id));

    if (post) {
      postTitle = post.title;
      postDescription = post.excerpt;
    }
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }

  return {
    title: `${postTitle} | Stephen's Blog`,
    description: postDescription,
    openGraph: {
      title: postTitle,
      description: postDescription,
      url: `https://www.stephenadei.nl/blog/${params.id}`,
      images: [
        {
          url: "https://www.stephenadei.nl/images/jpg/banner2.jpg",
          width: 1200,
          height: 630,
          alt: postTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: postTitle,
      description: postDescription,
      images: ["https://www.stephenadei.nl/images/jpg/banner2.jpg"],
    },
  };
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  return <BlogPostComponent id={params.id} />;
}