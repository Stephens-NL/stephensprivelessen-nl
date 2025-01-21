'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaMapMarkerAlt, FaClock, FaCheck } from 'react-icons/fa';
import { WeekendLocation } from '@/data/types';

interface AboutSectionProps {
  content: WeekendLocation;
}

export function AboutSection({ content }: AboutSectionProps) {
  const { language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      id="about"
      className="relative z-10 py-24 px-4"
      style={{
        transform: isInView ? "none" : "translateY(100px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
      }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-yellow-300 mb-8"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          {content.subtitle[language]}
        </motion.h2>
        <motion.div 
          className="prose prose-lg prose-invert"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-6">
            {content.proverb && (
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-300">{content.proverb.text[language]}</p>
                <p className="text-lg text-yellow-200/80">{content.proverb.meaning[language]}</p>
              </div>
            )}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-yellow-300 mb-3">
                  <FaMapMarkerAlt className="text-xl" />
                  <h3 className="font-medium">{content.features.location.title[language]}</h3>
                </div>
                <p className="text-white/90">{content.features.location.text[language]}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-yellow-300 mb-3">
                  <FaClock className="text-xl" />
                  <h3 className="font-medium">{content.features.availability.title[language]}</h3>
                </div>
                <p className="text-white/90">{content.features.availability.text[language]}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-yellow-300 mb-3">
                  <FaCheck className="text-xl" />
                  <h3 className="font-medium">{content.features.extras.title[language]}</h3>
                </div>
                <p className="text-white/90">{content.features.extras.text[language]}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
} 