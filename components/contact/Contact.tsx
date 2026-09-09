'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import InitialChoice from './steps/InitialChoice';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/hooks/useLanguage';
import LessonForm from './steps/LessonForm';
import { sendContactForm } from '../../lib/api';
import GoogleCalendarAppointment from './components/GoogleCalendarAppointment';
import WhatsAppCTAButton from '@/components/shared/WhatsAppCTAButton';

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
    /** Student's own number — asked for as a WhatsApp number, see StudentForm. */
    phone?: string;
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
    phone: '',
    parentPhone: '',
    submitted: false,
    error: undefined,
    requestType: null,
    requesterName: '',
    requesterEmail: '',
    relationship: '',
    programmingLanguage: undefined,
};

type CalendarState = { show: boolean; type: 'trial' | 'regular' };

interface ContactProps {
    /** Step to start on. Defaults to 'initial' (the info-vs-lesson split). Pass 'personal-details' to open the lesson-request wizard directly (e.g. /aanmelden). */
    startStep?: FormStep;
    /** Optional warm intro line shown under the heading. */
    intro?: string;
}

const Contact = ({ startStep = 'initial', intro }: ContactProps) => {
    const [currentStep, setCurrentStep] = useState<FormStep>(startStep);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const language = useLanguage();
    const t = useTranslations('contact');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [calendar, setCalendar] = useState<CalendarState>({ show: false, type: 'trial' });

    const handleUpdateFormData = (updates: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...updates }));
    };

    const handleScheduleAppointment = (type: 'trial' | 'regular') => {
        setCalendar({ show: true, type });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            if (!formData.email || !formData.name) {
                throw new Error(t('form.pleaseFillInAllRequiredFields'));
            }

            if (formData.age < 18 && !formData.parentEmail) {
                throw new Error(t('form.parentContactInformationIsRequiredForStudentsUnder'));
            }

            await sendContactForm(formData);

            handleUpdateFormData({ 
                submitted: true,
                error: undefined 
            });
            
            handleScheduleAppointment('trial');
        } catch (error) {
            console.error('Form submission error:', error);
            handleUpdateFormData({ 
                error: error instanceof Error ? error.message : t('form.somethingWentWrong') 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--ink)] to-[var(--ink-light)] px-4 sm:px-6 lg:px-8 py-12">
            <m.div
                className="max-w-2xl mx-auto bg-[var(--ink)] rounded-lg shadow-xl overflow-hidden border border-[var(--amber)]/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="p-6">
                    <m.h1
                        className="text-3xl font-bold text-center text-[var(--amber)] mb-6"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {t('form.letsGetStarted')}
                    </m.h1>

                    {intro && (
                        <m.p
                            className="text-center text-[var(--cream)]/80 mb-8 -mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {intro}
                        </m.p>
                    )}

                    {formData.error && (
                        <m.div 
                            className="mb-4 p-4 bg-destructive text-white rounded"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {formData.error}
                        </m.div>
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
                            <m.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center text-white"
                            >
                                <h2 className="text-2xl font-bold mb-4">
                                    {t('form.thankYouForYourSubmission')}
                                </h2>
                                <p className="mb-6">
                                    {t('form.wellContactYouSoon')}
                                </p>
                                {/* Direct line to Stephen's preferred channel — so a lead is never
                                    lost even if the notification email or calendar step is skipped. */}
                                <div className="flex justify-center">
                                    <WhatsAppCTAButton
                                        prefilledMessage={`Hi Stephen, I just submitted the lesson request form (${formData.name}${formData.subject ? ` — ${formData.subject}` : ''}).`}
                                    />
                                </div>
                            </m.div>
                        )}
                    </AnimatePresence>
                </div>
            </m.div>
            
            <GoogleCalendarAppointment
                isOpen={calendar.show}
                onClose={() => setCalendar(prev => ({ ...prev, show: false }))}
                appointmentType={calendar.type}
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