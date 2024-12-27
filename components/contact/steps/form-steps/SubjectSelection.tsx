'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormData } from '../../Contact';
import { useTranslation } from '../../../../hooks/useTranslation';
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

const SubjectSelection = ({ formData, onUpdate }: SubjectSelectionProps) => {
    const { t } = useTranslation();
    const [showOtherInput, setShowOtherInput] = useState(false);
    const [otherSubject, setOtherSubject] = useState('');
    const [otherInputError, setOtherInputError] = useState<string | null>(null);
    const [showProgrammingLanguages, setShowProgrammingLanguages] = useState(false);
    const availableSubjects = subjects[formData.level as keyof typeof subjects] || [];
    const [selectedNote, setSelectedNote] = useState<SubjectNote | null>(null);

    const handleSubjectSelect = (subject: string) => {
        if (subject === 'other') {
            setShowOtherInput(true);
            setShowProgrammingLanguages(false);
            onUpdate({ subject: '', programmingLanguage: undefined });
        } else if (subject === 'Programming' || subject === 'Programmeren') {
            setShowOtherInput(false);
            setShowProgrammingLanguages(true);
            onUpdate({ subject, programmingLanguage: undefined });
        } else {
            setShowOtherInput(false);
            setShowProgrammingLanguages(false);
            onUpdate({ subject, programmingLanguage: undefined });
        }
    };

    const handleProgrammingLanguageSelect = (language: string) => {
        if (language === 'other') {
            setShowOtherInput(true);
            onUpdate({ programmingLanguage: '' });
        } else {
            setShowOtherInput(false);
            onUpdate({ programmingLanguage: language });
        }
    };

    const handleOtherInput = (value: string) => {
        setOtherSubject(value);
        
        if (value.length < MIN_SUBJECT_LENGTH) {
            setOtherInputError(String(t({
                EN: `Subject must be at least ${MIN_SUBJECT_LENGTH} characters long`,
                NL: `Vak moet minimaal ${MIN_SUBJECT_LENGTH} tekens lang zijn`
            })));
        } else if (value.length > MAX_SUBJECT_LENGTH) {
            setOtherInputError(String(t({
                EN: `Subject cannot be longer than ${MAX_SUBJECT_LENGTH} characters`,
                NL: `Vak mag niet langer zijn dan ${MAX_SUBJECT_LENGTH} tekens`
            })));
        } else {
            setOtherInputError(null);
            if (showProgrammingLanguages) {
                onUpdate({ programmingLanguage: value });
            } else {
                onUpdate({ subject: value });
            }
        }
    };

    const handlePreviewNotes = (subject: string) => {
        console.log('Attempting to preview notes for:', subject);
        const note = subjectNotes.find(n => n.subject === subject);
        if (note) {
            console.log('Found note:', note);
            setSelectedNote(note);
        } else {
            console.log('No notes found for subject:', subject);
        }
    };

    const renderSubjectButton = (subject: string) => (
        <div key={subject} className="relative">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSubjectSelect(subject)}
                className={`w-full p-4 rounded-lg border-2 transition-colors ${
                    formData.subject === subject
                        ? 'bg-yellow-400 text-blue-900 border-yellow-500'
                        : 'bg-blue-700 text-white border-blue-600 hover:border-yellow-400'
                }`}
            >
                {subject === 'other' 
                    ? String(t({
                        EN: "Other Subject",
                        NL: "Ander Vak"
                    }))
                    : subject
                }
            </motion.button>
            {subjectNotes.some(note => note.subject === subject) && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();  // Prevent triggering the subject selection
                        handlePreviewNotes(subject);
                    }}
                    className="absolute top-2 right-2 p-2 bg-blue-800 rounded-full text-yellow-300 hover:text-yellow-400 hover:bg-blue-700 transition-colors"
                    title={String(t({
                        EN: "Preview Notes",
                        NL: "Bekijk Notities"
                    }))}
                >
                    <FaEye className="w-4 h-4" />
                </button>
            )}
        </div>
    );

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white text-center">
                {String(t({
                    EN: showProgrammingLanguages ? "Choose Programming Language" : "Choose Your Subject",
                    NL: showProgrammingLanguages ? "Kies Programmeertaal" : "Kies een Vak"
                }))}
            </h2>
            
            <p className="text-yellow-300 text-center">
                {String(t({
                    EN: showProgrammingLanguages 
                        ? "Select a programming language to continue"
                        : "Select a subject to continue",
                    NL: showProgrammingLanguages
                        ? "Selecteer een programmeertaal om door te gaan"
                        : "Selecteer een vak om door te gaan"
                }))}
            </p>

            <AnimatePresence mode="wait">
                {!showProgrammingLanguages ? (
                    <motion.div
                        key="subjects"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {availableSubjects.map(subject => renderSubjectButton(subject))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="programming-languages"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {programmingLanguages.map((language) => (
                            <motion.button
                                key={language}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleProgrammingLanguageSelect(language)}
                                className={`p-4 rounded-lg border-2 transition-colors ${
                                    (language === 'other' ? showOtherInput : formData.programmingLanguage === language)
                                        ? 'bg-yellow-400 text-blue-900 border-yellow-500'
                                        : 'bg-blue-700 text-white border-blue-600 hover:border-yellow-400'
                                }`}
                            >
                                {language === 'other'
                                    ? String(t({
                                        EN: "Other Language",
                                        NL: "Andere Taal"
                                    }))
                                    : language
                                }
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showOtherInput && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                    >
                        <label className="block text-yellow-300">
                            {String(t({
                                EN: showProgrammingLanguages 
                                    ? "Please specify the programming language"
                                    : "Please specify the subject",
                                NL: showProgrammingLanguages
                                    ? "Specificeer de programmeertaal"
                                    : "Specificeer het vak"
                            }))}
                        </label>
                        <input
                            type="text"
                            value={otherSubject}
                            onChange={(e) => handleOtherInput(e.target.value)}
                            className={`w-full p-3 rounded-lg bg-blue-700 text-white border ${
                                otherInputError ? 'border-red-500' : 'border-blue-600'
                            } focus:border-yellow-400 focus:outline-none`}
                            placeholder={String(t({
                                EN: showProgrammingLanguages
                                    ? "Enter the programming language"
                                    : "Enter the subject name",
                                NL: showProgrammingLanguages
                                    ? "Voer de programmeertaal in"
                                    : "Voer de naam van het vak in"
                            }))}
                            autoFocus
                            maxLength={MAX_SUBJECT_LENGTH}
                        />
                        {otherInputError && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-500 text-sm"
                            >
                                {otherInputError}
                            </motion.p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <NotesPreviewModal
                isOpen={!!selectedNote}
                onClose={() => setSelectedNote(null)}
                subject={selectedNote?.subject || ''}
                noteUrl={selectedNote?.noteUrl || ''}
            />
        </div>
    );
};

export default SubjectSelection;