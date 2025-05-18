'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export function HeroSection() {
  const { language } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950 to-amber-900 opacity-90" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === 'NL' ? 'Rekenbijles voor MBO-studenten' : 'Math Tutoring for MBO Students'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-amber-100">
            {language === 'NL' 
              ? 'Maak je je zorgen over je mbo-rekentoets? Geen paniek. Je bent niet alleen, en ik ben er om je te helpen.'
              : 'Worried about your MBO math test? Don\'t panic. You\'re not alone, and I\'m here to help.'}
          </p>
          <p className="text-lg md:text-xl mb-12 text-amber-200">
            {language === 'NL'
              ? 'Sinds kort is rekenen weer een verplicht onderdeel voor het mbo-diploma, en voor veel studenten is dit een grote uitdaging.'
              : 'Recently, math has become a mandatory part of the MBO diploma, and for many students, this is a major challenge.'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-amber-500 text-amber-950 px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-400 transition-colors"
            onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {language === 'NL' ? 'Neem contact op' : 'Get in touch'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 