'use client';

import React, { useReducer } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { FaGraduationCap, FaClock, FaEuroSign, FaArrowRight, FaWhatsapp, FaChevronDown, FaChevronUp, FaEye, FaEnvelope } from 'react-icons/fa';
import NotesPreviewModal from '../components/NotesPreviewModal';
import { getBusinessData } from '@/data/businessData';
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
    const { t } = useTranslation();
    const businessData = getBusinessData(t);
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
            </m.div>

            <m.div
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
                        onClick={() => dispatch({ type: 'TOGGLE_PRICING' })}
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
                        onClick={() => dispatch({ type: 'TOGGLE_GROUP_PRICING' })}
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
                                className="text-sm text-yellow-200 text-center mt-4"
                            >
                                {t(translations.freeTrialNote)}
                            </m.p>
                        </m.div>
                    )}
                </AnimatePresence>
            </m.div>

            <m.div
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
                        onClick={() => dispatch({ type: 'TOGGLE_THESIS' })}
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
                        <m.div
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
                        className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 w-full sm:w-auto"
                    >
                        {t(translations.back)}
                    </m.button>
                    
                    <m.a
                        href={contactLinks.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full sm:w-auto min-w-[200px]"
                    >
                        <FaWhatsapp className="mr-2" />
                        {t(translations.contactWhatsApp)}
                    </m.a>

                    <m.a
                        href={contactLinks.email}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full sm:w-auto min-w-[200px]"
                    >
                        <FaEnvelope className="mr-2" />
                        {t(translations.contactEmail)}
                    </m.a>
                </div>

                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-yellow-100 text-sm italic max-w-2xl text-center px-4"
                >
                    {t(translations.communicationNote)}
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