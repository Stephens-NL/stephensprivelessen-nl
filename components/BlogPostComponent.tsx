// components/BlogPostComponent.tsx
'use client';

import useSWR from 'swr';
import { BlogPost } from '../data';
import { FullPageBlogPost } from './Blog';
import { jsonFetcher } from '@/lib/fetchers';
import React from 'react';

export default function BlogPostComponent({ id }: { id: string }) {
  const { data, isLoading, error: swrError } = useSWR<{ blogPosts: BlogPost[] }>('/api/blog', jsonFetcher);
  const post = data?.blogPosts?.find((p) => p.id === Number(id)) ?? null;
  const loadingErrorState = {
    isLoading,
    error: swrError ? 'Failed to fetch blog post' : post === null && !isLoading ? 'Post not found' : null,
  };

  return <FullPageBlogPost post={post} loadingErrorState={loadingErrorState} />;
}