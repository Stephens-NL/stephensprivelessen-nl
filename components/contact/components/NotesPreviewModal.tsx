'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';
import { useTranslation } from '../../../hooks/useTranslation';

interface NotesPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    subject: string;
    noteUrl: string;
    onScheduleTrial?: () => void;
}

const NotesPreviewModal = ({ isOpen, onClose, subject, noteUrl, onScheduleTrial }: NotesPreviewModalProps) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (isOpen) {
            console.log('Opening preview for:', subject);
            console.log('Note URL:', noteUrl);
        }
    }, [isOpen, subject, noteUrl]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-blue-800 rounded-lg w-full max-w-5xl flex flex-col h-[90vh]"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="p-6 pb-4 flex-shrink-0">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-blue-700 hover:bg-blue-600 text-yellow-300 hover:text-yellow-400 rounded-full transition-colors"
                            title={String(t({
                                EN: "Close",
                                NL: "Sluiten"
                            }))}
                        >
                            <FaTimes className="w-5 h-5" />
                        </button>

                        <h3 className="text-xl font-semibold text-yellow-300 pr-12">
                            {String(t({
                                EN: `Example Notes: ${subject}`,
                                NL: `Voorbeeldnotities: ${subject}`
                            }))}
                        </h3>
                        <p className="text-white/80 text-sm mt-1">
                            {String(t({
                                EN: "These are example notes to demonstrate teaching style and methodology",
                                NL: "Dit zijn voorbeeldnotities om de lesstijl en methodologie te demonstreren"
                            }))}
                        </p>
                    </div>

                    <div className="flex-grow overflow-hidden p-6 pt-0">
                        <div className="w-full h-full bg-white rounded-lg">
                            <iframe
                                src={noteUrl}
                                className="w-full h-full rounded-lg"
                                title={`Notes preview for ${subject}`}
                                onError={(e) => console.error('Error loading PDF:', e)}
                            />
                        </div>
                    </div>

                    <div className="p-6 pt-4 flex justify-between items-center border-t border-blue-700 flex-shrink-0">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-white hover:text-yellow-300 transition-colors"
                        >
                            {String(t({
                                EN: "Close Preview",
                                NL: "Sluit Voorbeeld"
                            }))}
                        </button>
                        
                        <button
                            onClick={onScheduleTrial}
                            className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-blue-900 rounded-lg hover:bg-yellow-300 transition-colors font-semibold"
                        >
                            <FaCalendarAlt />
                            {String(t({
                                EN: "Schedule Trial Lesson",
                                NL: "Plan Proefles"
                            }))}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NotesPreviewModal; 