// app/blog/[id]/page.tsx
import { Metadata } from 'next';
import BlogPostComponent from '@/components/BlogPostComponent';
import { blogPosts } from '@/data/blog';
import { notFound } from 'next/navigation';

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
    };
  }

  return {
    title: post.title.NL,
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