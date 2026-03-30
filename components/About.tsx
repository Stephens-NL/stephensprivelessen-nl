'use client';

import React, { useState } from 'react';
import BlurImage from './shared/BlurImage';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { AnimatePresence, m } from 'framer-motion';

const PhilosophyCard = ({ title, description }: {title: string, description: string}) => (
  <m.div
    className="bg-[var(--cream)] border border-[var(--border-warm)] backdrop-blur-lg rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    whileHover={{ scale: 1.03, transition: { duration: 0.2, ease: "easeInOut" } }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <h3 className="text-xl font-semibold text-[var(--ink)] mb-3">{title}</h3>
    <p className="text-[var(--warm-text)]">{description}</p>
  </m.div>
);

const DetailedInfoAccordion = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <m.div
      className="border-b border-[var(--border-warm)] py-4"
      initial={false}
      animate={{ backgroundColor: isOpen ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <button
        className="flex justify-between items-center w-full text-left text-[var(--ink)]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">{question}</h3>
        <m.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >&#9660;</m.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="mt-2 text-[var(--warm-text)]">{answer}</p>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
};

const About = () => {
  const t = useTranslations('about');

  // Get philosophy points count (3 from JSON)
  const philosophyPoints = [0, 1, 2];
  // Get detailed info count (5 from JSON)
  const detailedInfoItems = [0, 1, 2, 3, 4];
  // Get paragraphs count (2 from JSON)
  const paragraphs = [0, 1];

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <m.h1
            className="text-4xl font-bold text-center font-display text-[var(--ink)] mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {t('title')}
          </m.h1>
          <div className="flex flex-col md:flex-row items-center">
            <m.div
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <div className="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                <BlurImage src="/images/jpeg/portrait-about.jpg" alt={t('introduction.altText')} fill className="object-cover object-top" variant="light" />
              </div>
            </m.div>
            <m.div
              className="md:w-1/2 md:pl-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              <h2 className="text-3xl font-semibold font-display text-[var(--ink)] mb-4">{t('introduction.heading')}</h2>
              {paragraphs.map((index) => (
                <m.p
                  key={index}
                  className="mb-4 text-[var(--warm-text)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 + index * 0.1 }}
                >
                  {t(`introduction.paragraphs.${index}`)}
                </m.p>
              ))}
            </m.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--cream-dark)]/50">
        <div className="container mx-auto px-4">
          <m.h2
            className="text-3xl font-semibold text-center font-display text-[var(--ink)] mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('philosophyTitle')}
          </m.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {philosophyPoints.map((index) => (
              <PhilosophyCard
                key={index}
                title={t(`philosophyPoints.${index}.title`)}
                description={t(`philosophyPoints.${index}.description`)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <m.h2
            className="text-3xl font-semibold text-center font-display text-[var(--ink)] mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('detailedTitle')}
          </m.h2>
          {detailedInfoItems.map((index) => (
            <DetailedInfoAccordion
              key={index}
              question={t(`detailedInfo.items.${index}.question`)}
              answer={t(`detailedInfo.items.${index}.answer`)}
            />
          ))}
        </div>
      </section>

      <section className="py-20 bg-[var(--ink)] text-on-dark">
        <div className="container mx-auto px-4 text-center">
          <m.h2
            className="text-3xl font-semibold mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('cta.title')}
          </m.h2>
          <p className="mb-8">{t('cta.description')}</p>
          <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="inline-block bg-[var(--cream)] text-[var(--ink)] font-semibold py-3 px-8 rounded-full hover:bg-[var(--cream-dark)] transition-colors duration-300"
            >
              {t('cta.buttonText')}
            </Link>
          </m.div>
        </div>
      </section>
    </div>
  );
};

export default About;
