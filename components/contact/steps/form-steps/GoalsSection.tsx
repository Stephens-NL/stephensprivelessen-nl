'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../../Contact';
import { useTranslation } from '../../../../hooks/useTranslation';
import { FaBookOpen, FaCalendarAlt } from 'react-icons/fa';

interface GoalsSectionProps {
    formData: FormData;
    onUpdate: (updates: Partial<FormData>) => void;
}

const GoalsSection = ({ formData, onUpdate }: GoalsSectionProps) => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-semibold text-yellow-300 mb-4">
                {String(t({ EN: "Your Goals", NL: "Je Doelen" }))}
            </h2>

            <div className="space-y-4">
                <div className="bg-blue-700 p-4 rounded-lg">
                    <div className="flex items-center text-yellow-300 mb-3">
                        <FaBookOpen className="text-xl mr-2" />
                        <h3 className="font-semibold">
                            {String(t({
                                EN: "Learning Goals",
                                NL: "Leerdoelen"
                            }))}
                        </h3>
                    </div>
                    <p className="text-yellow-100 text-sm mb-4">
                        {String(t({
                            EN: "What would you like to achieve? For example: better grades, understanding specific topics, or exam preparation.",
                            NL: "Wat wil je bereiken? Bijvoorbeeld: betere cijfers, begrip van specifieke onderwerpen, of examenvoorbereiding."
                        }))}
                    </p>
                </div>

                <div className="bg-blue-700 p-4 rounded-lg">
                    <div className="flex items-center text-yellow-300 mb-3">
                        <FaCalendarAlt className="text-xl mr-2" />
                        <h3 className="font-semibold">
                            {String(t({
                                EN: "Important Dates",
                                NL: "Belangrijke Data"
                            }))}
                        </h3>
                    </div>
                    <p className="text-yellow-100 text-sm mb-4">
                        {String(t({
                            EN: "Do you have any upcoming tests, exams, or deadlines?",
                            NL: "Heb je binnenkort toetsen, examens of deadlines?"
                        }))}
                    </p>
                </div>

                <textarea
                    value={formData.goals}
                    onChange={(e) => onUpdate({ goals: e.target.value })}
                    className="w-full h-40 px-4 py-2 rounded-lg bg-blue-700 text-yellow-100 border border-blue-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-colors"
                    placeholder={String(t({
                        EN: "Describe your goals and any important dates...",
                        NL: "Beschrijf je doelen en belangrijke data..."
                    }))}
                />

                {formData.goals.trim() === '' && (
                    <p className="text-red-400 text-sm">
                        {String(t({
                            EN: "Please describe your goals to continue",
                            NL: "Beschrijf je doelen om door te gaan"
                        }))}
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default GoalsSection;