// app/blog/[id]/page.tsx
import { Metadata } from 'next';
import BlogPostComponent from '@/components/BlogPostComponent';
import { BlogPost } from '@/data/types';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  return {
    title: `Blog Post ${params.id}`,
  };
}

export default async function BlogPostPage(props: Props) {
  const params = await props.params;
  return <BlogPostComponent id={params.id} />;
}