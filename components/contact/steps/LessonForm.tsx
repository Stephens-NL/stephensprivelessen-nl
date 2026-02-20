'use client';

import React, { useState } from 'react';
import { m } from 'framer-motion';
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
import { isValidEmail, isValidPhoneNumber } from '../../../lib/validation';

export interface LessonFormProps {
    step: FormStep;
    formData: FormData;
    onUpdateFormData: (updates: Partial<FormData>) => void;
    onBack: () => void;
    onNext: () => void;
    isSubmitting: boolean;
}

const MIN_SUBJECT_LENGTH = 2;
const MIN_GOALS_LENGTH = 10;

const LessonForm = ({ 
    step, 
    formData, 
    onUpdateFormData, 
    onBack, 
    onNext, 
    isSubmitting 
}: LessonFormProps) => {
    const { t } = useTranslation();
    const [showBackConfirmation, setShowBackConfirmation] = useState(false);

    const canProceed = () => {
        switch (step) {
            case 'personal-details':
                if (!formData.requestType) return false;
                
                const hasBasicFields = formData.name.trim() !== '' && 
                    formData.email.trim() !== '' && 
                    formData.age > 0 && 
                    formData.level !== '';

                const isEmailValid = isValidEmail(formData.email);
                
                if (formData.age < 18) {
                    const hasParentFields = formData.parentName?.trim() !== '' &&
                        formData.parentEmail?.trim() !== '' &&
                        formData.parentPhone?.trim() !== '';
                    
                    const isParentEmailValid = formData.parentEmail ? isValidEmail(formData.parentEmail) : false;
                    const isParentPhoneValid = formData.parentPhone ? isValidPhoneNumber(formData.parentPhone) : false;
                    
                    return hasBasicFields && isEmailValid && hasParentFields && isParentEmailValid && isParentPhoneValid;
                }
                
                if (formData.requestType === 'other') {
                    const hasRequesterFields = formData.requesterName?.trim() !== '' &&
                        formData.requesterEmail?.trim() !== '' &&
                        formData.relationship?.trim() !== '';
                    
                    const isRequesterEmailValid = formData.requesterEmail ? isValidEmail(formData.requesterEmail) : false;
                    
                    return hasBasicFields && isEmailValid && hasRequesterFields && isRequesterEmailValid;
                }
                
                return hasBasicFields && isEmailValid;

            case 'subject-selection':
                if (formData.subject === 'Programming' || formData.subject === 'Programmeren') {
                    // For programming subjects, require a programming language
                    if (!formData.programmingLanguage) return false;
                    if (formData.programmingLanguage === 'other') {
                        return formData.programmingLanguage.length >= MIN_SUBJECT_LENGTH;
                    }
                    return true;
                }
                
                if (formData.subject === 'other') {
                    return formData.subject.length >= MIN_SUBJECT_LENGTH;
                }
                
                return formData.subject.trim() !== '';

            case 'goals':
                return formData.goals.trim().length >= MIN_GOALS_LENGTH;

            case 'schedule':
                const hasPreferredTimes = formData.preferredDays.length > 0 && formData.preferredTimes.length > 0;
                const noConflicts = formData.preferredDays.every(day => !formData.unavailableDays.includes(day));
                return hasPreferredTimes && noConflicts;

            case 'location':
                return formData.isOnline !== undefined;

            case 'confirmation':
                return true;

            default:
                return true;
        }
    };

    const handleBackClick = () => {
        if (step === 'personal-details') {
            setShowBackConfirmation(true);
        } else {
            onBack();
        }
    };

    const handleNext = () => {
        if (canProceed()) {
            onNext();
        }
    };

    const handleSubmitForm = async () => {
        try {
            if (step === 'confirmation') {
                onNext();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const stepContent = (() => {
        switch (step) {
            case 'info':
                return <InfoSection onBack={handleBackClick} onRequestLesson={onNext} />;
            case 'personal-details':
                return <PersonalDetails formData={formData} onUpdate={onUpdateFormData} />;
            case 'subject-selection':
                return <SubjectSelection formData={formData} onUpdate={onUpdateFormData} />;
            case 'goals':
                return <GoalsSection formData={formData} onUpdate={onUpdateFormData} />;
            case 'schedule':
                return <ScheduleSelection formData={formData} onUpdate={onUpdateFormData} />;
            case 'location':
                return <LocationChoice formData={formData} onUpdate={onUpdateFormData} />;
            case 'confirmation':
                return <Confirmation formData={formData} />;
            default:
                return null;
        }
    })();

    return (
        <>
            <m.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
            >
                {stepContent}
                {step !== 'info' && (
                    <NavigationButtons 
                        onBack={handleBackClick}
                        onNext={handleNext}
                        isFirst={step === 'personal-details'}
                        isLast={step === 'confirmation'}
                        disabled={!canProceed()}
                    />
                )}
            </m.div>

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