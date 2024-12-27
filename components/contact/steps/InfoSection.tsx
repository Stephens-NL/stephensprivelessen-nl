'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../../hooks/useTranslation';
import { FaGraduationCap, FaClock, FaEuroSign, FaArrowRight, FaWhatsapp, FaChevronDown, FaChevronUp, FaEye } from 'react-icons/fa';
import NotesPreviewModal from '../components/NotesPreviewModal';

interface InfoSectionProps {
    onBack: () => void;
    onRequestLesson: () => void;
}

interface PricingTier {
    level: string;
    prices: {
        duration: string;
        price: string;
    }[];
}

const pricingTiers: PricingTier[] = [
    {
        level: "Hoger Onderwijs",
        prices: [
            { duration: "1 uur", price: "€80" },
            { duration: "2 uren", price: "€135" },
            { duration: "4 uren", price: "€250" },
        ]
    },
    {
        level: "Voortgezet Onderwijs (20+)",
        prices: [
            { duration: "1 uur", price: "€75" },
            { duration: "2 uren", price: "€130" },
            { duration: "4 uren", price: "€230" },
        ]
    },
    {
        level: "Voortgezet Onderwijs (20-)",
        prices: [
            { duration: "1 uur", price: "€60" },
            { duration: "2 uren", price: "€100" },
            { duration: "4 uren", price: "€200" },
        ]
    }
];

const PricingTable = ({ tier }: { tier: PricingTier }) => {
    const { t } = useTranslation();
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-600/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30"
        >
            <h4 className="text-xl font-semibold text-yellow-300 mb-4">
                {String(t({ EN: tier.level, NL: tier.level }))}
            </h4>
            <div className="space-y-3">
                {tier.prices.map((price, idx) => (
                    <div 
                        key={idx} 
                        className="flex justify-between items-center py-2 border-b border-blue-600/50 last:border-0"
                    >
                        <span className="text-yellow-100 font-medium">{price.duration}</span>
                        <span className="text-yellow-300 font-semibold text-lg">{price.price}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

type SubjectNote = {
    subject: string;
    noteUrl: string;
};

const subjectNotes: SubjectNote[] = [
    // University Level
    {
        subject: 'Calculus',
        noteUrl: '/notes/dummy/ANOVA1.pdf'  // Math-related content
    },
    {
        subject: 'Linear Algebra',
        noteUrl: '/notes/dummy/sparseModels.pdf'  // Math-related content
    },
    {
        subject: 'Statistics',
        noteUrl: '/notes/dummy/plotexample.pdf'  // Statistics visualization
    },
    {
        subject: 'Probability',
        noteUrl: '/notes/dummy/period1-tutorial4.pdf'  // Tutorial content
    },
    {
        subject: 'Physics',
        noteUrl: '/notes/dummy/grid.pdf'  // Technical content
    },
    // HBO Level
    {
        subject: 'Wiskunde',
        noteUrl: '/notes/dummy/tentamen-16-december-2014-antwoorden.pdf'  // Math exam
    },
    {
        subject: 'Statistiek',
        noteUrl: '/notes/dummy/Hand-in3.pdf'  // Assignment content
    },
    {
        subject: 'Natuurkunde',
        noteUrl: '/notes/dummy/ABC-REGEL SEM.pdf'  // Physics content
    },
    // VWO Level
    {
        subject: 'Wiskunde A',
        noteUrl: '/notes/dummy/gr11_hal_h04_oefentoets.pdf'  // Math practice test
    },
    {
        subject: 'Wiskunde B',
        noteUrl: '/notes/dummy/MIMI_1.pdf'  // Math content
    },
    // Programming
    {
        subject: 'Python',
        noteUrl: '/notes/dummy/Caspar.pdf'
    },
    {
        subject: 'JavaScript',
        noteUrl: '/notes/dummy/Create Next App.pdf'  // Web development
    },
    {
        subject: 'React',
        noteUrl: '/notes/dummy/1014.pdf'  // Web framework
    }
];

const InfoSection = ({ onBack, onRequestLesson }: InfoSectionProps) => {
    const { t } = useTranslation();
    const [showPricing, setShowPricing] = useState(false);
    const [showCourses, setShowCourses] = useState(false);
    const [selectedNote, setSelectedNote] = useState<SubjectNote | null>(null);
    const whatsappLink = `https://wa.me/+31612345678`; // Vervang met je echte WhatsApp nummer

    const handlePreviewNotes = (subject: string) => {
        const note = subjectNotes.find(n => n.subject === subject);
        if (note) {
            setSelectedNote(note);
        }
    };

    const renderEducationLevel = (title: string, subjects: string[]) => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
        >
            <h4 className="text-lg font-semibold text-yellow-300">{title}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {subjects.map(subject => (
                    <div 
                        key={subject}
                        className="flex items-center justify-between bg-blue-600/30 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30"
                    >
                        <span className="text-white">{subject}</span>
                        {subjectNotes.some(note => note.subject === subject) && (
                            <button
                                onClick={() => handlePreviewNotes(subject)}
                                className="p-1.5 text-yellow-300 hover:text-yellow-400 hover:bg-blue-600/50 rounded-full transition-colors"
                                title={String(t({
                                    EN: "Preview Notes",
                                    NL: "Bekijk Notities"
                                }))}
                            >
                                <FaEye className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-blue-700 p-6 rounded-lg"
            >
                <div className="flex items-center justify-between text-yellow-300 mb-3">
                    <div className="flex items-center">
                        <FaGraduationCap className="text-2xl mr-3" />
                        <h3 className="text-lg font-semibold">
                            {String(t({ EN: "Available Courses", NL: "Beschikbare Vakken" }))}
                        </h3>
                    </div>
                    <button
                        onClick={() => setShowCourses(!showCourses)}
                        className="text-yellow-300 hover:text-yellow-400"
                    >
                        {showCourses ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>
                <AnimatePresence>
                    {showCourses && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-6 overflow-hidden"
                        >
                            {renderEducationLevel(
                                String(t({ EN: "University Level", NL: "Universitair Niveau" })),
                                ['Calculus', 'Linear Algebra', 'Statistics', 'Probability', 'Physics']
                            )}
                            {renderEducationLevel(
                                String(t({ EN: "HBO Level", NL: "HBO Niveau" })),
                                ['Wiskunde', 'Statistiek', 'Natuurkunde']
                            )}
                            {renderEducationLevel(
                                String(t({ EN: "VWO Level", NL: "VWO Niveau" })),
                                ['Wiskunde A', 'Wiskunde B', 'Wiskunde C', 'Wiskunde D', 'Natuurkunde', 'Informatica']
                            )}
                            {renderEducationLevel(
                                String(t({ EN: "Programming", NL: "Programmeren" })),
                                ['Python', 'Java', 'JavaScript', 'C++', 'C#', 'R', 'MATLAB', 'SQL', 'HTML/CSS', 'React']
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-blue-700 p-6 rounded-lg"
            >
                <div className="flex items-center text-yellow-300 mb-3">
                    <FaGraduationCap className="text-2xl mr-3" />
                    <h3 className="text-lg font-semibold">
                        {String(t({ EN: "Teaching Method", NL: "Lesmethode" }))}
                    </h3>
                </div>
                <p className="text-yellow-100">
                    {String(t({
                        EN: "I focus on understanding rather than memorization. We'll work together to build a strong foundation in the subject, using practical examples and clear explanations.",
                        NL: "Ik focus op begrip in plaats van uit het hoofd leren. We werken samen aan een sterke basis in het vak, met praktische voorbeelden en heldere uitleg."
                    }))}
                </p>
            </motion.div>

            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-blue-700 p-6 rounded-lg"
            >
                <div className="flex items-center text-yellow-300 mb-3">
                    <FaClock className="text-2xl mr-3" />
                    <h3 className="text-lg font-semibold">
                        {String(t({ EN: "Lesson Structure", NL: "Lesstructuur" }))}
                    </h3>
                </div>
                <p className="text-yellow-100">
                    {String(t({
                        EN: "Lessons are typically 1-2 hours long, scheduled at your convenience. We start with a free 30-minute trial lesson to assess your needs and goals.",
                        NL: "Lessen duren meestal 1-2 uur, ingepland op tijden die jou uitkomen. We beginnen met een gratis proefles van 30 minuten om je behoeften en doelen te bespreken."
                    }))}
                </p>
            </motion.div>

            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-blue-700 p-6 rounded-lg"
            >
                <div className="flex items-center justify-between text-yellow-300 mb-3">
                    <div className="flex items-center">
                        <FaEuroSign className="text-2xl mr-3" />
                        <h3 className="text-lg font-semibold">
                            {String(t({ EN: "Pricing", NL: "Tarieven" }))}
                        </h3>
                    </div>
                    <button
                        onClick={() => setShowPricing(!showPricing)}
                        className="text-yellow-300 hover:text-yellow-400"
                    >
                        {showPricing ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>
                <p className="text-yellow-100">
                    {String(t({
                        EN: "Rates start at €60 per hour. First trial lesson (30 min) is free!",
                        NL: "Tarieven vanaf €60 per uur. Eerste proefles (30 min) is gratis!"
                    }))}
                </p>

                <AnimatePresence>
                    {showPricing && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-6 space-y-6"
                        >
                            {pricingTiers.map((tier, index) => (
                                <PricingTable key={index} tier={tier} />
                            ))}
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm text-yellow-200 text-center mt-4"
                            >
                                {String(t({
                                    EN: "First trial lesson (30 minutes) is always free",
                                    NL: "Eerste proefles (30 minuten) is altijd gratis"
                                }))}
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onBack}
                    className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600"
                >
                    {String(t({
                        EN: "Back",
                        NL: "Terug"
                    }))}
                </motion.button>
                
                <motion.a
                    href="https://wa.me/+31612345678" // Vervang met je WhatsApp nummer
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-400 text-center"
                >
                    {String(t({
                        EN: "WhatsApp",
                        NL: "WhatsApp"
                    }))}
                </motion.a>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onRequestLesson}
                    className="px-6 py-3 bg-yellow-400 text-blue-900 rounded-lg hover:bg-yellow-300"
                >
                    {String(t({
                        EN: "Schedule Trial Lesson",
                        NL: "Plan Proefles"
                    }))}
                </motion.button>
            </div>

            <NotesPreviewModal
                isOpen={!!selectedNote}
                onClose={() => setSelectedNote(null)}
                subject={selectedNote?.subject || ''}
                noteUrl={selectedNote?.noteUrl || ''}
                onScheduleTrial={onRequestLesson}
            />
        </div>
    );
};

export default InfoSection; 