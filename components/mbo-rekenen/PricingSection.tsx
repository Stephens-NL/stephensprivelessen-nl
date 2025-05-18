'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export function PricingSection() {
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-amber-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {language === 'NL' ? 'Tarieven' : 'Rates'}
          </h2>
          <div className="bg-amber-950 p-8 rounded-lg">
            <p className="text-xl mb-6">
              {language === 'NL'
                ? 'Vanaf €50 per uur voor individuele lessen.'
                : 'Starting from €50 per hour for individual lessons.'}
            </p>
            <p className="text-lg mb-8 text-amber-200">
              {language === 'NL'
                ? 'Groepslessen (max. 4 personen) en online lessen zijn voordeliger. Neem contact op voor exacte prijzen en pakketten.'
                : 'Group lessons (max. 4 people) and online lessons are more affordable. Contact me for exact prices and packages.'}
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
              {language === 'NL' ? 'Vraag naar tarieven' : 'Ask about rates'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 