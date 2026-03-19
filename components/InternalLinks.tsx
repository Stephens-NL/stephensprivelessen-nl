'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { m } from 'framer-motion';

const InternalLinks: React.FC = () => {
  const locationLinks = [
    { href: '/privelessen/amsterdam-zuid', title: 'Amsterdam Zuid', description: 'Online bijles of op Science Park' },
    { href: '/privelessen/amsterdam-centrum', title: 'Amsterdam Centrum', description: 'Online bijles of op Science Park' },
    { href: '/privelessen/amsterdam-west', title: 'Amsterdam West', description: 'Online bijles of op Science Park' },
    { href: '/privelessen/amsterdam-oost', title: 'Amsterdam Oost', description: 'Online bijles of op Science Park' },
  ];

  const subjectLinks = [
    { href: '/bijles/onderwerp/statistiek/psychologie', title: 'Statistiek voor Psychologie', description: 'SPSS begeleiding en statistische analyses' },
    { href: '/bijles/onderwerp/calculus', title: 'Calculus', description: 'Differentiëren en integreren' },
    { href: '/bijles/onderwerp/programmeren', title: 'Python & R', description: 'Data science en programmeren' },
  ];

  const campusLinks = [
    { href: '/bijles/campus/uva', title: 'UvA Studenten', description: 'Online of op Science Park' },
    { href: '/bijles/campus/vu', title: 'VU Studenten', description: 'Online of op Science Park' },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[var(--cream)]">
      <div className="container mx-auto px-6 max-w-7xl lg:px-12">
        <m.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--amber)] mb-4">
            Bijles in Amsterdam
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--ink)] leading-tight">
            Online & Science Park
          </h2>
        </m.div>

        {/* Location grid */}
        <div className="mb-12">
          <h3 className="font-display text-xl font-semibold text-[var(--ink)] mb-6">Per Regio</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {locationLinks.map((link, index) => (
              <m.div
                key={link.href}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="group block p-5 rounded-lg border border-[var(--border-warm)] hover:border-[var(--amber)]/30 bg-[var(--cream-dark)] hover:bg-[var(--cream)] transition-all duration-200"
                >
                  <h4 className="font-semibold text-[var(--ink)] group-hover:text-[var(--amber)] transition-colors text-sm">
                    {link.title}
                  </h4>
                  <p className="text-xs text-[var(--muted-text)] mt-1">{link.description}</p>
                </Link>
              </m.div>
            ))}
          </div>
        </div>

        {/* Subjects + Campus in two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="font-display text-xl font-semibold text-[var(--ink)] mb-6">Per Vak</h3>
            <div className="space-y-3">
              {subjectLinks.map((link, index) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between p-5 rounded-lg border border-[var(--border-warm)] hover:border-[var(--amber)]/30 bg-[var(--cream-dark)] hover:bg-[var(--cream)] transition-all duration-200"
                  >
                    <div>
                      <h4 className="font-semibold text-[var(--ink)] group-hover:text-[var(--amber)] transition-colors text-sm">
                        {link.title}
                      </h4>
                      <p className="text-xs text-[var(--muted-text)] mt-1">{link.description}</p>
                    </div>
                    <svg className="w-4 h-4 text-[var(--muted-text)] group-hover:text-[var(--amber)] transition-all group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </m.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-[var(--ink)] mb-6">Voor Studenten</h3>
            <div className="space-y-3">
              {campusLinks.map((link, index) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between p-5 rounded-lg border-l-2 border-l-[var(--amber)] border border-[var(--border-warm)] hover:border-[var(--amber)]/30 bg-[var(--cream-dark)] hover:bg-[var(--cream)] transition-all duration-200"
                  >
                    <div>
                      <h4 className="font-semibold text-[var(--ink)] group-hover:text-[var(--amber)] transition-colors text-sm">
                        {link.title}
                      </h4>
                      <p className="text-xs text-[var(--muted-text)] mt-1">{link.description}</p>
                    </div>
                    <svg className="w-4 h-4 text-[var(--muted-text)] group-hover:text-[var(--amber)] transition-all group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternalLinks;
