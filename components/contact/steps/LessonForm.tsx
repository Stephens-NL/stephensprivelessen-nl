'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FormStep, FormData } from '../Contact';
import PersonalDetails from './form-steps/PersonalDetails';
import SubjectSelection from './form-steps/SubjectSelection';
import GoalsSection from './form-steps/GoalsSection';
import ScheduleSelection from './form-steps/ScheduleSelection';
import LocationChoice from './form-steps/LocationChoice';
import Confirmation from './form-steps/Confirmation';
import NavigationButtons from './form-steps/NavigationButtons';
import InfoSection from './InfoSection';
import { useTranslation } from '../../../hooks/useTranslation';
import BackConfirmationDialog from '../components/BackConfirmationDialog';

interface LessonFormProps {
    step: FormStep;
    formData: FormData;
    onUpdateFormData: (updates: Partial<FormData>) => void;
    onBack: () => void;
    onNext: () => void;
}

const LessonForm = ({ 
    step, 
    formData, 
    onUpdateFormData, 
    onBack, 
    onNext 
}: LessonFormProps) => {
    const { t } = useTranslation();
    const [showBackConfirmation, setShowBackConfirmation] = useState(false);

    const canProceed = () => {
        switch (step) {
            case 'personal-details':
                return formData.name.trim() !== '' && formData.level !== '';
            case 'subject-selection':
                return formData.subject.trim() !== '';
            case 'goals':
                return formData.goals.trim() !== '';
            case 'schedule':
                return formData.preferredDays.length > 0 && formData.preferredTimes.length > 0;
            case 'location':
                return true; // Altijd een keuze geselecteerd
            default:
                return true;
        }
    };

    const handleBackClick = () => {
        if (step === 'info' || step === 'personal-details') {
            setShowBackConfirmation(true);
        } else {
            onBack();
        }
    };

    const handleNext = () => {
        if (step === 'confirmation') {
            // Formulier afronden
            handleSubmitForm();
        } else if (canProceed()) {
            onNext();
        }
    };

    const handleSubmitForm = async () => {
        try {
            // Hier komt de logica voor het versturen van het formulier
            // Na succesvol versturen:
            onBack(); // Terug naar initiële keuze
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 'info':
                return <InfoSection 
                    onBack={onBack}
                    onRequestLesson={onNext}
                />;
            case 'personal-details':
                return <PersonalDetails 
                    formData={formData} 
                    onUpdate={onUpdateFormData} 
                />;
            case 'subject-selection':
                return <SubjectSelection 
                    formData={formData} 
                    onUpdate={onUpdateFormData} 
                />;
            case 'goals':
                return <GoalsSection 
                    formData={formData} 
                    onUpdate={onUpdateFormData} 
                />;
            case 'schedule':
                return <ScheduleSelection 
                    formData={formData} 
                    onUpdate={onUpdateFormData} 
                />;
            case 'location':
                return <LocationChoice 
                    formData={formData} 
                    onUpdate={onUpdateFormData} 
                />;
            case 'confirmation':
                return <Confirmation formData={formData} />;
            default:
                return null;
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
            >
                {renderStep()}
                {step !== 'info' && (
                    <NavigationButtons 
                        onBack={handleBackClick}
                        onNext={handleNext}
                        isFirst={step === 'personal-details'}
                        isLast={step === 'confirmation'}
                        disabled={!canProceed()}
                    />
                )}
            </motion.div>

            <BackConfirmationDialog 
                isOpen={showBackConfirmation}
                onClose={() => setShowBackConfirmation(false)}
                onConfirm={() => {
                    setShowBackConfirmation(false);
                    onBack();
                }}
            />
        </>
    );
};

export default LessonForm; 