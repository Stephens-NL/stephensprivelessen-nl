'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../../Contact';
import { useTranslation } from '../../../../hooks/useTranslation';

interface SubjectSelectionProps {
    formData: FormData;
    onUpdate: (updates: Partial<FormData>) => void;
}

const subjects = {
    primary: [
        { value: 'math_primary', labelEN: 'Mathematics', labelNL: 'Rekenen' },
        { value: 'dutch_primary', labelEN: 'Dutch', labelNL: 'Nederlands' },
        { value: 'english_primary', labelEN: 'English', labelNL: 'Engels' },
        { value: 'other_primary', labelEN: 'Other Subject', labelNL: 'Ander Vak' },
    ],
    secondary: [
        { value: 'math_secondary', labelEN: 'Mathematics', labelNL: 'Wiskunde' },
        { value: 'physics', labelEN: 'Physics', labelNL: 'Natuurkunde' },
        { value: 'chemistry', labelEN: 'Chemistry', labelNL: 'Scheikunde' },
        { value: 'biology', labelEN: 'Biology', labelNL: 'Biologie' },
        { value: 'economics', labelEN: 'Economics', labelNL: 'Economie' },
        { value: 'other_secondary', labelEN: 'Other Subject', labelNL: 'Ander Vak' },
    ],
    higher: [
        { value: 'calculus', labelEN: 'Calculus', labelNL: 'Calculus' },
        { value: 'statistics', labelEN: 'Statistics', labelNL: 'Statistiek' },
        { value: 'linear_algebra', labelEN: 'Linear Algebra', labelNL: 'Lineaire Algebra' },
        { value: 'other_higher', labelEN: 'Other Subject', labelNL: 'Ander Vak' },
    ],
};

const SubjectSelection = ({ formData, onUpdate }: SubjectSelectionProps) => {
    const { t } = useTranslation();
    const [showOtherInput, setShowOtherInput] = useState(false);
    const [otherSubject, setOtherSubject] = useState('');

    const availableSubjects = useMemo(() => {
        return subjects[formData.level as keyof typeof subjects] || [];
    }, [formData.level]);

    const handleSubjectSelect = (value: string) => {
        if (value.includes('other_')) {
            setShowOtherInput(true);
            onUpdate({ subject: 'other' });
        } else {
            setShowOtherInput(false);
            onUpdate({ subject: value });
        }
    };

    const handleOtherSubjectInput = (value: string) => {
        setOtherSubject(value);
        onUpdate({ subject: value });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-semibold text-yellow-300 mb-4">
                {String(t({ EN: "Select Subject", NL: "Kies een Vak" }))}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableSubjects.map((subject) => (
                    <motion.button
                        key={subject.value}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                            (subject.value.includes('other_') ? showOtherInput : formData.subject === subject.value)
                                ? 'bg-yellow-400 text-blue-900 border-yellow-500'
                                : 'bg-blue-700 text-yellow-300 border-blue-600 hover:border-yellow-400'
                        }`}
                        onClick={() => handleSubjectSelect(subject.value)}
                    >
                        {String(t({ EN: subject.labelEN, NL: subject.labelNL }))}
                    </motion.button>
                ))}
            </div>

            {showOtherInput && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                >
                    <label className="block text-yellow-200 mb-2">
                        {String(t({
                            EN: "Please specify the subject",
                            NL: "Specificeer het vak"
                        }))}
                    </label>
                    <input
                        type="text"
                        value={otherSubject}
                        onChange={(e) => handleOtherSubjectInput(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-blue-700 text-yellow-100 border border-blue-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-colors"
                        placeholder={String(t({
                            EN: "Enter the subject name",
                            NL: "Voer de naam van het vak in"
                        }))}
                    />
                </motion.div>
            )}

            {formData.subject === '' && (
                <p className="text-red-400 text-sm mt-2">
                    {String(t({
                        EN: "Please select a subject to continue",
                        NL: "Selecteer een vak om door te gaan"
                    }))}
                </p>
            )}
        </motion.div>
    );
};

export default SubjectSelection;