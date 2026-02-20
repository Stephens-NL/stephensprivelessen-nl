// src/hooks/useFooter.ts
import useSWR from 'swr';
import { Footer } from '../data';

const footerFetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch footer data');
    return res.json();
  });

export const useFooter = () => {
  const { data, isLoading, error } = useSWR<Footer>('/api/footer', footerFetcher);
  return { data: data ?? null, isLoading, error: error ?? null };
};