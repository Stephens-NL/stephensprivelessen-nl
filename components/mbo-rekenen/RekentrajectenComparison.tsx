'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { m, AnimatePresence } from 'framer-motion';
import { rekentrajectenComparison } from '@/data/pricingData';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { RekentrajectenCard } from './RekentrajectenCard';
import { RekentrajectenComparisonTable } from './RekentrajectenComparisonTable';
import { RekentrajectenCTA } from './RekentrajectenCTA';

export function RekentrajectenComparison() {
  const { language } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block relative">
            <h2 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-4 leading-none tracking-tighter">
              REKENTRAJECTEN
            </h2>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
          </div>
          <p className="text-xl md:text-2xl text-gray-600 font-light tracking-wide max-w-2xl mx-auto">
            {rekentrajectenComparison.subtitle[language]}
          </p>
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {rekentrajectenComparison.courses.map((course, index) => (
            <RekentrajectenCard
              key={course.id}
              course={course}
              index={index}
              language={language}
              onSelect={scrollToContact}
            />
          ))}
        </div>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Button
            onClick={() => setShowDetails(!showDetails)}
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg font-bold border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-2xl"
          >
            {showDetails ? 'VERBERG DETAILS' : 'TOON DETAILS'}
            <Info className="w-5 h-5 ml-2" />
          </Button>
        </m.div>

        <AnimatePresence>
          {showDetails && (
            <m.div
              initial={{ opacity: 0, height: 0, y: -50 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -50 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <RekentrajectenComparisonTable language={language} />
            </m.div>
          )}
        </AnimatePresence>

        <RekentrajectenCTA onStart={scrollToContact} />
      </div>
    </section>
  );
}
