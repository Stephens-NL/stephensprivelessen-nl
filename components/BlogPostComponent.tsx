// components/BlogPostComponent.tsx
'use client';

import useSWR from 'swr';
import { BlogPost } from '../data';
import { FullPageBlogPost } from './Blog';
import React from 'react';

const blogFetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogPostComponent({ id }: { id: string }) {
  const { data, isLoading, error: swrError } = useSWR<{ blogPosts: BlogPost[] }>('/api/blog', blogFetcher);
  const post = data?.blogPosts?.find((p) => p.id === Number(id)) ?? null;
  const loadingErrorState = {
    isLoading,
    error: swrError ? 'Failed to fetch blog post' : post === null && !isLoading ? 'Post not found' : null,
  };

  return <FullPageBlogPost post={post} loadingErrorState={loadingErrorState} />;
}