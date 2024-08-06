import { FullBlogPost } from '../../../components/Blog';
import { blogPosts } from '../../../data';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find(post => post.id === Number(params.id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return <FullBlogPost post={post} />;
}