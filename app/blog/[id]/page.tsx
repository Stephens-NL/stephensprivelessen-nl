// app/blog/[id]/page.tsx
import { Metadata } from 'next';
import BlogPostComponent from '@/components/BlogPostComponent';
import { BlogPost } from '@/data/types';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Blog Post ${params.id}`,
  };
}

export default function BlogPostPage({ params }: Props) {
  return <BlogPostComponent id={params.id} />;
}