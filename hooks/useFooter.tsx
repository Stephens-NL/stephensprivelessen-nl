// src/hooks/useFooter.ts
import useSWR from 'swr';
import { Footer } from '../data';
import { safeFetcher } from '@/lib/fetchers';

export const useFooter = () => {
  const { data, isLoading, error } = useSWR<Footer>('/api/footer', safeFetcher);
  return { data: data ?? null, isLoading, error: error ?? null };
};
