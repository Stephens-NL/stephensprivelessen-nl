'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InitialChoice from './steps/InitialChoice';
import { useTranslation } from '../../hooks/useTranslation';
import LessonForm from './steps/LessonForm';
import { sendContactForm } from '../../lib/api';
import GoogleCalendarAppointment from './components/GoogleCalendarAppointment';

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
    submitted: boolean;
    error?: string;
    requestType: 'self' | 'other' | null;
    requesterName?: string;
    requesterEmail?: string;
    relationship?: string;
    programmingLanguage?: string;
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
    parentPhone: '',
    submitted: false,
    error: undefined,
    requestType: null,
    requesterName: '',
    requesterEmail: '',
    relationship: '',
    programmingLanguage: undefined,
};

const Contact = () => {
    const [currentStep, setCurrentStep] = useState<FormStep>('initial');
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [appointmentType, setAppointmentType] = useState<'trial' | 'regular'>('trial');

    const handleUpdateFormData = (updates: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...updates }));
    };

    const handleScheduleAppointment = (type: 'trial' | 'regular') => {
        setAppointmentType(type);
        setShowCalendar(true);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            if (!formData.email || !formData.name) {
                throw new Error(String(t({ 
                    EN: 'Please fill in all required fields', 
                    NL: 'Vul alle verplichte velden in' 
                })));
            }

            if (formData.age < 18 && !formData.parentEmail) {
                throw new Error(String(t({ 
                    EN: 'Parent contact information is required for students under 18', 
                    NL: 'Contactgegevens van ouders zijn verplicht voor studenten onder de 18' 
                })));
            }

            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            handleUpdateFormData({ 
                submitted: true,
                error: undefined 
            });
            
            handleScheduleAppointment('trial');
        } catch (error) {
            console.error('Form submission error:', error);
            handleUpdateFormData({ 
                error: error instanceof Error ? error.message : t({ EN: 'Something went wrong', NL: 'Er is iets misgegaan' }) 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    console.log('Current step:', currentStep);

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

                    {formData.error && (
                        <motion.div 
                            className="mb-4 p-4 bg-red-500 text-white rounded"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {formData.error}
                        </motion.div>
                    )}

                    <AnimatePresence mode="wait">
                        {currentStep === 'initial' && (
                            <InitialChoice 
                                onChooseInfo={() => setCurrentStep('info')}
                                onChooseLesson={() => setCurrentStep('personal-details')}
                            />
                        )}
                        {currentStep !== 'initial' && !formData.submitted && (
                            <LessonForm 
                                step={currentStep}
                                formData={formData}
                                onUpdateFormData={handleUpdateFormData}
                                onBack={currentStep === 'personal-details' 
                                    ? () => setCurrentStep('initial')
                                    : () => setCurrentStep(prev => getPreviousStep(prev))}
                                onNext={currentStep === 'confirmation' 
                                    ? handleSubmit
                                    : () => setCurrentStep(prev => getNextStep(prev))}
                                isSubmitting={isSubmitting}
                            />
                        )}
                        {formData.submitted && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center text-white"
                            >
                                <h2 className="text-2xl font-bold mb-4">
                                    {String(t({
                                        EN: "Thank you for your submission!",
                                        NL: "Bedankt voor je aanmelding!"
                                    }))}
                                </h2>
                                <p>
                                    {String(t({
                                        EN: "We'll contact you soon.",
                                        NL: "We nemen binnenkort contact met je op."
                                    }))}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
            
            <GoogleCalendarAppointment
                isOpen={showCalendar}
                onClose={() => setShowCalendar(false)}
                appointmentType={appointmentType}
                studentName={formData.name}
                studentEmail={formData.email}
            />
        </div>
    );
};

const getPreviousStep = (currentStep: FormStep): FormStep => {
    const steps: FormStep[] = [
        'initial',
        'info',
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
        'info',
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