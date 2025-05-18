'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const targetGroups = [
  {
    title: {
      nl: 'MBO-studenten niveau 2, 3 en 4',
      en: 'MBO students level 2, 3 and 4'
    },
    description: {
      nl: 'Die moeite hebben met rekenen.',
      en: 'Who struggle with mathematics.'
    },
    icon: '🎓'
  },
  {
    title: {
      nl: 'BBL-studenten',
      en: 'BBL students'
    },
    description: {
      nl: 'Die naast hun werk moeite hebben met het rekenonderdeel.',
      en: 'Who struggle with the mathematics component alongside their work.'
    },
    icon: '💼'
  },
  {
    title: {
      nl: 'Volwassenen',
      en: 'Adults'
    },
    description: {
      nl: 'Die terug naar school zijn gegaan en rekenen als obstakel ervaren.',
      en: 'Who have returned to school and find mathematics as an obstacle.'
    },
    icon: '📚'
  },
  {
    title: {
      nl: 'Studenten met dyscalculie',
      en: 'Students with dyscalculia'
    },
    description: {
      nl: 'Of andere rekenproblemen.',
      en: 'Or other mathematics difficulties.'
    },
    icon: '🧮'
  }
];

export function TargetGroupSection() {
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-amber-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {language === 'NL' ? 'Voor wie geschikt?' : 'Who is it for?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {targetGroups.map((group, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-amber-900 p-6 rounded-lg flex items-start space-x-4"
              >
                <div className="text-4xl">{group.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'NL' ? group.title.nl : group.title.en}
                  </h3>
                  <p className="text-amber-200">
                    {language === 'NL' ? group.description.nl : group.description.en}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 