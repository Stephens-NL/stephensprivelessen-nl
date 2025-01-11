// app/blog/[id]/page.tsx
import BlogPostComponent from '@/components/BlogPostComponent';
import { BlogPost } from '@/data/types';

interface PageProps {
  params: {
    id: string;
  };
}

export default function BlogPostPage({ params }: PageProps) {
  return <BlogPostComponent id={params.id} />;
}