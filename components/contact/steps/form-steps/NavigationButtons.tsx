'use client';

import React from 'react';
import { m } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


interface NavigationButtonsProps {
    onBack: () => void;
    onNext: () => void;
    isFirst: boolean;
    isLast: boolean;
    disabled?: boolean;
}

const NavigationButtons = ({ onBack, onNext, isFirst, isLast, disabled }: NavigationButtonsProps) => {
    const locale = useLocale();
    const language = locale.toUpperCase() as 'EN' | 'NL';
    const t = (obj: Record<string, string> | string) => typeof obj === 'string' ? obj : obj[language] || obj['EN'] || '';

    return (
        <div className="flex justify-between mt-8">
            {!isFirst && (
                <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-4 py-2 bg-[var(--ink-light)] text-[var(--amber)] rounded-lg hover:bg-[var(--ink-light)] transition-colors"
                    onClick={onBack}
                >
                    <FaArrowLeft className="mr-2" />
                    {String(t({ EN: "Back", NL: "Terug" }))}
                </m.button>
            )}
            <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ml-auto ${
                    disabled
                        ? 'bg-[var(--cream)]0 text-[var(--muted-text)] cursor-not-allowed'
                        : 'bg-[var(--amber)] text-[var(--ink)] hover:bg-[var(--amber)]'
                }`}
                onClick={onNext}
                disabled={disabled}
            >
                {isLast 
                    ? String(t({ EN: "Submit", NL: "Versturen" }))
                    : String(t({ EN: "Next", NL: "Volgende" }))}
                {!isLast && <FaArrowRight className="ml-2" />}
            </m.button>
        </div>
    );
};

export default NavigationButtons;