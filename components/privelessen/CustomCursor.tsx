'use client';

import { useRef, useState, useEffect } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorEnlarged, setCursorEnlarged] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-300 ease-out ${
        cursorVisible ? 'opacity-100' : 'opacity-0'
      } ${
        cursorEnlarged ? 'scale-[2.5]' : 'scale-100'
      }`}
    >
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 rounded-full bg-yellow-300/30 animate-ping" />
        <div className="absolute inset-2 rounded-full bg-yellow-300" />
      </div>
    </div>
  );
} 