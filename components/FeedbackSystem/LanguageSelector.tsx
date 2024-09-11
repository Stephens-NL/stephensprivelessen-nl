import React from 'react';
import { motion } from 'framer-motion';
import { Language, LanguageSelectorProps } from "@/data";



const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

// Consider removing this console.log in production
console.log('LanguageSelector loaded');

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelectLanguage, data }) => {
  return (
    <motion.div
      key="language-selector"
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      className="flex flex-col items-center justify-center h-full"
    >
      <h2 className="text-3xl font-bold text-white mb-6">{data.title}</h2>
      <div className="flex justify-center space-x-4">
        {['NL', 'EN'].map((lang) => (
          <motion.button
            key={lang}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectLanguage(lang as Language)}
            className="px-6 py-3 bg-white text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300"
          >
            {lang === 'NL' ? 'Nederlands' : 'English'}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default LanguageSelector;