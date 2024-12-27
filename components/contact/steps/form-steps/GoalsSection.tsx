'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../../Contact';
import { useTranslation } from '../../../../hooks/useTranslation';

interface GoalsSectionProps {
    formData: FormData;
    onUpdate: (updates: Partial<FormData>) => void;
}

const MIN_GOALS_LENGTH = 10;
const MAX_GOALS_LENGTH = 500;

const GoalsSection = ({ formData, onUpdate }: GoalsSectionProps) => {
    const { t } = useTranslation();
    const [error, setError] = useState<string | null>(null);

    const handleGoalsChange = (value: string) => {
        if (value.length < MIN_GOALS_LENGTH) {
            setError(String(t({
                EN: `Please provide at least ${MIN_GOALS_LENGTH} characters describing your goals`,
                NL: `Geef minimaal ${MIN_GOALS_LENGTH} tekens op om je doelen te beschrijven`
            })));
        } else if (value.length > MAX_GOALS_LENGTH) {
            setError(String(t({
                EN: `Goals description cannot exceed ${MAX_GOALS_LENGTH} characters`,
                NL: `Doelomschrijving mag niet langer zijn dan ${MAX_GOALS_LENGTH} tekens`
            })));
        } else {
            setError(null);
        }
        onUpdate({ goals: value });
    };

    const remainingChars = MAX_GOALS_LENGTH - (formData.goals?.length || 0);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white text-center">
                {String(t({
                    EN: "What are your learning goals?",
                    NL: "Wat zijn je leerdoelen?"
                }))}
            </h2>
            
            <p className="text-yellow-300 text-center">
                {String(t({
                    EN: "Please describe what you would like to achieve",
                    NL: "Beschrijf wat je wilt bereiken"
                }))}
            </p>

            <div className="space-y-2">
                <textarea
                    value={formData.goals}
                    onChange={(e) => handleGoalsChange(e.target.value)}
                    className={`w-full h-48 p-4 rounded-lg bg-blue-700 text-white border ${
                        error ? 'border-red-500' : 'border-blue-600'
                    } focus:border-yellow-400 focus:outline-none resize-none`}
                    placeholder={String(t({
                        EN: "Example: I want to improve my understanding of calculus, especially derivatives and integrals...",
                        NL: "Bijvoorbeeld: Ik wil mijn begrip van calculus verbeteren, vooral afgeleiden en integralen..."
                    }))}
                    maxLength={MAX_GOALS_LENGTH}
                />
                <div className="flex justify-between items-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-sm ${error ? 'text-red-500' : 'text-yellow-300'}`}
                    >
                        {error || String(t({
                            EN: `${remainingChars} characters remaining`,
                            NL: `Nog ${remainingChars} tekens beschikbaar`
                        }))}
                    </motion.p>
                    {formData.goals?.length >= MIN_GOALS_LENGTH && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-sm text-green-400"
                        >
                            {String(t({
                                EN: "✓ Minimum length reached",
                                NL: "✓ Minimale lengte bereikt"
                            }))}
                        </motion.p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GoalsSection;