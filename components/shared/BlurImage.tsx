'use client';

import Image, { ImageProps } from 'next/image';
import { useCallback, useState } from 'react';

type BlurImageProps = Omit<ImageProps, 'onLoad'> & {
  variant?: 'dark' | 'light';
};

export default function BlurImage({ variant = 'dark', className = '', alt, ...props }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);
  const handleLoad = useCallback(() => setLoaded(true), []);
  const shimmerClass = variant === 'dark' ? 'shimmer' : 'shimmer-light';

  // fill images: wrapper must be absolutely positioned to not disrupt layout
  if (props.fill) {
    return (
      <>
        {!loaded && <div className={`absolute inset-0 ${shimmerClass} z-0`} />}
        <Image
          alt={alt}
          {...props}
          className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLoad}
        />
      </>
    );
  }

  // sized images: inline wrapper preserves flow
  return (
    <span className="relative inline-block overflow-hidden">
      {!loaded && <span className={`absolute inset-0 ${shimmerClass}`} />}
      <Image
        alt={alt}
        {...props}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleLoad}
      />
    </span>
  );
}
