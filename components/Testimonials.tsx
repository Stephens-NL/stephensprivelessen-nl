'use client';

import React from 'react'
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { viewportOnce } from '@/lib/animations';
import Testimonial from './Testimonial'

const Testimonials = () => {
    const t = useTranslations('home');
    const items = [0, 1, 2];

    return (
        <section className="py-16 sm:py-20 lg:py-28 bg-[var(--ink)] relative overflow-hidden">
            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, var(--cream) 1px, transparent 0)`,
                backgroundSize: '48px 48px',
            }} />

            <div className="relative container mx-auto px-6 max-w-7xl lg:px-12">
                <m.div
                    className="text-center mb-12 lg:mb-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={viewportOnce}
                >
                    <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--amber)] mb-4">
                        {t('testimonials.label')}
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-on-dark leading-tight">
                        {t('testimonials.title')}
                    </h2>
                </m.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {items.map((index) => (
                        <m.div
                            key={index}
                            className="relative p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewportOnce}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Quote mark */}
                            <div className="font-display text-5xl text-[var(--amber)]/30 leading-none mb-4">&ldquo;</div>
                            <p className="text-on-dark-muted leading-relaxed mb-6 text-sm sm:text-base">
                                {t(`testimonials.items.${index}.text`)}
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-px bg-[var(--amber)]" />
                                <p className="text-sm font-semibold text-[var(--amber)]">
                                    {t(`testimonials.items.${index}.author`)}
                                </p>
                            </div>
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
