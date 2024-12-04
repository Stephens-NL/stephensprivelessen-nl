'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InitialChoice from './steps/InitialChoice';
import { useTranslation } from '../../hooks/useTranslation';
import LessonForm from './steps/LessonForm';

export type FormStep =
    | 'initial' 
    | 'info' 
    | 'personal-details'
    | 'subject-selection'
    | 'goals'
    | 'schedule'
    | 'location'
    | 'confirmation';

export interface FormData {
    name: string;
    level: string;
    subject: string;
    goals: string;
    preferredDays: string[];
    preferredTimes: string[];
    isOnline: boolean;
    unavailableDays: string[];
    email: string;
    age: number;
    contactPreference: 'student' | 'parent' | 'both' | null;
    parentName?: string;
    parentEmail?: string;
    parentPhone?: string;
}

const initialFormData: FormData = {
    name: '',
    level: '',
    subject: '',
    goals: '',
    preferredDays: [],
    preferredTimes: [],
    isOnline: false,
    unavailableDays: [],
    email: '',
    age: 0,
    contactPreference: null,
    parentName: '',
    parentEmail: '',
    parentPhone: ''
};

const Contact = () => {
    const [currentStep, setCurrentStep] = useState<FormStep>('initial');
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const { t } = useTranslation();

    const handleUpdateFormData = (updates: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...updates }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-2xl mx-auto bg-blue-800 rounded-lg shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="p-6">
                    <motion.h1
                        className="text-3xl font-bold text-center text-yellow-300 mb-6"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {String(t({ EN: "Let's Get Started!", NL: "Laten We Beginnen!" }))}
                    </motion.h1>

                    <AnimatePresence mode="wait">
                        {currentStep === 'initial' && (
                            <InitialChoice 
                                onChooseInfo={() => setCurrentStep('info')}
                                onChooseLesson={() => setCurrentStep('personal-details')}
                            />
                        )}
                        {currentStep !== 'initial' && (
                            <LessonForm 
                                step={currentStep}
                                formData={formData}
                                onUpdateFormData={handleUpdateFormData}
                                onBack={currentStep === 'personal-details' 
                                    ? () => setCurrentStep('initial')
                                    : () => setCurrentStep(prev => getPreviousStep(prev))}
                                onNext={() => setCurrentStep(prev => getNextStep(prev))}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

const getPreviousStep = (currentStep: FormStep): FormStep => {
    const steps: FormStep[] = [
        'initial',
        'personal-details',
        'subject-selection',
        'goals',
        'schedule',
        'location',
        'confirmation'
    ];
    const currentIndex = steps.indexOf(currentStep);
    return steps[currentIndex - 1];
};

const getNextStep = (currentStep: FormStep): FormStep => {
    const steps: FormStep[] = [
        'initial',
        'personal-details',
        'subject-selection',
        'goals',
        'schedule',
        'location',
        'confirmation'
    ];
    const currentIndex = steps.indexOf(currentStep);
    return steps[currentIndex + 1];
};

export default Contact; 