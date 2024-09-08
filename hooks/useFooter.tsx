// src/hooks/useFooter.ts
import { useState, useEffect } from 'react';
import { Footer } from '../data';

export const useFooter = () => {
  const [data, setData] = useState<Footer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await fetch('/api/footer');
        if (!response.ok) {
          throw new Error('Failed to fetch footer data');
        }
        const footerData: Footer = await response.json();
        setData(footerData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchFooter();
  }, []);

  return { data, isLoading, error };
};