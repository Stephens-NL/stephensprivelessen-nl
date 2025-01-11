'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../../hooks/useTranslation';
import { FaGraduationCap, FaClock, FaEuroSign, FaArrowRight, FaWhatsapp, FaChevronDown, FaChevronUp, FaEye, FaEnvelope } from 'react-icons/fa';
import NotesPreviewModal from '../components/NotesPreviewModal';

interface InfoSectionProps {
    onBack: () => void;
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

const InfoSection = ({ onBack }: InfoSectionProps) => {
    const { t } = useTranslation();
    const [showPricing, setShowPricing] = useState(false);
    const [showCourses, setShowCourses] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [selectedNote, setSelectedNote] = useState<SubjectNote | null>(null);
    const whatsappLink = `https://wa.me/+31612345678`; // Vervang met je echte WhatsApp nummer
    const emailLink = `mailto:info@stephensprivelessen.nl`; // Replace with your actual email

    const educationLevels = [
        {
            id: 'primair',
            title: t({ EN: "Primary Education", NL: "Primair Onderwijs" }),
            subjects: [
                'Rekenen', 'Taal', 'Begrijpend Lezen', 'Spelling',
                'Technisch Lezen', 'Studievaardigheden'
            ]
        },
        {
            id: 'voortgezet',
            title: t({ EN: "Secondary Education", NL: "Voortgezet Onderwijs" }),
            subjects: [
                'Wiskunde A/B/C/D', 'Natuurkunde', 'Scheikunde', 'Engels',
                'Nederlands', 'Biologie', 'Economie', 'M&O', 'Bedrijfseconomie'
            ]
        },
        {
            id: 'hoger',
            title: t({ EN: "Higher Education", NL: "Hoger Onderwijs" }),
            subjects: [
                'Bedrijfsstatistiek', 'Calculus', 'Economie', 'Statistiek',
                'Kansberekening', 'Lineaire Algebra', 'Verzamelingenleer',
                'Business Analytics', 'Data Analysis', 'Machine Learning'
            ]
        },
        {
            id: 'programming',
            title: t({ EN: "Programming", NL: "Programmeren" }),
            subjects: [
                'C', 'C#', 'C++', 'CSS', 'HTML', 'Java', 'Javascript',
                'MATLAB', 'Python', 'R', 'React', 'SPSS', 'SQL'
            ]
        }
    ];

    // Personal communication note
    const communicationNote = t({
        EN: "I prefer to keep communication personal and direct through WhatsApp or email. This allows me to give you my full attention and provide the best possible support for your learning journey.",
        NL: "Ik houd de communicatie graag persoonlijk en direct via WhatsApp of email. Zo kan ik je mijn volledige aandacht geven en de beste ondersteuning bieden voor je leertraject."
    });

    const handlePreviewNotes = (subject: string) => {
        const note = subjectNotes.find(n => n.subject === subject);
        if (note) {
            setSelectedNote(note);
        }
    };

    const renderSubjects = (subjects: string[], levelId: string) => {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-6"
            >
                {subjects.map(subject => (
                    <div 
                        key={subject}
                        className="group relative flex items-center bg-blue-700/40 hover:bg-blue-600/50 rounded-xl p-3 transition-all duration-200 border border-blue-500/30 hover:border-blue-400/50"
                    >
                        <span className="text-yellow-100 group-hover:text-yellow-200 font-medium transition-colors">
                            {subject}
                        </span>
                        {subjectNotes.some(note => note.subject === subject) && (
                            <button
                                onClick={() => handlePreviewNotes(subject)}
                                className="ml-auto p-2 text-yellow-300 hover:text-yellow-400 hover:bg-blue-600/50 rounded-lg transition-all duration-200"
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
            </motion.div>
        );
    };

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-blue-700 p-6 rounded-lg"
            >
                <div className="flex items-center justify-between text-yellow-300 mb-6">
                    <div className="flex items-center">
                        <FaGraduationCap className="text-2xl mr-3" />
                        <h3 className="text-xl font-semibold">
                            {String(t({ EN: "Available Courses", NL: "Beschikbare Vakken" }))}
                        </h3>
                    </div>
                </div>
                
                <div className="relative">
                    <select
                        value={selectedLevel || ''}
                        onChange={(e) => setSelectedLevel(e.target.value || null)}
                        className="w-full bg-blue-600/30 text-yellow-100 rounded-xl py-3 px-4 appearance-none cursor-pointer border border-blue-500/30 hover:border-blue-400/50 transition-colors focus:outline-none focus:border-yellow-300"
                    >
                        <option value="">
                            {String(t({
                                EN: "Select Education Level",
                                NL: "Kies Onderwijsniveau"
                            }))}
                        </option>
                        {educationLevels.map(level => (
                            <option key={level.id} value={level.id}>
                                {String(level.title)}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-yellow-300">
                        <FaChevronDown />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {selectedLevel && (
                        renderSubjects(
                            educationLevels.find(level => level.id === selectedLevel)?.subjects || [],
                            selectedLevel
                        )
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 bg-blue-600/30 rounded-xl border border-blue-500/30"
                >
                    <p className="text-yellow-100 text-sm">
                        {String(t({
                            EN: "I also provide thesis assistance including proofreading, data analysis, and statistical support for bachelor's and master's theses.",
                            NL: "Ik bied ook ondersteuning bij scripties, waaronder proeflezen, data-analyse en statistische ondersteuning voor bachelor- en masterscripties."
                        }))}
                    </p>
                </motion.div>
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

            <div className="flex flex-col items-center max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto mb-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onBack}
                        className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 w-full sm:w-auto"
                    >
                        {String(t({
                            EN: "Back",
                            NL: "Terug"
                        }))}
                    </motion.button>
                    
                    <motion.a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full sm:w-auto min-w-[200px]"
                    >
                        <FaWhatsapp className="mr-2" />
                        {String(t({
                            EN: "Contact via WhatsApp",
                            NL: "Contact via WhatsApp"
                        }))}
                    </motion.a>

                    <motion.a
                        href={emailLink}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full sm:w-auto min-w-[200px]"
                    >
                        <FaEnvelope className="mr-2" />
                        {String(t({
                            EN: "Contact via Email",
                            NL: "Contact via Email"
                        }))}
                    </motion.a>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-yellow-100 text-sm italic max-w-2xl text-center px-4"
                >
                    {String(communicationNote)}
                </motion.div>
            </div>

            <NotesPreviewModal
                isOpen={!!selectedNote}
                onClose={() => setSelectedNote(null)}
                subject={selectedNote?.subject || ''}
                noteUrl={selectedNote?.noteUrl || ''}
            />
        </div>
    );
};

export default InfoSection; 