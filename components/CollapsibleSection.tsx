// components/CollapsibleSection.tsx
'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useLocale } from 'next-intl';

export const CollapsibleSection = ({ title, children }: { title: string | { EN: string; NL: string }, children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const locale = useLocale();
    const language = locale === 'nl' ? 'NL' : 'EN';

    return (
        <div className="mb-4">
            <m.button
                className="w-full flex justify-between items-center bg-[var(--ink)] p-3 rounded-lg text-[var(--amber)] font-semibold"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.02 }}
            >
                {typeof title === 'string' ? title : title[language]}
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </m.button>
            <AnimatePresence>
                {isOpen && (
                    <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[var(--ink-light)] p-4 rounded-b-lg mt-1"
                    >
                        {children}
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
};