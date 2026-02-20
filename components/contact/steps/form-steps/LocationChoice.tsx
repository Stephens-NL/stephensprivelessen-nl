'use client';

import React from 'react';
import { m } from 'framer-motion';
import { FormData } from '../../Contact';
import { useTranslation } from '../../../../hooks/useTranslation';

interface LocationChoiceProps {
    formData: FormData;
    onUpdate: (updates: Partial<FormData>) => void;
}

const LocationChoice = ({ formData, onUpdate }: LocationChoiceProps) => {
    const { t } = useTranslation();

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
                            ? 'bg-yellow-400 text-blue-900' 
                            : 'bg-blue-700 text-white hover:bg-blue-600'
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
                            ? 'bg-yellow-400 text-blue-900' 
                            : 'bg-blue-700 text-white hover:bg-blue-600'
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