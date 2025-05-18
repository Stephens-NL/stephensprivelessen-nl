'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export function AboutSection() {
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-amber-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {language === 'NL' ? 'Over mij' : 'About me'}
          </h2>
          <div className="prose prose-lg prose-invert mx-auto">
            <p className="mb-6">
              {language === 'NL'
                ? 'Mijn naam is Stephen, bijna bevoegd docent wiskunde met ruim 15 jaar ervaring in onderwijs en bijles. Ik heb gewerkt met leerlingen en studenten van alle niveaus: van speciaal onderwijs tot gymnasium en universiteit.'
                : 'My name is Stephen, a soon-to-be qualified mathematics teacher with over 15 years of experience in education and tutoring. I have worked with students of all levels: from special education to gymnasium and university.'}
            </p>
            <p className="mb-6">
              {language === 'NL'
                ? 'Daardoor weet ik precies hoe ik rekenen begrijpelijk kan maken, ongeacht je achtergrond of je niveau.'
                : 'This means I know exactly how to make mathematics understandable, regardless of your background or level.'}
            </p>
            <p>
              {language === 'NL'
                ? 'Naast mijn werk als docent ben ik actief als muzikant, fotograaf en creatief ondernemer. Dit betekent dat ik begrijp dat leren meer is dan alleen cijfers; het gaat ook om zelfvertrouwen en motivatie.'
                : 'Besides my work as a teacher, I am active as a musician, photographer, and creative entrepreneur. This means I understand that learning is more than just numbers; it\'s also about confidence and motivation.'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 