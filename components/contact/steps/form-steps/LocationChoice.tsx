'use client';

import React from 'react';
import { m } from 'framer-motion';
import { FormData } from '../../Contact';


interface LocationChoiceProps {
    formData: FormData;
    onUpdate: (updates: Partial<FormData>) => void;
}

const LocationChoice = ({ formData, onUpdate }: LocationChoiceProps) => {
    const locale = useLocale();
    const language = locale.toUpperCase() as 'EN' | 'NL';
    const t = (obj: Record<string, string> | string) => typeof obj === 'string' ? obj : obj[language] || obj['EN'] || '';

    const handleLocationChoice = (isOnline: boolean) => {
        onUpdate({ isOnline });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white text-center">
                {String(t({
                    EN: "Do you prefer online or in-person lessons?",
                    NL: "Heb je voorkeur voor online of fysieke lessen?"
                }))}
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
                    {String(t({
                        EN: "Online Lessons",
                        NL: "Online Lessen"
                    }))}
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
                    {String(t({
                        EN: "In-Person Lessons",
                        NL: "Fysieke Lessen"
                    }))}
                </m.button>
            </div>
        </div>
    );
};

export default LocationChoice;