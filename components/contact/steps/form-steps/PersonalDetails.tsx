'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../../Contact';
import { useTranslation } from '../../../../hooks/useTranslation';

interface PersonalDetailsProps {
    formData: FormData;
    onUpdate: (updates: Partial<FormData>) => void;
}

const educationLevels = [
    { value: 'primary', labelEN: 'Primary School', labelNL: 'Basisschool' },
    { value: 'secondary', labelEN: 'Secondary School', labelNL: 'Middelbare School' },
    { value: 'higher', labelEN: 'Higher Education', labelNL: 'Hoger Onderwijs' },
];

const PersonalDetails = ({ formData, onUpdate }: PersonalDetailsProps) => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-semibold text-yellow-300 mb-4">
                {String(t({ EN: "Personal Details", NL: "Persoonlijke Gegevens" }))}
            </h2>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-yellow-200 mb-2" htmlFor="name">
                        {String(t({ EN: "Your Name", NL: "Je Naam" }))}
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => onUpdate({ name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-blue-700 text-yellow-100 border border-blue-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-colors"
                        placeholder={String(t({ EN: "Enter your name", NL: "Vul je naam in" }))}
                    />
                    {formData.name.trim() === '' && (
                        <p className="text-red-400 text-sm mt-1">
                            {String(t({
                                EN: "Please enter your name",
                                NL: "Vul alsjeblieft je naam in"
                            }))}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-yellow-200 mb-2" htmlFor="level">
                        {String(t({ EN: "Education Level", NL: "Onderwijsniveau" }))}
                    </label>
                    <select
                        id="level"
                        value={formData.level}
                        onChange={(e) => onUpdate({ level: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-blue-700 text-yellow-100 border border-blue-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-colors"
                    >
                        <option value="">
                            {String(t({ EN: "Select your level", NL: "Kies je niveau" }))}
                        </option>
                        {educationLevels.map((level) => (
                            <option key={level.value} value={level.value}>
                                {String(t({ EN: level.labelEN, NL: level.labelNL }))}
                            </option>
                        ))}
                    </select>
                    {formData.level === '' && (
                        <p className="text-red-400 text-sm mt-1">
                            {String(t({
                                EN: "Please select your education level",
                                NL: "Selecteer alsjeblieft je onderwijsniveau"
                            }))}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default PersonalDetails; 