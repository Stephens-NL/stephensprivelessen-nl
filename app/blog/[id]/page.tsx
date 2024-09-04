import { FullPageBlogPost } from '../../../components/Blog';
import { blogPosts } from '../../../data';



export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find(post => post.id === Number(params.id));

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Post not found</h1>
        <p className="mt-4">Sorry, the blog post you're looking for doesn't exist.</p>
      </div>
    );
  }

  return <FullPageBlogPost post={post} />;
}