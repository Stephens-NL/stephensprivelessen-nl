'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { m } from 'framer-motion';
import React from 'react';

const ButtonTrial = () => {
    const t = useTranslations('home');

    return (
        <m.div
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
        >
            <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 font-semibold text-[var(--cream)] bg-[var(--ink)] rounded-lg hover:bg-[var(--ink-light)] transition-colors duration-300 shadow-lg shadow-[var(--ink)]/20"
            >
                {t('hero.schedulefreetrial')}
                <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </Link>
        </m.div>
    );
};

export default ButtonTrial;
