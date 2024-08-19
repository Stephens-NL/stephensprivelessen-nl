import { FullBlogPostModal } from '../../../../components/Blog';
import { blogPosts } from '../../../../data';

export async function generateStaticParams() {
  const posts = blogPosts;
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find(post => post.id === Number(params.id));
  
  if (!post) {
    return <div>Post not found</div>;
  }
  
  return 'yes';
}