import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { FeedbackForm, Language, welcomeScreenData } from '../../data';
import { useLanguage } from '@/contexts/LanguageContext';
import FadeInText from './FadeInText';
import LanguageSelector from './LanguageSelector';
import FormTypeSelector from './FormTypeSelector';
import QuestionComponent from './QuestionComponent';
import SubmitCTA from './SubmitCTA';
import PersonalIntermezzoComponent from './PersonalIntermezzo';
import FarewellScreen from './FarewellScreen';
import NavigationButtons from './NavigationButtons';

export const FeedbackSystem: React.FC<{ longVersion: FeedbackForm; shortVersion: FeedbackForm }> = ({ longVersion, shortVersion }) => {
    const [currentStep, setCurrentStep] = useState(-2);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const { t } = useTranslation();
    const { language, setLanguage } = useLanguage();
    const [selectedForm, setSelectedForm] = useState<FeedbackForm | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [direction, setDirection] = useState(0);
    const [selectedVak, setSelectedVak] = useState<string | null>(null);
    const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);

    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState<number | "auto">("auto");

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.offsetHeight);
        }
    }, [currentStep, currentQuestionIndex, selectedForm]);

    

    const handleChange = (id: string, value: any) => {
        setFormData((prev) => {
            const newFormData = { ...prev, [id]: value };
            setIsQuestionAnswered(value !== '' && value !== undefined);
            return newFormData;
        });
    };

    const handleFormTypeSelect = (type: 'short' | 'long') => {
        setSelectedForm(type === 'short' ? shortVersion : longVersion);
        setCurrentStep(0);
    };

    const handleLanguageSelect = (lang: Language) => {
        setLanguage(lang);
        setCurrentStep(-1);
    };

    const handleSubmit = () => {
        const feedbackData = {
            id: `feedback_${Date.now()}`,
            timestamp: new Date().toISOString(),
            language: language,
            formType: selectedForm === longVersion ? 'long' : 'short',
            generalInfo: {
                learnerName: formData.learnerName,
                subjects: formData.subject
            },
            ratings: {
                overallQuality: formData.overallQuality,
                expectationsMet: formData.expectationsMet,
                clarity: formData.clarity,
                effectiveness: formData.effectiveness,
                interaction: formData.interaction,
                accessibility: formData.accessibility
            },
            openFeedback: {
                mostValuable: formData.mostValuable,
                improvements: formData.improvements,
                suggestions: formData.suggestions
            },
            quote: {
                text: formData.quoteText,
                consentGiven: formData.quoteConsent === 'yes',
                nameUsage: formData.nameConsent
            }
        };

        try {
            const existingData = localStorage.getItem('feedbackData');
            let allFeedback = existingData ? JSON.parse(existingData) : [];
            allFeedback.push(feedbackData);
            localStorage.setItem('feedbackData', JSON.stringify(allFeedback));
            console.log(`Feedback saved to localStorage. Total entries: ${allFeedback.length}`);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error saving feedback:', error);
        }
    };

    const currentSection = selectedForm?.sections[currentStep];
    const currentQuestion = currentSection && 'questions' in currentSection ? currentSection.questions[currentQuestionIndex] : null;

    const nextStep = () => {
        if (!isQuestionAnswered && currentQuestion) {
            alert(t('Please answer the current question before proceeding.'));
            return;
        }

        setDirection(1);
        if (currentSection && 'questions' in currentSection && currentQuestionIndex < currentSection.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (currentStep < (selectedForm?.sections.length || 0) - 1) {
            setCurrentStep(currentStep + 1);
            setCurrentQuestionIndex(0);
        } else {
            handleSubmit();
        }
        setIsQuestionAnswered(false);
    };

    const previousStep = () => {
        setDirection(-1);
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setCurrentQuestionIndex(0);
        }
    };

    const handleSwipe = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > 100) {
            previousStep();
        } else if (info.offset.x < -100) {
            nextStep();
        }
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const isLastStep = selectedForm && currentStep === selectedForm.sections.length - 1 &&
        (!currentSection || !('questions' in currentSection) || currentQuestionIndex === currentSection.questions.length - 1);

    const renderContent = () => {
        switch (currentStep) {
            case -2:
                return <LanguageSelector onSelectLanguage={handleLanguageSelect} />
            case -1:
                return <FormTypeSelector onSelectFormType={handleFormTypeSelect} />;
            default:
                if (selectedForm) {
                    if (currentSection && 'questions' in currentSection) {
                        return (
                            <>
                                <h2 className="text-2xl font-semibold mb-4 text-white">{t(currentSection.title)}</h2>
                                {currentQuestion && (
                                    <QuestionComponent
                                        key={currentQuestion.id}
                                        question={currentQuestion}
                                        onChange={handleChange}
                                        value={formData[currentQuestion.id]}
                                        onNext={nextStep}
                                        formData={formData}
                                        setIsQuestionAnswered={setIsQuestionAnswered}
                                    />
                                )}
                            </>
                        );
                    } else if (currentSection && 'content' in currentSection) {
                        return <PersonalIntermezzoComponent intermezzo={currentSection} />;
                    }
                }
                return null;
        }
    };

    // Handle Enter key to move to the next step
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                nextStep();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [nextStep, isQuestionAnswered, currentQuestion]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-yellow-400 flex flex-col justify-center items-center p-8">
            <AnimatePresence custom={direction} mode="wait">
                {isSubmitted ? (
                    <FarewellScreen key="farewell" onClose={() => {
                        setIsSubmitted(false);
                        setCurrentStep(-2);
                        setSelectedForm(null);
                        setFormData({});
                        setSelectedVak(null);
                    }} />
                ) : (
                    <motion.div
                        key={`${currentStep}-${currentQuestionIndex}`}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                            height: { duration: 0.5, ease: "easeInOut" }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleSwipe}
                        className="w-full max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 overflow-hidden"
                        style={{ height: contentHeight }}
                    >
                        <h1 className="text-3xl font-bold text-white mb-6">
                            {currentStep != -2 && <FadeInText text={t(selectedForm ? selectedForm.title : welcomeScreenData.lengthSelection.title)} />}
                        </h1>
                        {renderContent()}
                        {isLastStep && <SubmitCTA onSubmit={handleSubmit} />}
                    </motion.div>
                )}
            </AnimatePresence>

            {currentStep >= 0 && selectedForm && !isLastStep && (
                <NavigationButtons
                    onPrevious={previousStep}
                    onNext={nextStep}
                    isNextDisabled={!isQuestionAnswered && currentQuestion !== null}
                />
            )}
        </div>
    );
};

export default FeedbackSystem;
