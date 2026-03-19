'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { m } from 'framer-motion';
import { FormData } from '../../Contact';


interface LocationChoiceProps {
    formData: FormData;
    onUpdate: (updates: Partial<FormData>) => void;
}

const LocationChoice = ({ formData, onUpdate }: LocationChoiceProps) => {
    const t = useTranslations('contact');

    const handleLocationChoice = (isOnline: boolean) => {
        onUpdate({ isOnline });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white text-center">
                {t('form.doYouPreferOnlineOrInpersonLessons')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLocationChoice(true)}
                    className={`px-6 py-4 rounded-lg transition-colors ${
                        formData.isOnline 
                            ? 'bg-[var(--amber)] text-[var(--ink)]' 
                            : 'bg-[var(--ink-light)] text-white hover:bg-[var(--ink-light)]'
                    }`}
                >
                    {t('form.onlineLessons')}
                </m.button>
                <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLocationChoice(false)}
                    className={`px-6 py-4 rounded-lg transition-colors ${
                        formData.isOnline === false 
                            ? 'bg-[var(--amber)] text-[var(--ink)]' 
                            : 'bg-[var(--ink-light)] text-white hover:bg-[var(--ink-light)]'
                    }`}
                >
                    {t('form.inpersonLessons')}
                </m.button>
            </div>
        </div>
    );
};

export default LocationChoice;