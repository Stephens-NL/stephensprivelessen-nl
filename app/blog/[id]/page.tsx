'use client';

import { useEffect, useState } from 'react';
import { FullPageBlogPost } from '../../../components/Blog';
import { BlogPost, blogPosts } from '../../../data';




export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loadingErrorState, setLoadingErrorState] = useState<{ isLoading: boolean; error: string | null }>({
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Simulate a data fetch
    setTimeout(() => {
      const foundPost = blogPosts.find(post => post.id === Number(params.id));

      if (foundPost) {
        setPost(foundPost);
        setLoadingErrorState({ isLoading: false, error: null });
      } else {
        setLoadingErrorState({ isLoading: false, error: "Post not found" });
      }
    }, 1000); // Simulated delay
  }, [params.id]);

  return <FullPageBlogPost post={post} loadingErrorState={loadingErrorState} />;
}
