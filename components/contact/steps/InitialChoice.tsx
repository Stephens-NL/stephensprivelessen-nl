'use client';

import React from 'react';
import { m } from 'framer-motion';
import { FaInfoCircle, FaCalendarCheck } from 'react-icons/fa';
import { useLocale } from 'next-intl';

interface InitialChoiceProps {
    onChooseInfo: () => void;
    onChooseLesson: () => void;
}

const InitialChoice = ({ onChooseInfo, onChooseLesson }: InitialChoiceProps) => {
    const locale = useLocale();
    const language = locale.toUpperCase() as 'EN' | 'NL';
    const t = (obj: Record<string, string> | string) => typeof obj === 'string' ? obj : obj[language] || obj['EN'] || '';

    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
        >
            <p className="text-center text-[var(--cream)] mb-8">
                {String(t({
                    EN: "Would you like to learn more about our teaching methods or schedule a trial lesson right away?",
                    NL: "Wil je meer weten over onze lesmethoden of direct een proefles inplannen?"
                }))}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <m.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center p-6 bg-[var(--ink-light)] rounded-lg text-[var(--amber)] hover:bg-[var(--ink-light)] transition-colors border-2 border-[var(--ink-light)] hover:border-[var(--amber)]"
                    onClick={onChooseInfo}
                >
                    <FaInfoCircle className="text-3xl mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                        {String(t({
                            EN: "More Information",
                            NL: "Meer Informatie"
                        }))}
                    </h3>
                    <p className="text-sm text-center opacity-80">
                        {String(t({
                            EN: "Learn about our teaching methods, subjects, and pricing",
                            NL: "Leer meer over onze lesmethoden, vakken en tarieven"
                        }))}
                    </p>
                </m.button>

                <div className="relative">
                    <m.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex flex-col items-center p-6 bg-[var(--border-warm)] rounded-lg text-[var(--ink)] transition-colors border-2 border-[var(--muted-text)] w-full opacity-50 cursor-not-allowed"
                        disabled
                    >
                        <FaCalendarCheck className="text-3xl mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            {String(t({
                                EN: "Schedule Trial Lesson",
                                NL: "Plan Proefles"
                            }))}
                        </h3>
                        <p className="text-sm text-center opacity-80">
                            {String(t({
                                EN: "Book a free 30-minute trial lesson now",
                                NL: "Plan direct een gratis proefles van 30 minuten"
                            }))}
                        </p>
                    </m.button>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-[var(--ink)] text-[var(--amber)] px-4 py-2 rounded-full font-semibold transform -rotate-12">
                            {String(t({
                                EN: "Coming Soon",
                                NL: "Binnenkort Beschikbaar"
                            }))}
                        </span>
                    </div>
                </div>
            </div>
        </m.div>
    );
};

export default InitialChoice; 