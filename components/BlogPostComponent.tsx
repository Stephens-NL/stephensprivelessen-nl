// components/BlogPostComponent.tsx
'use client';

import { useEffect, useState } from 'react';
import { BlogPost, blogPosts } from '../data';
import { FullPageBlogPost } from './Blog';
import React from 'react';


export default function BlogPostComponent({ id }: { id: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loadingErrorState, setLoadingErrorState] = useState<{ isLoading: boolean; error: string | null }>({
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog`);
        const data = await res.json();
        const foundPost = data.blogPosts.find((post: BlogPost) => post.id === Number(id));

        if (foundPost) {
          setPost(foundPost);
          setLoadingErrorState({ isLoading: false, error: null });
        } else {
          setLoadingErrorState({ isLoading: false, error: "Post not found" });
        }
      } catch (error) {
        setLoadingErrorState({ isLoading: false, error: "Failed to fetch blog post" });
      }
    };

    fetchPost();
  }, [id]);

  return <FullPageBlogPost post={post} loadingErrorState={loadingErrorState} />;
}