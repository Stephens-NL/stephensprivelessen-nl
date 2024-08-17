import { useState, useEffect } from 'react';

export const useScrollPosition = (threshold: number = 300): boolean => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return showBackToTop;
};

export default useScrollPosition;