'use client';

import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';

/** WCAG 2.3.3: reducedMotion="user" respects prefers-reduced-motion; see also globals.css @media (prefers-reduced-motion: reduce) */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
