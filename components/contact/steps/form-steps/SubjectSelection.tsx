'use client';

import React, { useReducer } from 'react';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/hooks/useLanguage';
import { m, AnimatePresence } from 'framer-motion';
import { FormData } from '../../Contact';

import { FaEye } from 'react-icons/fa';
import NotesPreviewModal from '../../components/NotesPreviewModal';

interface SubjectSelectionProps {
    formData: FormData;
    onUpdate: (updates: Partial<FormData>) => void;
}

const programmingLanguages = [
    'Python',
    'Java',
    'JavaScript',
    'C++',
    'C#',
    'R',
    'MATLAB',
    'SQL',
    'HTML/CSS',
    'React',
    'other'
];

const subjects = {
    'university': [
        'Calculus',
        'Linear Algebra',
        'Statistics',
        'Probability',
        'Physics',
        'Programming',
        'other'
    ],
    'hbo': [
        'Wiskunde',
        'Statistiek',
        'Natuurkunde',
        'Programmeren',
        'other'
    ],
    'vwo': [
        'Wiskunde A',
        'Wiskunde B',
        'Wiskunde C',
        'Wiskunde D',
        'Natuurkunde',
        'Informatica',
        'other'
    ],
    'havo': [
        'Wiskunde A',
        'Wiskunde B',
        'Natuurkunde',
        'other'
    ],
    'vmbo': [
        'Wiskunde',
        'Natuurkunde/Scheikunde',
        'other'
    ]
};

const MIN_SUBJECT_LENGTH = 2;
const MAX_SUBJECT_LENGTH = 50;

type SubjectNote = {
    subject: string;
    noteUrl: string;
};

const subjectNotes: SubjectNote[] = [
    // University Level
    {
        subject: 'Calculus',
        noteUrl: '/notes/dummy/calculus-example.pdf'
    },
    {
        subject: 'Linear Algebra',
        noteUrl: '/notes/dummy/linear-algebra-example.pdf'
    },
    {
        subject: 'Statistics',
        noteUrl: '/notes/dummy/statistics-example.pdf'
    },
    {
        subject: 'Probability',
        noteUrl: '/notes/dummy/probability-example.pdf'
    },
    {
        subject: 'Physics',
        noteUrl: '/notes/dummy/physics-university-example.pdf'
    },
    // HBO Level
    {
        subject: 'Wiskunde',
        noteUrl: '/notes/dummy/wiskunde-hbo-example.pdf'
    },
    {
        subject: 'Statistiek',
        noteUrl: '/notes/dummy/statistiek-hbo-example.pdf'
    },
    {
        subject: 'Natuurkunde',
        noteUrl: '/notes/dummy/natuurkunde-hbo-example.pdf'
    },
    // VWO Level
    {
        subject: 'Wiskunde A',
        noteUrl: '/notes/dummy/wiskunde-a-vwo-example.pdf'
    },
    {
        subject: 'Wiskunde B',
        noteUrl: '/notes/dummy/wiskunde-b-vwo-example.pdf'
    },
    {
        subject: 'Wiskunde C',
        noteUrl: '/notes/dummy/wiskunde-c-vwo-example.pdf'
    },
    {
        subject: 'Wiskunde D',
        noteUrl: '/notes/dummy/wiskunde-d-vwo-example.pdf'
    },
    {
        subject: 'Natuurkunde',
        noteUrl: '/notes/dummy/natuurkunde-vwo-example.pdf'
    },
    {
        subject: 'Informatica',
        noteUrl: '/notes/dummy/informatica-vwo-example.pdf'
    },
    // Programming Languages
    {
        subject: 'Python',
        noteUrl: '/notes/dummy/python-example.pdf'
    },
    {
        subject: 'Java',
        noteUrl: '/notes/dummy/java-example.pdf'
    },
    {
        subject: 'JavaScript',
        noteUrl: '/notes/dummy/javascript-example.pdf'
    },
    {
        subject: 'C++',
        noteUrl: '/notes/dummy/cpp-example.pdf'
    },
    {
        subject: 'C#',
        noteUrl: '/notes/dummy/csharp-example.pdf'
    },
    {
        subject: 'R',
        noteUrl: '/notes/dummy/r-example.pdf'
    },
    {
        subject: 'MATLAB',
        noteUrl: '/notes/dummy/matlab-example.pdf'
    },
    {
        subject: 'SQL',
        noteUrl: '/notes/dummy/sql-example.pdf'
    },
    {
        subject: 'HTML/CSS',
        noteUrl: '/notes/dummy/html-css-example.pdf'
    },
    {
        subject: 'React',
        noteUrl: '/notes/dummy/react-example.pdf'
    }
];

type SubjectState = { showOtherInput: boolean; otherSubject: string; otherInputError: string | null; showProgrammingLanguages: boolean; selectedNote: SubjectNote | null };

function subjectReducer(state: SubjectState, action: { type: string; payload?: unknown }): SubjectState {
    switch (action.type) {
        case 'OTHER_INPUT': return { ...state, showOtherInput: (action.payload as boolean) ?? !state.showOtherInput };
        case 'OTHER_SUBJECT': return { ...state, otherSubject: (action.payload as string) ?? '' };
        case 'OTHER_ERROR': return { ...state, otherInputError: (action.payload as string | null) ?? null };
        case 'PROGRAMMING': return { ...state, showProgrammingLanguages: (action.payload as boolean) ?? !state.showProgrammingLanguages };
        case 'NOTE': return { ...state, selectedNote: (action.payload as SubjectNote | null) ?? null };
        default: return state;
    }
}

const SubjectSelection = ({ formData, onUpdate }: SubjectSelectionProps) => {
    const language = useLanguage();
    const isNl = language === 'NL';
    const t = useTranslations('contact');
    const [state, dispatch] = useReducer(subjectReducer, {
        showOtherInput: false,
        otherSubject: '',
        otherInputError: null,
        showProgrammingLanguages: false,
        selectedNote: null,
    });
    const { showOtherInput, otherSubject, otherInputError, showProgrammingLanguages, selectedNote } = state;
    const availableSubjects = subjects[formData.level as keyof typeof subjects] || [];

    const handleSubjectSelect = (subject: string) => {
        if (subject === 'other') {
            dispatch({ type: 'OTHER_INPUT', payload: true });
            dispatch({ type: 'PROGRAMMING', payload: false });
            onUpdate({ subject: '', programmingLanguage: undefined });
        } else if (subject === 'Programming' || subject === 'Programmeren') {
            dispatch({ type: 'OTHER_INPUT', payload: false });
            dispatch({ type: 'PROGRAMMING', payload: true });
            onUpdate({ subject, programmingLanguage: undefined });
        } else {
            dispatch({ type: 'OTHER_INPUT', payload: false });
            dispatch({ type: 'PROGRAMMING', payload: false });
            onUpdate({ subject, programmingLanguage: undefined });
        }
    };

    const handleProgrammingLanguageSelect = (language: string) => {
        if (language === 'other') {
            dispatch({ type: 'OTHER_INPUT', payload: true });
            onUpdate({ programmingLanguage: '' });
        } else {
            dispatch({ type: 'OTHER_INPUT', payload: false });
            onUpdate({ programmingLanguage: language });
        }
    };

    const handleOtherInput = (value: string) => {
        dispatch({ type: 'OTHER_SUBJECT', payload: value });
        if (value.length < MIN_SUBJECT_LENGTH) {
            dispatch({ type: 'OTHER_ERROR', payload: isNl ? `Vak moet minimaal ${MIN_SUBJECT_LENGTH} tekens lang zijn` : `Subject must be at least ${MIN_SUBJECT_LENGTH} characters long` });
        } else if (value.length > MAX_SUBJECT_LENGTH) {
            dispatch({ type: 'OTHER_ERROR', payload: isNl ? `Vak mag niet langer zijn dan ${MAX_SUBJECT_LENGTH} tekens` : `Subject cannot be longer than ${MAX_SUBJECT_LENGTH} characters` });
        } else {
            dispatch({ type: 'OTHER_ERROR', payload: null });
            if (showProgrammingLanguages) {
                onUpdate({ programmingLanguage: value });
            } else {
                onUpdate({ subject: value });
            }
        }
    };

    const handlePreviewNotes = (subject: string) => {
        const note = subjectNotes.find(n => n.subject === subject);
        dispatch({ type: 'NOTE', payload: note ?? null });
    };

    const renderSubjectButton = (subject: string) => (
        <div key={subject} className="relative">
            <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSubjectSelect(subject)}
                className={`w-full p-4 rounded-lg border-2 transition-colors ${
                    formData.subject === subject
                        ? 'bg-[var(--amber)] text-[var(--ink)] border-[var(--amber)]'
                        : 'bg-[var(--ink-light)] text-white border-[var(--ink-light)] hover:border-[var(--amber)]'
                }`}
            >
                {subject === 'other' 
                    ? t('form.otherSubject')
                    : subject
                }
            </m.button>
            {subjectNotes.some(note => note.subject === subject) && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();  // Prevent triggering the subject selection
                        handlePreviewNotes(subject);
                    }}
                    className="absolute top-2 right-2 p-2 bg-[var(--ink)] rounded-full text-[var(--amber)] hover:text-[var(--amber)] hover:bg-[var(--ink-light)] transition-colors"
                    title={t('form.previewNotes')}
                >
                    <FaEye className="w-4 h-4" />
                </button>
            )}
        </div>
    );

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white text-center">
                {(isNl ? showProgrammingLanguages ? "Kies Programmeertaal" : "Kies een Vak" : showProgrammingLanguages ? "Choose Programming Language" : "Choose Your Subject")}
            </h2>
            
            <p className="text-[var(--amber)] text-center">
                {(isNl ? showProgrammingLanguages
                        ? "Selecteer een programmeertaal om door te gaan"
                        : "Selecteer een vak om door te gaan" : showProgrammingLanguages 
                        ? "Select a programming language to continue"
                        : "Select a subject to continue")}
            </p>

            <AnimatePresence mode="wait">
                {!showProgrammingLanguages ? (
                    <m.div
                        key="subjects"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {availableSubjects.map(subject => renderSubjectButton(subject))}
                    </m.div>
                ) : (
                    <m.div
                        key="programming-languages"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {programmingLanguages.map((language) => (
                            <m.button
                                key={language}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleProgrammingLanguageSelect(language)}
                                className={`p-4 rounded-lg border-2 transition-colors ${
                                    (language === 'other' ? showOtherInput : formData.programmingLanguage === language)
                                        ? 'bg-[var(--amber)] text-[var(--ink)] border-[var(--amber)]'
                                        : 'bg-[var(--ink-light)] text-white border-[var(--ink-light)] hover:border-[var(--amber)]'
                                }`}
                            >
                                {language === 'other'
                                    ? t('form.otherLanguage')
                                    : language
                                }
                            </m.button>
                        ))}
                    </m.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showOtherInput && (
                    <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                    >
                        <label className="block text-[var(--amber)]">
                            {(isNl ? showProgrammingLanguages
                                    ? "Specificeer de programmeertaal"
                                    : "Specificeer het vak" : showProgrammingLanguages 
                                    ? "Please specify the programming language"
                                    : "Please specify the subject")}
                        </label>
                        <input
                            type="text"
                            value={otherSubject}
                            onChange={(e) => handleOtherInput(e.target.value)}
                            className={`w-full p-3 rounded-lg bg-[var(--ink-light)] text-white border ${
                                otherInputError ? 'border-destructive' : 'border-[var(--ink-light)]'
                            } focus:border-[var(--amber)] focus:outline-none`}
                            placeholder={(isNl ? showProgrammingLanguages
                                    ? "Voer de programmeertaal in"
                                    : "Voer de naam van het vak in" : showProgrammingLanguages
                                    ? "Enter the programming language"
                                    : "Enter the subject name")}
                            maxLength={MAX_SUBJECT_LENGTH}
                        />
                        {otherInputError && (
                            <m.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-destructive text-sm"
                            >
                                {otherInputError}
                            </m.p>
                        )}
                    </m.div>
                )}
            </AnimatePresence>

            <NotesPreviewModal
                isOpen={!!selectedNote}
                onClose={() => dispatch({ type: 'NOTE', payload: null })}
                subject={selectedNote?.subject || ''}
                noteUrl={selectedNote?.noteUrl || ''}
            />
        </div>
    );
};

export default SubjectSelection;