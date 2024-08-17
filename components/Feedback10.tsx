// component/Feedback10.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { FeedbackForm, QuestionGroup, PersonalIntermezzo, Question, Language, WelcomeScreenData, welcomeScreenData } from '../data';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronRight, ChevronLeft, GraduationCap, Send, Search, Clock, ClipboardList } from 'lucide-react';
import FadeInText from './FadeInText';

const formDescriptions = {
    NL: {
        short: {
            title: "Korte versie",
            description: "2-3 minuten, snelle feedback",
            icon: Clock
        },
        long: {
            title: "Lange versie",
            description: "5-10 minuten, gedetailleerde feedback",
            icon: ClipboardList
        }
    },
    EN: {
        short: {
            title: "Short version",
            description: "2-3 minutes, quick feedback",
            icon: Clock
        },
        long: {
            title: "Long version",
            description: "5-10 minutes, detailed feedback",
            icon: ClipboardList
        }
    }
};

const callToActions = [
    { NL: "Begin je feedback avontuur!", EN: "Start your feedback journey!" },
    { NL: "Deel je gedachten met ons!", EN: "Share your thoughts with us!" },
    { NL: "Jouw mening telt - start nu!", EN: "Your opinion matters - begin now!" },
    { NL: "Help ons verbeteren - geef feedback!", EN: "Help us improve - give feedback!" },
    { NL: "Klaar om je stem te laten horen?", EN: "Ready to make your voice heard?" }
];

const getRandomCallToAction = (language: Language): string => {
    const randomIndex = Math.floor(Math.random() * callToActions.length);
    return callToActions[randomIndex][language];
};

const TypewriterText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 30);

        return () => clearInterval(timer);
    }, [text]);

    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay }}
        >
            {displayedText}
        </motion.span>
    );
};

const CustomCheckbox: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => {
    return (
        <div
            className={`w-8 h-8 flex items-center justify-center border-2 rounded-md cursor-pointer transition-colors duration-300 ${checked ? 'bg-yellow-400 border-yellow-400' : 'bg-white border-gray-400'}`}
            onClick={onChange}
        >
            {checked && <GraduationCap size={24} />}
        </div>
    );
};

const RatingComponent: React.FC<{ value: number; onChange: (value: number) => void; max: number }> = ({ value, onChange, max }) => {
    return (
        <div className="flex space-x-2">
            {[...Array(max)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => onChange(index + 1)}
                    className={`focus:outline-none transition-colors duration-200 ${index < value ? 'text-yellow-400' : 'text-gray-400'}`}
                >
                    <GraduationCap size={32} />
                </button>
            ))}
        </div>
    );
};

const CustomRadio: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => {
    return (
        <div
            className={`w-8 h-8 flex items-center justify-center border-2 rounded-full cursor-pointer transition-colors duration-300 ${checked ? 'bg-yellow-400 border-yellow-400' : 'bg-white border-gray-400'}`}
            onClick={onChange}
        >
            {checked && <GraduationCap size={24} color={checked ? "#1e3a8a" : "#ffffff"} />}
        </div>
    );
};

const QuestionComponent: React.FC<{ question: Question; onChange: (id: string, value: any) => void; value: any; onNext: () => void; formData: Record<string, any> }> = ({ question, onChange, value, onNext, formData }) => {
    const { t } = useTranslation();

    const handleOptionChange = (id: string, optionValue: any) => {
        onChange(id, optionValue);
        if (question.type === 'multipleChoice') {
            setTimeout(onNext, 300);
        }
    };

    const shouldShowQuestion = () => {
        if (question.conditional) {
            const { dependsOn, showIf } = question.conditional;
            const dependentValue = formData[dependsOn];
            return eval(showIf.replace('value', JSON.stringify(dependentValue)));
        }
        return true;
    };

    if (!shouldShowQuestion()) {
        return null;
    }

    switch (question.type) {
        case 'vakkenSelector':
            return (
                <VakkenSelector
                    onChange={(vakken) => onChange(question.id, vakken)}
                    initialValue={value}
                />
            );
        case 'text':
        case 'textarea':
            return (
                <div className="mb-4">
                    <label className="block text-xl font-medium text-white mb-2">{t(question.label)}</label>
                    {question.type === 'text' ? (
                        <input
                            type="text"
                            value={value || ''}
                            className="w-full px-3 py-2 bg-blue-900 bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-white placeholder-opacity-50"
                            onChange={(e) => onChange(question.id, e.target.value)}
                            required={question.required}
                        />
                    ) : (
                        <textarea
                            value={value || ''}
                            className="w-full px-3 py-2 bg-blue-900 bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-white placeholder-opacity-50"
                            onChange={(e) => onChange(question.id, e.target.value)}
                            required={question.required}
                            rows={4}
                        />
                    )}
                </div>
            );
        case 'number':
            return (
                <div className="mb-4">
                    <label className="block text-xl font-medium text-white mb-2">{t(question.label)}</label>
                    <RatingComponent
                        value={value || 0}
                        onChange={(newValue) => onChange(question.id, newValue)}
                        max={question.max || 5}
                    />
                </div>
            );
        case 'multipleChoice':
            return (
                <div className="mb-4">
                    <label className="block text-xl font-medium text-white mb-2">{t(question.label)}</label>
                    {question.options?.map((option) => (
                        <div key={option.value} className="flex items-center mb-2">
                            <CustomRadio
                                checked={value === option.value}
                                onChange={() => handleOptionChange(question.id, option.value)}
                            />
                            <label className="text-white ml-2">{t(option.label)}</label>
                        </div>
                    ))}
                </div>
            );
        default:
            return null;
    }
};

const WelcomeScreen: React.FC<{ data: WelcomeScreenData; onContinue: () => void }> = ({ data, onContinue }) => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full text-center"
        >
            <motion.h1
                className="text-5xl font-bold text-white mb-6"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {t(data.title)}
            </motion.h1>
            <motion.p
                className="text-xl text-white mb-8"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                {t(data.description)}
            </motion.p>
            <motion.button
                onClick={onContinue}
                className="px-8 py-4 bg-white text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {t(data.startButtonText)}
            </motion.button>
        </motion.div>
    );
};

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

    const handleChange = (id: string, value: any) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
        setIsQuestionAnswered(true);
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
                return (
                    <motion.div
                        key="language-selector"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="flex flex-col items-center justify-center h-full"
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">Select Your Language / Kies Je Taal</h2>
                        <LanguageSelector onSelectLanguage={handleLanguageSelect} />
                    </motion.div>
                );
            case -1:
                return (
                    <div className="text-center">
                        {/* <h2 className="text-3xl font-bold text-blue-900 mb-6">{t(welcomeScreenData.lengthSelection.title)}</h2> */}
                        <p className="mb-6 text-xl">{getRandomCallToAction(language)}</p>
                        <p className="mb-6">{t(welcomeScreenData.lengthSelection.description)}</p>
                        <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0 md:space-x-4">
                            {['short', 'long'].map((type) => {
                                const desc = formDescriptions[language][type as keyof typeof formDescriptions[typeof language]];
                                const Icon = desc.icon;
                                return (
                                    <button
                                        key={type}
                                        onClick={() => handleFormTypeSelect(type as 'short' | 'long')}
                                        className="w-full md:w-64 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-left"
                                    >
                                        <div className="flex items-center mb-2">
                                            <Icon className="mr-2 text-blue-900" size={24} />
                                            <h3 className="text-xl font-bold text-blue-900">{desc.title}</h3>
                                        </div>
                                        <p className="text-gray-600">{desc.description}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
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
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleSwipe}
                        className="w-full max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8"
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
                <motion.div
                    className="mt-8 flex justify-center space-x-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <button
                        onClick={previousStep}
                        className="px-6 py-3 bg-white text-blue-900 rounded-full text-lg font-semibold hover:bg-gray-300 transition-colors duration-300 flex items-center"
                    >
                        <ChevronLeft className="mr-2" size={24} />
                        {t(welcomeScreenData.navigation.back)}
                    </button>
                    <button
                        onClick={nextStep}
                        className={`px-8 py-4 bg-white text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300 flex items-center ${!isQuestionAnswered && currentQuestion ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!isQuestionAnswered && currentQuestion}
                    >
                        {t(welcomeScreenData.navigation.next)}
                        <ChevronRight className="ml-2" size={24} />
                    </button>
                </motion.div>
            )}
        </div>
    );
};

const LanguageSelector: React.FC<{ onSelectLanguage: (lang: Language) => void }> = ({ onSelectLanguage }) => (
    <div className="flex justify-center space-x-4">
        <button
            onClick={() => onSelectLanguage('NL')}
            className="px-6 py-3 bg-white text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300"
        >
            Nederlands
        </button>
        <button
            onClick={() => onSelectLanguage('EN')}
            className="px-6 py-3 bg-white text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300"
        >
            English
        </button>
    </div>
);

const VakkenSelector: React.FC<{ onChange: (vakken: string[]) => void; initialValue?: string[] }> = ({ onChange, initialValue = [] }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVakken, setSelectedVakken] = useState<string[]>(initialValue);
    const [customVak, setCustomVak] = useState('');
    const vakken = [
        "Rekenen", "Taal", "Wiskunde A/B/C/D", "Natuurkunde", "Scheikunde", "Engels",
        "Bedrijfsstatistiek", "Calculus", "Economie", "Statistiek", "Kansberekening",
        "Lineaire Algebra", "Verzamelingenleer", "C", "C#", "C++", "CSS", "HTML",
        "Java", "JavaScript", "MATLAB", "Python", "R", "React", "SPSS", "SQL"
    ].sort((a, b) => a.localeCompare(b));

    const filteredVakken = vakken.filter(vak =>
        vak.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleVak = (vak: string) => {
        setSelectedVakken(prev =>
            prev.includes(vak) ? prev.filter(v => v !== vak) : [...prev, vak]
        );
    };

    const handleAddCustomVak = () => {
        if (customVak && !selectedVakken.includes(customVak)) {
            setSelectedVakken(prev => [...prev, customVak]);
            setCustomVak('');
        }
    };

    useEffect(() => {
        onChange(selectedVakken);
    }, [selectedVakken, onChange]);

    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">{t('Kies een of meerdere vakken')}</h2>
            <div className="relative w-full max-w-md mb-4">
                <input
                    type="text"
                    placeholder={t('Zoek een vak')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-white text-blue-900 rounded-md pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900" size={20} />
            </div>
            <div className="grid grid-cols-3 gap-4">
                {filteredVakken.map((vak) => (
                    <button
                        key={vak}
                        onClick={() => handleToggleVak(vak)}
                        className={`px-4 py-2 rounded-md transition-colors duration-300 ${selectedVakken.includes(vak) ? 'bg-yellow-400 text-blue-900' : 'bg-white text-blue-900 hover:bg-yellow-300'}`}
                    >
                        {vak}
                    </button>
                ))}
            </div>
            <div className="flex w-full max-w-md">
                <input
                    type="text"
                    placeholder={t('Anders, namelijk...')}
                    value={customVak}
                    onChange={(e) => setCustomVak(e.target.value)}
                    className="flex-grow px-4 py-2 bg-white text-blue-900 rounded-l-md"
                />
                <button
                    onClick={handleAddCustomVak}
                    className="px-4 py-2 bg-yellow-400 text-blue-900 rounded-r-md hover:bg-yellow-300 transition-colors duration-300"
                >
                    {t('Toevoegen')}
                </button>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
                {selectedVakken.map((vak) => (
                    <div key={vak} className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full flex items-center">
                        {vak}
                        <button onClick={() => handleToggleVak(vak)} className="ml-2 focus:outline-none">
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PersonalIntermezzoComponent: React.FC<{ intermezzo: PersonalIntermezzo }> = ({ intermezzo }) => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white bg-opacity-10 p-6 rounded-md mb-6"
        >
            <h3 className="text-2xl font-semibold mb-4 text-white">{t(intermezzo.title)}</h3>
            <p className="text-white">{t(intermezzo.content)}</p>
        </motion.div>
    );
};

const SubmitCTA: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex flex-col items-center justify-center mt-8"
        >
            <h2 className="text-2xl font-bold text-white mb-4">{t(welcomeScreenData.submitCTA.title)}</h2>
            <p className="text-lg text-white mb-6">{t(welcomeScreenData.submitCTA.description)}</p>
            <motion.button
                onClick={onSubmit}
                className="px-8 py-4 bg-yellow-400 text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {t(welcomeScreenData.submitCTA.buttonText)}
                <Send className="ml-2" size={24} />
            </motion.button>
        </motion.div>
    );
};

const FarewellScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full text-center"
        >
            <motion.h1
                className="text-5xl font-bold text-white mb-6"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {t(welcomeScreenData.farewell.title)}
            </motion.h1>
            <motion.p
                className="text-xl text-white mb-8"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                {t(welcomeScreenData.farewell.message)}
            </motion.p>
            <motion.button
                onClick={onClose}
                className="px-8 py-4 bg-white text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {t(welcomeScreenData.farewell.closeButtonText)}
            </motion.button>
        </motion.div>
    );
};

export default FeedbackSystem;