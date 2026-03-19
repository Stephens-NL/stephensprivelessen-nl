'use client';

import { useLocale, useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { m } from 'framer-motion';
import { FormData } from '../../Contact';


interface GoalsSectionProps {
    formData: FormData;
    onUpdate: (updates: Partial<FormData>) => void;
}

const MIN_GOALS_LENGTH = 10;
const MAX_GOALS_LENGTH = 500;

const GoalsSection = ({ formData, onUpdate }: GoalsSectionProps) => {
    const locale = useLocale();
    const t = useTranslations('contact');
    const [error, setError] = useState<string | null>(null);

    const handleGoalsChange = (value: string) => {
        if (value.length < MIN_GOALS_LENGTH) {
            setError(locale === 'nl' ? `Geef minimaal ${MIN_GOALS_LENGTH} tekens op om je doelen te beschrijven` : `Please provide at least ${MIN_GOALS_LENGTH} characters describing your goals`);
        } else if (value.length > MAX_GOALS_LENGTH) {
            setError(locale === 'nl' ? `Doelomschrijving mag niet langer zijn dan ${MAX_GOALS_LENGTH} tekens` : `Goals description cannot exceed ${MAX_GOALS_LENGTH} characters`);
        } else {
            setError(null);
        }
        onUpdate({ goals: value });
    };

    const remainingChars = MAX_GOALS_LENGTH - (formData.goals?.length || 0);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white text-center">
                {t('form.whatAreYourLearningGoals')}
            </h2>
            
            <p className="text-[var(--amber)] text-center">
                {t('form.pleaseDescribeWhatYouWouldLikeToAchieve')}
            </p>

            <div className="space-y-2">
                <textarea
                    value={formData.goals}
                    onChange={(e) => handleGoalsChange(e.target.value)}
                    className={`w-full h-48 p-4 rounded-lg bg-[var(--ink-light)] text-white border ${
                        error ? 'border-red-500' : 'border-[var(--ink-light)]'
                    } focus:border-[var(--amber)] focus:outline-none resize-none`}
                    placeholder={t('form.exampleIWantToImproveMyUnderstandingOfCalculusEspe')}
                    maxLength={MAX_GOALS_LENGTH}
                />
                <div className="flex justify-between items-center">
                    <m.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-sm ${error ? 'text-red-500' : 'text-[var(--amber)]'}`}
                    >
                        {error || (locale === 'nl' ? `Nog ${remainingChars} tekens beschikbaar` : `${remainingChars} characters remaining`)}
                    </m.p>
                    {formData.goals?.length >= MIN_GOALS_LENGTH && (
                        <m.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-sm text-[var(--sage)]"
                        >
                            {t('form.minimumLengthReached')}
                        </m.p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GoalsSection;