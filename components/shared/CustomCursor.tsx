'use client';

import { useRef, useReducer, useEffect } from 'react';

type CursorState = { visible: boolean; enlarged: boolean };

function cursorReducer(state: CursorState, action: { type: 'SHOW' | 'HIDE' | 'ENLARGE' | 'SHRINK' }): CursorState {
  switch (action.type) {
    case 'SHOW': return { ...state, visible: true };
    case 'HIDE': return { ...state, visible: false };
    case 'ENLARGE': return { ...state, enlarged: true };
    case 'SHRINK': return { ...state, enlarged: false };
    default: return state;
  }
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(cursorReducer, { visible: false, enlarged: false });
  const { visible: cursorVisible, enlarged: cursorEnlarged } = state;

  useEffect(() => {
    const handleMouseEnter = () => dispatch({ type: 'SHOW' });
    const handleMouseLeave = () => dispatch({ type: 'HIDE' });
    const handleMouseDown = () => dispatch({ type: 'ENLARGE' });
    const handleMouseUp = () => dispatch({ type: 'SHRINK' });
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    const handleLinkEnter = () => dispatch({ type: 'ENLARGE' });
    const handleLinkLeave = () => dispatch({ type: 'SHRINK' });

    const links = document.querySelectorAll('a, button, [role="button"]');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkEnter);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);

      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkEnter);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
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