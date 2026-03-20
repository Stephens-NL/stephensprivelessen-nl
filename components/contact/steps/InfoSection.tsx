'use client';

import React, { useReducer } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { FaGraduationCap, FaClock, FaEuroSign, FaArrowRight, FaWhatsapp, FaChevronDown, FaChevronUp, FaEye, FaEnvelope } from 'react-icons/fa';
import NotesPreviewModal from '../components/NotesPreviewModal';
import {
    subjectNotes, 
    contactLinks, 
    infoSectionTranslations as translations, 
    SubjectNote,
} from '@/data/infoSection';
import { ContactPricingTable } from './ContactPricingTable';
import { ContactGroupPricingTable } from './ContactGroupPricingTable';
import { InfoSectionCoursesBlock } from './InfoSectionCoursesBlock';

interface InfoSectionProps {
    onBack: () => void;
    onRequestLesson?: () => void;
}

type InfoState = {
  showPricing: boolean;
  showGroupPricing: boolean;
  showThesis: boolean;
  showCourses: boolean;
  selectedLevel: string | null;
  selectedNote: SubjectNote | null;
};

type InfoAction =
  | { type: 'TOGGLE_PRICING' }
  | { type: 'TOGGLE_GROUP_PRICING' }
  | { type: 'TOGGLE_THESIS' }
  | { type: 'TOGGLE_COURSES' }
  | { type: 'SET_LEVEL'; level: string | null }
  | { type: 'SET_NOTE'; note: SubjectNote | null };

function infoReducer(state: InfoState, action: InfoAction): InfoState {
  switch (action.type) {
    case 'TOGGLE_PRICING': return { ...state, showPricing: !state.showPricing };
    case 'TOGGLE_GROUP_PRICING': return { ...state, showGroupPricing: !state.showGroupPricing };
    case 'TOGGLE_THESIS': return { ...state, showThesis: !state.showThesis };
    case 'TOGGLE_COURSES': return { ...state, showCourses: !state.showCourses };
    case 'SET_LEVEL': return { ...state, selectedLevel: action.level };
    case 'SET_NOTE': return { ...state, selectedNote: action.note };
    default: return state;
  }
}

const InfoSection = ({ onBack }: InfoSectionProps) => {
    const locale = useLocale();
    const language = locale === 'nl' ? 'NL' : 'EN';
    const t = useTranslations('contact');
    const [state, dispatch] = useReducer(infoReducer, {
        showPricing: false,
        showGroupPricing: false,
        showThesis: false,
        showCourses: false,
        selectedLevel: null,
        selectedNote: null,
    });
    const { showPricing, showGroupPricing, showThesis, showCourses, selectedLevel, selectedNote } = state;

    const handlePreviewNotes = (subject: string) => {
        const note = subjectNotes.find(n => n.subject === subject);
        if (note) {
            dispatch({ type: 'SET_NOTE', note });
        }
    };

    return (
        <div className="space-y-8">
            <InfoSectionCoursesBlock
                showCourses={showCourses}
                selectedLevel={selectedLevel}
                onToggleCourses={() => dispatch({ type: 'TOGGLE_COURSES' })}
                onSetLevel={(level) => dispatch({ type: 'SET_LEVEL', level })}
                onPreviewNotes={handlePreviewNotes}
            />

            <m.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-[var(--ink-light)] p-6 rounded-lg"
            >
                <div className="flex items-center text-[var(--amber)] mb-3">
                    <FaGraduationCap className="text-2xl mr-3" />
                    <h3 className="text-lg font-semibold">
                        {translations.teachingMethod[language]}
                    </h3>
                </div>
                <p className="text-[var(--cream)]">
                    {translations.teachingMethodDescription[language]}
                </p>
            </m.div>

            <m.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-[var(--ink-light)] p-6 rounded-lg"
            >
                <div className="flex items-center justify-between text-[var(--amber)] mb-3">
                    <div className="flex items-center">
                        <FaClock className="text-2xl mr-3" />
                        <h3 className="text-lg font-semibold">
                            {translations.lessonStructure[language]}
                        </h3>
                    </div>
                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_PRICING' })}
                        className="text-[var(--amber)] hover:text-[var(--amber)]"
                    >
                        {showPricing ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>
                <div className="space-y-2">
                    <p className="text-[var(--cream)]">
                        {translations.standardSession[language]}
                    </p>
                    <p className="text-[var(--cream)]">
                        {translations.trialLesson[language]}
                    </p>
                </div>

                <AnimatePresence>
                    {showPricing && (
                        <m.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-6 space-y-6"
                        >
                            <ContactPricingTable />
                        </m.div>
                    )}
                </AnimatePresence>
            </m.div>

            <m.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-[var(--ink-light)] p-6 rounded-lg"
            >
                <div className="flex items-center justify-between text-[var(--amber)] mb-3">
                    <div className="flex items-center">
                        <FaEuroSign className="text-2xl mr-3" />
                        <h3 className="text-lg font-semibold">
                            {translations.groupSessions[language]}
                        </h3>
                    </div>
                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_GROUP_PRICING' })}
                        className="text-[var(--amber)] hover:text-[var(--amber)]"
                    >
                        {showGroupPricing ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>
                <p className="text-[var(--cream)]">
                    {translations.groupSessionsDescription[language]}
                </p>

                <AnimatePresence>
                    {showGroupPricing && (
                        <m.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-6 space-y-6"
                        >
                            <ContactGroupPricingTable />

                            <m.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm text-[var(--cream)] text-center mt-4"
                            >
                                {translations.freeTrialNote[language]}
                            </m.p>
                        </m.div>
                    )}
                </AnimatePresence>
            </m.div>

            <m.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-[var(--ink-light)] p-6 rounded-lg"
            >
                <div className="flex items-center justify-between text-[var(--amber)] mb-3">
                    <div className="flex items-center">
                        <FaGraduationCap className="text-2xl mr-3" />
                        <h3 className="text-lg font-semibold">
                            {translations.thesisSupervision[language]}
                        </h3>
                    </div>
                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_THESIS' })}
                        className="text-[var(--amber)] hover:text-[var(--amber)]"
                    >
                        {showThesis ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>
                <p className="text-[var(--cream)]">
                    {translations.thesisDescription[language]}
                </p>

                <AnimatePresence>
                    {showThesis && (
                        <m.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-6 space-y-4"
                        >
                            <p className="text-[var(--cream)] mb-4">
                                {translations.servicesInclude[language]}
                            </p>
                            <ul className="list-disc list-inside text-[var(--cream)] mb-4 space-y-1">
                                <li>{t('form.researchMethodologyAndDesign')}</li>
                                <li>{t('form.dataAnalysisAndStatistics')}</li>
                                <li>{t('form.proofreadingAndFeedback')}</li>
                                <li>{t('form.softwareSupportRPythonSpss')}</li>
                            </ul>

                            <div className="bg-[var(--ink-light)]/30 backdrop-blur-sm rounded-2xl p-6 border border-[var(--ink)]/30">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-[var(--ink-light)]/50">
                                            <th className="text-left py-2 text-[var(--cream)] font-medium">Type</th>
                                            <th className="text-right py-2 text-[var(--cream)] font-medium">{language === 'NL' ? 'Tarief' : 'Rate'}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-[var(--ink-light)]/50">
                                            <td className="py-2 text-[var(--cream)]">{language === 'NL' ? 'Eenmalig consult' : 'Single consultation'}</td>
                                            <td className="py-2 text-[var(--amber)] font-semibold text-right">€100</td>
                                        </tr>
                                        <tr className="border-b border-[var(--ink-light)]/50">
                                            <td className="py-2 text-[var(--cream)]">{language === 'NL' ? '4 sessies' : '4 sessions'}</td>
                                            <td className="py-2 text-[var(--amber)] font-semibold text-right">€250</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 text-[var(--cream)]">{language === 'NL' ? '10 sessies' : '10 sessions'}</td>
                                            <td className="py-2 text-[var(--amber)] font-semibold text-right">€550</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p className="mt-4 text-sm text-[var(--cream)] italic">
                                {translations.thesisPackageNote[language]}
                            </p>
                        </m.div>
                    )}
                </AnimatePresence>
            </m.div>

            <div className="flex flex-col items-center max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto mb-6">
                    <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onBack}
                        className="px-6 py-3 bg-[var(--ink-light)] text-white rounded-lg hover:bg-[var(--ink-light)] w-full sm:w-auto"
                    >
                        {translations.back[language]}
                    </m.button>

                    <m.a
                        href={contactLinks.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center px-6 py-3 bg-[var(--sage)] text-white rounded-lg hover:bg-[var(--sage)] w-full sm:w-auto min-w-[200px]"
                    >
                        <FaWhatsapp className="mr-2" />
                        {translations.contactWhatsApp[language]}
                    </m.a>

                    <m.a
                        href={contactLinks.email}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center px-6 py-3 bg-[var(--ink)] text-white rounded-lg hover:bg-[var(--ink-light)] w-full sm:w-auto min-w-[200px]"
                    >
                        <FaEnvelope className="mr-2" />
                        {translations.contactEmail[language]}
                    </m.a>
                </div>

                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[var(--cream)] text-sm italic max-w-2xl text-center px-4"
                >
                    {translations.communicationNote[language]}
                </m.div>
            </div>

            <NotesPreviewModal
                isOpen={!!selectedNote}
                onClose={() => dispatch({ type: 'SET_NOTE', note: null })}
                subject={selectedNote?.subject || ''}
                noteUrl={selectedNote?.noteUrl || ''}
            />
        </div>
    );
};

export default InfoSection; 