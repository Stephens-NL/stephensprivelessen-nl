'use client';

import React from 'react';
import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface SpecialProgramsSectionProps {
  t: (text: { EN: string; NL: string }) => string;
}

export const SpecialProgramsSection = ({ t }: SpecialProgramsSectionProps) => {
  const programs = [
    {
      title: { NL: 'Weekend Bijles Zuidoost', EN: 'Weekend Tutoring Zuidoost' },
      description: {
        NL: 'Zaterdag- en zondaglessen bij HvA in Amsterdam Zuidoost. Halve prijs van het reguliere tarief.',
        EN: 'Saturday and Sunday lessons at HvA in Amsterdam Zuidoost. Half price of regular rates.',
      },
      cta: { NL: 'Meer info', EN: 'Learn more' },
      href: '/privelessen/zuidoost-weekend',
    },
    {
      title: { NL: 'Boa Me Na Menboa Mo', EN: 'Boa Me Na Menboa Mo' },
      description: {
        NL: 'Speciaal bijlesprogramma voor jongeren in Amsterdam Zuidoost.',
        EN: 'Special tutoring program for youth in Amsterdam Zuidoost.',
      },
      cta: { NL: 'Meer info', EN: 'Learn more' },
      href: '/privelessen/boa-me-na-menboa-mo',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[var(--cream-dark)] to-[var(--cream)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-display font-bold mb-4 text-[var(--ink)]"
          >
            {t({ NL: "Speciale Programma's", EN: 'Special Programs' })}
          </m.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {programs.map((program, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Link
                href={program.href}
                className="group flex flex-col h-full bg-[var(--ink)] text-[var(--cream)] rounded-2xl p-8 hover:bg-[var(--ink-light)] transition-colors"
              >
                <h3 className="text-xl font-display font-bold mb-3">
                  {t(program.title)}
                </h3>
                <p className="text-[var(--cream)] opacity-80 mb-6 flex-grow">
                  {t(program.description)}
                </p>
                <span className="inline-flex items-center gap-2 text-[var(--amber)] font-medium group-hover:gap-3 transition-all">
                  {t(program.cta)}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};
