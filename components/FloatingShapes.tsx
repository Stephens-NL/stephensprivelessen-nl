import React from 'react';
import { motion } from 'framer-motion';

const FloatingShapes = () => (
  <motion.div
    className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.6, duration: 1 }}
  >
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-white bg-opacity-10 rounded-full"
        style={{
          width: Math.random() * 100 + 50,
          height: Math.random() * 100 + 50,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50,
          rotate: 360,
        }}
        transition={{
          duration: Math.random() * 20 + 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
      />
    ))}
  </motion.div>
);

export default FloatingShapes;