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

interface GroupPricingTier {
    level: string;
    prices: {
        students: number;
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

const groupPricingTiers: GroupPricingTier[] = [
    {
        level: "Hoger Onderwijs",
        prices: [
            { students: 1, duration: "1 uur", price: "€80" },
            { students: 2, duration: "1 uur", price: "€55" },
            { students: 3, duration: "1,5 uur", price: "€40" },
            { students: 4, duration: "1,5 uur", price: "€35" },
        ]
    },
    {
        level: "Hoger Onderwijs 4-uurs pakket",
        prices: [
            { students: 1, duration: "4 uur", price: "€62,50" },
            { students: 2, duration: "4 uur", price: "€45" },
            { students: 3, duration: "4 uur", price: "€32,50" },
            { students: 4, duration: "4 uur", price: "€27,50" },
        ]
    },
    {
        level: "Middelbare School",
        prices: [
            { students: 1, duration: "1 uur", price: "€60" },
            { students: 2, duration: "1 uur", price: "€40" },
            { students: 3, duration: "1,5 uur", price: "€30" },
            { students: 4, duration: "1,5 uur", price: "€25" },
        ]
    },
    {
        level: "Middelbare School 4-uurs pakket",
        prices: [
            { students: 1, duration: "4 uur", price: "€50" },
            { students: 2, duration: "4 uur", price: "€35" },
            { students: 3, duration: "4 uur", price: "€27,50" },
            { students: 4, duration: "4 uur", price: "€22,50" },
        ]
    }
];

const PricingTable = () => {
    const { t } = useTranslation();
    const [selectedLevel, setSelectedLevel] = useState<'middelbaar' | 'hoger'>('middelbaar');
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-600/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30"
        >
            <div className="flex justify-center mb-4">
                <div className="inline-flex bg-blue-600/20 rounded-xl p-1">
                    <button
                        onClick={() => setSelectedLevel('middelbaar')}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                            selectedLevel === 'middelbaar' 
                                ? 'bg-blue-500/30 text-yellow-300' 
                                : 'text-yellow-100 hover:text-yellow-200'
                        }`}
                    >
                        {String(t({
                            EN: "Secondary Education",
                            NL: "Middelbaar Onderwijs"
                        }))}
                    </button>
                    <button
                        onClick={() => setSelectedLevel('hoger')}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                            selectedLevel === 'hoger' 
                                ? 'bg-blue-500/30 text-yellow-300' 
                                : 'text-yellow-100 hover:text-yellow-200'
                        }`}
                    >
                        {String(t({
                            EN: "Higher Education",
                            NL: "Hoger Onderwijs"
                        }))}
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                    <thead>
                        <tr className="border-b border-blue-600/50">
                            <th className="text-left py-2 text-yellow-100 font-medium">Type</th>
                            {selectedLevel === 'middelbaar' ? (
                                <>
                                    <th className="text-right py-2 text-yellow-100 font-medium">Tot 20 jaar</th>
                                    <th className="text-right py-2 text-yellow-100 font-medium">Vanaf 20 jaar</th>
                                </>
                            ) : (
                                <>
                                    <th className="text-right py-2 text-yellow-100 font-medium">Bachelor</th>
                                    <th className="text-right py-2 text-yellow-100 font-medium">Master</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { 
                                type: "Losse sessie", 
                                ms20minus: "€60", ms20plus: "€75", 
                                bachelor: "€75", master: "€80" 
                            },
                            { 
                                type: "2 sessies", 
                                ms20minus: "€100", ms20plus: "€130", 
                                bachelor: "€130", master: "€135" 
                            },
                            { 
                                type: "4 sessies", 
                                ms20minus: "€200", ms20plus: "€230", 
                                bachelor: "€230", master: "€250" 
                            },
                        ].map((row) => (
                            <tr key={row.type} className="border-b border-blue-600/50 last:border-0">
                                <td className="py-2 text-yellow-100">{row.type}</td>
                                {selectedLevel === 'middelbaar' ? (
                                    <>
                                        <td className="py-2 text-yellow-300 font-semibold text-right">{row.ms20minus}</td>
                                        <td className="py-2 text-yellow-300 font-semibold text-right">{row.ms20plus}</td>
                                    </>
                                ) : (
                                    <>
                                        <td className="py-2 text-yellow-300 font-semibold text-right">{row.bachelor}</td>
                                        <td className="py-2 text-yellow-300 font-semibold text-right">{row.master}</td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-4 text-sm text-yellow-100 italic">
                {String(t({
                    EN: "4 sessions includes WhatsApp support for quick questions up to a week after each lesson.",
                    NL: "4 sessies inclusief WhatsApp ondersteuning voor korte vragen tot een week na elke les."
                }))}
            </p>
        </motion.div>
    );
};

const GroupPricingTable = () => {
    const { t } = useTranslation();
    const [showExample, setShowExample] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState<'middelbaar' | 'hoger'>('middelbaar');
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-600/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30"
        >
            <div className="flex justify-center mb-4">
                <div className="inline-flex bg-blue-600/20 rounded-xl p-1">
                    <button
                        onClick={() => setSelectedLevel('middelbaar')}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                            selectedLevel === 'middelbaar' 
                                ? 'bg-blue-500/30 text-yellow-300' 
                                : 'text-yellow-100 hover:text-yellow-200'
                        }`}
                    >
                        {String(t({
                            EN: "Secondary Education",
                            NL: "Middelbaar Onderwijs"
                        }))}
                    </button>
                    <button
                        onClick={() => setSelectedLevel('hoger')}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                            selectedLevel === 'hoger' 
                                ? 'bg-blue-500/30 text-yellow-300' 
                                : 'text-yellow-100 hover:text-yellow-200'
                        }`}
                    >
                        {String(t({
                            EN: "Higher Education",
                            NL: "Hoger Onderwijs"
                        }))}
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                    <thead>
                        <tr className="border-b border-blue-600/50">
                            <th className="text-left py-2 text-yellow-100 font-medium">Aantal<br/>leerlingen</th>
                            <th className="text-right py-2 text-yellow-100 font-medium">Losse<br/>sessie<br/>(€/uur p.p.)</th>
                            <th className="text-right py-2 text-yellow-100 font-medium">4 sessies<br/>(€/uur p.p.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4].map((students) => {
                            const regular = groupPricingTiers.find(t => 
                                t.level === (selectedLevel === 'middelbaar' ? "Middelbare School" : "Hoger Onderwijs")
                            )?.prices.find(p => p.students === students)?.price || '';
                            
                            const package4h = groupPricingTiers.find(t => 
                                t.level === (selectedLevel === 'middelbaar' ? "Middelbare School 4-uurs pakket" : "Hoger Onderwijs 4-uurs pakket")
                            )?.prices.find(p => p.students === students)?.price || '';
                            
                            return (
                                <tr key={students} className="border-b border-blue-600/50 last:border-0">
                                    <td className="py-2 text-yellow-100">{students}</td>
                                    <td className="py-2 text-yellow-300 font-semibold text-right">{regular}</td>
                                    <td className="py-2 text-yellow-300 font-semibold text-right">{package4h}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 space-y-2">
                <p className="text-sm text-yellow-100 italic">
                    {String(t({
                        EN: "Tip: For 3 or more students, I recommend 1.5-hour sessions to ensure everyone gets sufficient attention. All prices shown are per hour per student.",
                        NL: "Tip: Voor 3 of meer leerlingen raad ik sessies van 1,5 uur aan voor voldoende persoonlijke aandacht. Alle genoemde tarieven zijn per uur per leerling."
                    }))}
                </p>
                
                <div className="mt-2">
                    <button
                        onClick={() => setShowExample(!showExample)}
                        className="flex items-center text-sm text-yellow-300 hover:text-yellow-200 transition-colors"
                    >
                        {showExample ? <FaChevronUp className="mr-2" /> : <FaChevronDown className="mr-2" />}
                        {String(t({
                            EN: "Show example calculation (1.5-hour session)",
                            NL: "Toon rekenvoorbeeld (1,5 uur sessie)"
                        }))}
                    </button>
                    
                    <AnimatePresence>
                        {showExample && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-2 p-4 bg-blue-600/20 rounded-xl border border-blue-500/30">
                                    <p className="text-sm text-yellow-100 font-medium mb-3">
                                        {String(t({
                                            EN: `Cost comparison for 4 ${selectedLevel === 'middelbaar' ? 'high school' : 'university'} students:`,
                                            NL: `Kostenvergelijking voor 4 ${selectedLevel === 'middelbaar' ? 'middelbare school' : 'universitaire'} studenten:`
                                        }))}
                                    </p>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-yellow-300 font-medium mb-1">
                                                {String(t({
                                                    EN: "Individual 4 sessions:",
                                                    NL: "Individuele 4 sessies:"
                                                }))}
                                            </p>
                                            <ul className="mt-1 space-y-1 text-sm text-yellow-100">
                                                <li>• {String(t({
                                                    EN: `Price per 4 hours: ${selectedLevel === 'middelbaar' ? '€200' : '€250'}`,
                                                    NL: `Prijs per 4 uur: ${selectedLevel === 'middelbaar' ? '€200' : '€250'}`
                                                }))}</li>
                                                <li>• {String(t({
                                                    EN: `For 4 separate students: 4 × ${selectedLevel === 'middelbaar' ? '€200' : '€250'} = ${selectedLevel === 'middelbaar' ? '€800' : '€1000'}`,
                                                    NL: `Voor 4 aparte studenten: 4 × ${selectedLevel === 'middelbaar' ? '€200' : '€250'} = ${selectedLevel === 'middelbaar' ? '€800' : '€1000'}`
                                                }))}</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="text-sm text-yellow-300 font-medium mb-1">
                                                {String(t({
                                                    EN: "Group 4 sessions (4 students together):",
                                                    NL: "Groep 4 sessies (4 studenten samen):"
                                                }))}
                                            </p>
                                            <ul className="mt-1 space-y-1 text-sm text-yellow-100">
                                                <li>• {String(t({
                                                    EN: `Price per person: ${selectedLevel === 'middelbaar' ? '€90' : '€110'} (${selectedLevel === 'middelbaar' ? '€22.50' : '€27.50'}/hour)`,
                                                    NL: `Prijs per persoon: ${selectedLevel === 'middelbaar' ? '€90' : '€110'} (${selectedLevel === 'middelbaar' ? '€22,50' : '€27,50'}/uur)`
                                                }))}</li>
                                                <li>• {String(t({
                                                    EN: `Total for the group: 4 × ${selectedLevel === 'middelbaar' ? '€90' : '€110'} = ${selectedLevel === 'middelbaar' ? '€360' : '€440'}`,
                                                    NL: `Totaal voor de groep: 4 × ${selectedLevel === 'middelbaar' ? '€90' : '€110'} = ${selectedLevel === 'middelbaar' ? '€360' : '€440'}`
                                                }))}</li>
                                                <li className="pt-2 font-medium text-yellow-200">
                                                    {String(t({
                                                        EN: "Total savings:",
                                                        NL: "Totale besparing:"
                                                    }))}
                                                </li>
                                                <li>• {String(t({
                                                    EN: `For the whole group: ${selectedLevel === 'middelbaar' ? '€800' : '€1000'} - ${selectedLevel === 'middelbaar' ? '€360' : '€440'} = ${selectedLevel === 'middelbaar' ? '€440' : '€560'} (${selectedLevel === 'middelbaar' ? '55' : '56'}% cheaper!)`,
                                                    NL: `Voor de hele groep: ${selectedLevel === 'middelbaar' ? '€800' : '€1000'} - ${selectedLevel === 'middelbaar' ? '€360' : '€440'} = ${selectedLevel === 'middelbaar' ? '€440' : '€560'} (${selectedLevel === 'middelbaar' ? '55' : '56'}% goedkoper!)`
                                                }))}</li>
                                                <li>• {String(t({
                                                    EN: `Per person: ${selectedLevel === 'middelbaar' ? '€200' : '€250'} - ${selectedLevel === 'middelbaar' ? '€90' : '€110'} = ${selectedLevel === 'middelbaar' ? '€110' : '€140'} savings each`,
                                                    NL: `Per persoon: ${selectedLevel === 'middelbaar' ? '€200' : '€250'} - ${selectedLevel === 'middelbaar' ? '€90' : '€110'} = ${selectedLevel === 'middelbaar' ? '€110' : '€140'} besparing elk`
                                                }))}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
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
    const [showGroupPricing, setShowGroupPricing] = useState(false);
    const [showThesis, setShowThesis] = useState(false);
    const [showCourses, setShowCourses] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [selectedNote, setSelectedNote] = useState<SubjectNote | null>(null);
    const whatsappLink = `https://wa.me/+31612345678`; // Vervang met je echte WhatsApp nummer
    const emailLink = `mailto:info@stephensprivelessen.nl`; // Replace with your actual email

    const educationLevels = [
        {
            id: 'basis',
            title: t({ EN: "Primary Education", NL: "Basisonderwijs" }),
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
                'Business Analytics', 'Data Analysis', 'Machine Learning',
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
        // Define character limits for different screen sizes
        const characterLimits = {
            base: 12,  // mobile
            sm: 15,    // small screens
            md: 20,    // medium screens
            lg: 25     // large screens
        };

        const shouldAnimate = (subject: string, screenSize: keyof typeof characterLimits) => {
            return subject.length > characterLimits[screenSize];
        };

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {subjects.map((subject, index) => (
                        <motion.div 
                            key={subject}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 0.3,
                                delay: index * 0.05,
                                ease: "easeOut"
                            }}
                            className="group relative flex items-center bg-gradient-to-br from-blue-600/30 to-blue-700/40 backdrop-blur-sm 
                                     hover:from-blue-500/40 hover:to-blue-600/50 rounded-xl transition-all duration-300 
                                     border border-blue-500/30 hover:border-blue-400/50 shadow-lg hover:shadow-xl
                                     transform hover:-translate-y-1 overflow-hidden h-[60px] w-full"
                        >
                            <div className="flex-1 p-4 overflow-hidden">
                                <div className="overflow-hidden">
                                    <motion.span 
                                        className="text-yellow-100 group-hover:text-yellow-200 font-medium transition-colors inline-block whitespace-nowrap"
                                        animate={{
                                            x: [
                                                "0%",
                                                shouldAnimate(subject, 'lg') ? "0%" : "0%",
                                                shouldAnimate(subject, 'lg') ? "-25%" : "0%",
                                                shouldAnimate(subject, 'lg') ? "-25%" : "0%",
                                                "0%"
                                            ]
                                        }}
                                        transition={{
                                            duration: shouldAnimate(subject, 'lg') ? 6 : 0,
                                            times: [0, 0.3, 0.5, 0.8, 1],
                                            ease: "linear",
                                            repeat: shouldAnimate(subject, 'lg') ? Infinity : 0,
                                            repeatDelay: 0.5
                                        }}
                                    >
                                        <span className="lg:hidden">
                                            {shouldAnimate(subject, 'base') 
                                                ? `${subject.slice(0, characterLimits.base)}...` 
                                                : subject
                                            }
                                        </span>
                                        <span className="hidden sm:inline lg:hidden">
                                            {shouldAnimate(subject, 'sm') 
                                                ? `${subject.slice(0, characterLimits.sm)}...` 
                                                : subject
                                            }
                                        </span>
                                        <span className="hidden lg:inline">
                                            {subject}
                                        </span>
                                    </motion.span>
                                </div>
                            </div>
                            {subjectNotes.some(note => note.subject === subject) && (
                                <div 
                                    onClick={() => handlePreviewNotes(subject)}
                                    className="h-full flex items-center px-3 bg-blue-500/20 group-hover:bg-blue-500/30 
                                             border-l border-blue-500/30 cursor-pointer transition-all duration-200"
                                    title={String(t({
                                        EN: "Preview Notes",
                                        NL: "Bekijk Notities"
                                    }))}
                                >
                                    <FaEye className="w-4 h-4 text-yellow-300/80 group-hover:text-yellow-300 transition-colors" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
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
                    <button
                        onClick={() => setShowCourses(!showCourses)}
                        className="p-2 hover:bg-blue-600/50 rounded-lg transition-colors"
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
                            className="overflow-hidden"
                        >
                            <div className="space-y-6">
                                <div className="flex justify-center">
                                    <div className="inline-flex bg-blue-600/20 rounded-2xl p-1.5">
                                        {educationLevels.map((level, index) => (
                                            <motion.button
                                                key={level.id}
                                                onClick={() => setSelectedLevel(level.id)}
                                                className={`
                                                    relative px-8 py-3 rounded-xl text-center transition-all duration-200
                                                    ${selectedLevel === level.id 
                                                        ? 'bg-blue-600/50 text-yellow-300 shadow-lg' 
                                                        : 'text-yellow-100 hover:text-yellow-200'
                                                    }
                                                    ${index !== educationLevels.length - 1 ? 'mr-1' : ''}
                                                `}
                                            >
                                                {selectedLevel === level.id && (
                                                    <motion.div
                                                        layoutId="activeTab"
                                                        className="absolute inset-0 bg-blue-500/20 rounded-xl"
                                                        initial={false}
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                                <span className="relative z-10">{String(level.title)}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                <div className="w-full">
                                    <AnimatePresence mode="wait">
                                        {selectedLevel && (
                                            renderSubjects(
                                                educationLevels.find(level => level.id === selectedLevel)?.subjects || [],
                                                selectedLevel
                                            )
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

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
                <div className="space-y-2">
                    <p className="text-yellow-100">
                        {String(t({
                            EN: "A standard session is 60 minutes. For group lessons with 3 or more students, I recommend 1.5-hour sessions to ensure everyone gets sufficient attention.",
                            NL: "Een standaard sessie duurt 60 minuten. Voor groepslessen met 3 of meer studenten raad ik sessies van 1,5 uur aan voor voldoende persoonlijke aandacht."
                        }))}
                    </p>
                    <p className="text-yellow-100">
                        {String(t({
                            EN: "We start with a free 30-minute trial lesson to assess your needs and goals. For thesis supervision, the first consultation includes preparation time.",
                            NL: "We beginnen met een gratis proefles van 30 minuten om je behoeften en doelen te bespreken. Voor scriptiebegeleiding is het eerste consult inclusief voorbereidingstijd."
                        }))}
                    </p>
                </div>
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
                            {String(t({ EN: "Individual Sessions", NL: "Individuele Sessies" }))}
                        </h3>
                    </div>
                    <button
                        onClick={() => setShowPricing(!showPricing)}
                        className="text-yellow-300 hover:text-yellow-400"
                    >
                        {showPricing ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>
                <div className="space-y-2">
                    <p className="text-yellow-100">
                        {String(t({
                            EN: "Rates start at €60 per hour. First trial lesson (30 min) is free!",
                            NL: "Tarieven vanaf €60 per uur. Eerste proefles (30 min) is gratis!"
                        }))}
                    </p>
                    <p className="text-sm text-yellow-100 italic">
                        {String(t({
                            EN: "A standard session is 60 minutes. Longer sessions are possible on request. All rates for individuals include VAT (21%).",
                            NL: "Een standaard sessie duurt 60 minuten. Langere sessies zijn mogelijk op aanvraag. Alle tarieven voor particulieren zijn inclusief BTW (21%)."
                        }))}
                    </p>
                </div>

                <AnimatePresence>
                    {showPricing && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-6 space-y-6"
                        >
                            <PricingTable />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-700 p-6 rounded-lg"
            >
                <div className="flex items-center justify-between text-yellow-300 mb-3">
                    <div className="flex items-center">
                        <FaEuroSign className="text-2xl mr-3" />
                        <h3 className="text-lg font-semibold">
                            {String(t({ EN: "Group Sessions", NL: "Groepssessies" }))}
                        </h3>
                    </div>
                    <button
                        onClick={() => setShowGroupPricing(!showGroupPricing)}
                        className="text-yellow-300 hover:text-yellow-400"
                    >
                        {showGroupPricing ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>
                <p className="text-yellow-100">
                    {String(t({
                        EN: "Study together and save! Group rates for 2-4 students. For optimal learning, I recommend 1.5-hour sessions for groups of 3-4 students. All rates for individuals include VAT (21%), business rates exclude VAT.",
                        NL: "Samen studeren en besparen! Groepstarieven voor 2-4 studenten. Voor optimaal leren raad ik sessies van 1,5 uur aan voor groepen van 3-4 studenten. Alle tarieven voor particulieren zijn inclusief BTW (21%), zakelijke tarieven zijn exclusief BTW."
                    }))}
                </p>

                <AnimatePresence>
                    {showGroupPricing && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-6 space-y-6"
                        >
                            <GroupPricingTable />

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

            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-blue-700 p-6 rounded-lg"
            >
                <div className="flex items-center justify-between text-yellow-300 mb-3">
                    <div className="flex items-center">
                        <FaGraduationCap className="text-2xl mr-3" />
                        <h3 className="text-lg font-semibold">
                            {String(t({ EN: "Thesis Supervision", NL: "Scriptiebegeleiding" }))}
                        </h3>
                    </div>
                    <button
                        onClick={() => setShowThesis(!showThesis)}
                        className="text-yellow-300 hover:text-yellow-400"
                    >
                        {showThesis ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>
                <p className="text-yellow-100">
                    {String(t({
                        EN: "Professional support for your thesis. First consultation includes preparation time.",
                        NL: "Professionele ondersteuning voor je scriptie. Eerste consult inclusief voorbereidingstijd."
                    }))}
                </p>

                <AnimatePresence>
                    {showThesis && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-6 space-y-4"
                        >
                            <p className="text-yellow-100 mb-4">
                                {String(t({
                                    EN: "Services include:",
                                    NL: "Diensten omvatten:"
                                }))}
                            </p>
                            <ul className="list-disc list-inside text-yellow-100 mb-4 space-y-1">
                                <li>{String(t({
                                    EN: "Research methodology and design",
                                    NL: "Onderzoeksmethodologie en opzet"
                                }))}</li>
                                <li>{String(t({
                                    EN: "Data analysis and statistics",
                                    NL: "Data-analyse en statistiek"
                                }))}</li>
                                <li>{String(t({
                                    EN: "Proofreading and feedback",
                                    NL: "Proeflezen en feedback"
                                }))}</li>
                                <li>{String(t({
                                    EN: "Software support (R, Python, SPSS)",
                                    NL: "Software ondersteuning (R, Python, SPSS)"
                                }))}</li>
                            </ul>

                            <div className="bg-blue-600/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-blue-600/50">
                                            <th className="text-left py-2 text-yellow-100 font-medium">Type</th>
                                            <th className="text-right py-2 text-yellow-100 font-medium">Tarief</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-blue-600/50">
                                            <td className="py-2 text-yellow-100">Eenmalig consult</td>
                                            <td className="py-2 text-yellow-300 font-semibold text-right">€80</td>
                                        </tr>
                                        <tr className="border-b border-blue-600/50">
                                            <td className="py-2 text-yellow-100">4 sessies</td>
                                            <td className="py-2 text-yellow-300 font-semibold text-right">€250</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 text-yellow-100">10 sessies</td>
                                            <td className="py-2 text-yellow-300 font-semibold text-right">€550</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p className="mt-4 text-sm text-yellow-100 italic">
                                {String(t({
                                    EN: "A standard session is 60 minutes. All packages include WhatsApp support for quick questions between sessions. The 10 sessions package is recommended for comprehensive thesis support.",
                                    NL: "Een standaard sessie duurt 60 minuten. Alle pakketten inclusief WhatsApp ondersteuning voor korte vragen tussen sessies door. Het pakket van 10 sessies wordt aanbevolen voor uitgebreide scriptiebegeleiding."
                                }))}
                            </p>
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