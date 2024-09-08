import React from 'react';
import { motion } from "framer-motion";

interface FadeInTextProps {
  text: string | undefined;
  delay?: number;
}

const FadeInText: React.FC<FadeInTextProps> = ({ text = '', delay = 0 }) => {
  const words = text.split(' ');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + index * 0.2 }}
          style={{ display: 'inline-block', marginRight: '5px' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default FadeInText;