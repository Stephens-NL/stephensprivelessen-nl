// components/TermsAndConditions.tsx
'use client';

import React from 'react';
import { m } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { CollapsibleSection } from '@/components/CollapsibleSection';
import { useTranslations } from 'next-intl';

const TERMS_COUNT = 2;

const TermsAndConditions = () => {
    const t = useTranslations('terms');

    return (
        <div className="min-h-screen bg-[var(--ink)] py-12 px-4 sm:px-6 lg:px-8">
            <m.div
                className="max-w-4xl mx-auto bg-[var(--ink-light)] rounded-lg shadow-xl overflow-hidden"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
            >
                <div className="p-6">
                    <m.h1
                        className="text-3xl font-bold font-display text-center text-[var(--amber)] mb-6"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Lesvoorwaarden
                    </m.h1>

                    {Array.from({ length: TERMS_COUNT }, (_, index) => (
                        <CollapsibleSection key={index} title={t(`items.${index}.title`)}>
                            {(() => {
                                // We know the content array lengths from the JSON
                                const contentCount = index === 0 ? 3 : 5;
                                return (
                                    <ul className="list-disc pl-5 text-[var(--cream)]">
                                        {Array.from({ length: contentCount }, (_, cIndex) => (
                                            <li key={cIndex} className="mb-2 text-sm">
                                                {t(`items.${index}.content.${cIndex}`)}
                                            </li>
                                        ))}
                                    </ul>
                                );
                            })()}
                        </CollapsibleSection>
                    ))}
                </div>
            </m.div>
        </div>
    );
};

export default TermsAndConditions;
