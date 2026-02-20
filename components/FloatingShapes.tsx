'use client';

import { m } from 'framer-motion';

const SHAPES = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  width: Math.random() * 100 + 50,
  height: Math.random() * 100 + 50,
  top: Math.random() * 100,
  left: Math.random() * 100,
  x: Math.random() * 100 - 50,
  y: Math.random() * 100 - 50,
  duration: Math.random() * 20 + 10,
}));

const FloatingShapes = () => {
  return (
    <m.div
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 1 }}
    >
      {SHAPES.map((shape) => (
        <m.div
          key={shape.id}
          className="absolute bg-white bg-opacity-10 rounded-full"
          style={{
            width: shape.width,
            height: shape.height,
            top: `${shape.top}%`,
            left: `${shape.left}%`,
          }}
          animate={{
            x: shape.x,
            y: shape.y,
            rotate: 360,
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
      ))}
    </m.div>
  );
};

export default FloatingShapes;
