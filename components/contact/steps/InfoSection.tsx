'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { FaGraduationCap, FaClock, FaEuroSign, FaArrowRight, FaWhatsapp, FaChevronDown, FaChevronUp, FaEye, FaEnvelope } from 'react-icons/fa';
import NotesPreviewModal from '../components/NotesPreviewModal';
import { getBusinessData } from '@/data/businessData';
import { 
    subjectNotes, 
    contactLinks, 
    infoSectionTranslations as translations, 
    SubjectNote,
    pricingTiers,
    groupPricingTiers
} from '@/data/infoSection';

interface InfoSectionProps {
    onBack: () => void;
}

const InfoSection = ({ onBack }: InfoSectionProps) => {
    const { t } = useTranslation();
    const businessData = getBusinessData(t);
    const [showPricing, setShowPricing] = useState(false);
    const [showGroupPricing, setShowGroupPricing] = useState(false);
    const [showThesis, setShowThesis] = useState(false);
    const [showCourses, setShowCourses] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [selectedNote, setSelectedNote] = useState<SubjectNote | null>(null);

    const educationLevels = [
        {
            id: 'basis',
            title: t(translations.primaryEducation),
            subjects: businessData.subjects.primary
        },
        {
            id: 'voortgezet',
            title: t(translations.secondaryEducation),
            subjects: businessData.subjects.secondary
        },
        {
            id: 'hoger',
            title: t(translations.higherEducation),
            subjects: [...businessData.subjects.higher, ...businessData.subjects.programming]
        }
    ];

    const handlePreviewNotes = (subject: string) => {
        const note = subjectNotes.find(n => n.subject === subject);
        if (note) {
            setSelectedNote(note);
        }
    };

    const renderSubjects = (subjects: Array<{ NL: string, EN: string }>, levelId: string) => {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {subjects.map((subject, index) => {
                        const subjectText = t(subject);
                        return (
                            <motion.div 
                                key={subject.NL}
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
                                        >
                                            {subjectText}
                                        </motion.span>
                                    </div>
                                </div>
                                {subjectNotes.some(note => note.subject === subject.NL) && (
                                    <div 
                                        onClick={() => handlePreviewNotes(subject.NL)}
                                        className="h-full flex items-center px-3 bg-blue-500/20 group-hover:bg-blue-500/30 
                                                 border-l border-blue-500/30 cursor-pointer transition-all duration-200"
                                        title={t(translations.previewNotes)}
                                    >
                                        <FaEye className="w-4 h-4 text-yellow-300/80 group-hover:text-yellow-300 transition-colors" />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        );
    };

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
                            {t(translations.secondaryEducation)}
                        </button>
                        <button
                            onClick={() => setSelectedLevel('hoger')}
                            className={`px-4 py-2 rounded-lg text-sm transition-all ${
                                selectedLevel === 'hoger' 
                                    ? 'bg-blue-500/30 text-yellow-300' 
                                    : 'text-yellow-100 hover:text-yellow-200'
                            }`}
                        >
                            {t(translations.higherEducation)}
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
                                    type: { EN: "Single session", NL: "Losse sessie" }, 
                                    ms20minus: "€75", ms20plus: "€80", 
                                    bachelor: "€80", master: "€90" 
                                },
                                { 
                                    type: { EN: "2 sessions", NL: "2 sessies" }, 
                                    ms20minus: "€130", ms20plus: "€135", 
                                    bachelor: "€135", master: "€140" 
                                },
                                { 
                                    type: { EN: "4 sessions", NL: "4 sessies" }, 
                                    ms20minus: "€200", ms20plus: "€230", 
                                    bachelor: "€230", master: "€250" 
                                },
                            ].map((row) => (
                                <tr key={row.type.NL} className="border-b border-blue-600/50 last:border-0">
                                    <td className="py-2 text-yellow-100">{t(row.type)}</td>
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
                    {t(translations.whatsappSupport)}
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
                            {t(translations.secondaryEducation)}
                        </button>
                        <button
                            onClick={() => setSelectedLevel('hoger')}
                            className={`px-4 py-2 rounded-lg text-sm transition-all ${
                                selectedLevel === 'hoger' 
                                    ? 'bg-blue-500/30 text-yellow-300' 
                                    : 'text-yellow-100 hover:text-yellow-200'
                            }`}
                        >
                            {t(translations.higherEducation)}
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-full">
                        <thead>
                            <tr className="border-b border-blue-600/50">
                                <th className="text-left py-2 text-yellow-100 font-medium">{t({ EN: "Number of<br/>students", NL: "Aantal<br/>leerlingen" })}</th>
                                <th className="text-right py-2 text-yellow-100 font-medium">{t({ EN: "Single<br/>session<br/>(€/hour p.p.)", NL: "Losse<br/>sessie<br/>(€/uur p.p.)" })}</th>
                                <th className="text-right py-2 text-yellow-100 font-medium">{t({ EN: "4 sessions<br/>(€/hour p.p.)", NL: "4 sessies<br/>(€/uur p.p.)" })}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4].map((students) => {
                                const regular = groupPricingTiers.find(t => 
                                    t.level === (selectedLevel === 'middelbaar' ? "Voortgezet Onderwijs (20-)" : "Hoger Onderwijs")
                                )?.prices.find(p => p.students === students)?.price || '';
                                
                                const package4h = groupPricingTiers.find(t => 
                                    t.level === (selectedLevel === 'middelbaar' ? "Voortgezet Onderwijs (20-) 4-uurs pakket" : "Hoger Onderwijs 4-uurs pakket")
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
                        {t(translations.standardSession)}
                    </p>
                    
                    <div className="mt-2">
                        <button
                            onClick={() => setShowExample(!showExample)}
                            className="flex items-center text-sm text-yellow-300 hover:text-yellow-200 transition-colors"
                        >
                            {showExample ? <FaChevronUp className="mr-2" /> : <FaChevronDown className="mr-2" />}
                            {t(translations.showExample)}
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
                                            {t(translations.costComparison).replace('{level}', 
                                                selectedLevel === 'middelbaar' ? 'high school' : 'university'
                                            )}
                                        </p>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-sm text-yellow-300 font-medium mb-1">
                                                    {t(translations.individualSessions)}
                                                </p>
                                                <ul className="mt-1 space-y-1 text-sm text-yellow-100">
                                                    <li>• {`Price per 4 hours: ${selectedLevel === 'middelbaar' ? '€200' : '€250'}`}</li>
                                                    <li>• {`For 4 separate students: 4 × ${selectedLevel === 'middelbaar' ? '€200' : '€250'} = ${selectedLevel === 'middelbaar' ? '€800' : '€1000'}`}</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <p className="text-sm text-yellow-300 font-medium mb-1">
                                                    {t(translations.groupSessions)}
                                                </p>
                                                <ul className="mt-1 space-y-1 text-sm text-yellow-100">
                                                    <li>• {`Price per person: ${selectedLevel === 'middelbaar' ? '€125' : '€125'} (${selectedLevel === 'middelbaar' ? '€31.25' : '€31.25'}/hour)`}</li>
                                                    <li>• {`Total for the group: 4 × ${selectedLevel === 'middelbaar' ? '€125' : '€125'} = ${selectedLevel === 'middelbaar' ? '€500' : '€500'}`}</li>
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
                            {t(translations.availableCourses)}
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
                                                <span className="relative z-10">{level.title}</span>
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
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 bg-blue-600/30 rounded-xl border border-blue-500/30"
                >
                    <p className="text-yellow-100 text-sm">
                        {t(translations.thesisDescription)}
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
                        {t(translations.teachingMethod)}
                    </h3>
                </div>
                <p className="text-yellow-100">
                    {t(translations.teachingMethodDescription)}
                </p>
            </motion.div>

            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-blue-700 p-6 rounded-lg"
            >
                <div className="flex items-center justify-between text-yellow-300 mb-3">
                    <div className="flex items-center">
                        <FaClock className="text-2xl mr-3" />
                        <h3 className="text-lg font-semibold">
                            {t(translations.lessonStructure)}
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
                        {t(translations.standardSession)}
                    </p>
                    <p className="text-yellow-100">
                        {t(translations.trialLesson)}
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
                            {t(translations.groupSessions)}
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
                    {t(translations.groupSessionsDescription)}
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
                                {t(translations.freeTrialNote)}
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
                            {t(translations.thesisSupervision)}
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
                    {t(translations.thesisDescription)}
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
                                {t(translations.servicesInclude)}
                            </p>
                            <ul className="list-disc list-inside text-yellow-100 mb-4 space-y-1">
                                <li>{t({ EN: "Research methodology and design", NL: "Onderzoeksmethodologie en opzet" })}</li>
                                <li>{t({ EN: "Data analysis and statistics", NL: "Data-analyse en statistiek" })}</li>
                                <li>{t({ EN: "Proofreading and feedback", NL: "Proeflezen en feedback" })}</li>
                                <li>{t({ EN: "Software support (R, Python, SPSS)", NL: "Software ondersteuning (R, Python, SPSS)" })}</li>
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
                                            <td className="py-2 text-yellow-300 font-semibold text-right">€100</td>
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
                                {t(translations.thesisPackageNote)}
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
                        {t(translations.back)}
                    </motion.button>
                    
                    <motion.a
                        href={contactLinks.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full sm:w-auto min-w-[200px]"
                    >
                        <FaWhatsapp className="mr-2" />
                        {t(translations.contactWhatsApp)}
                    </motion.a>

                    <motion.a
                        href={contactLinks.email}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full sm:w-auto min-w-[200px]"
                    >
                        <FaEnvelope className="mr-2" />
                        {t(translations.contactEmail)}
                    </motion.a>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-yellow-100 text-sm italic max-w-2xl text-center px-4"
                >
                    {t(translations.communicationNote)}
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