'use client';

import React from 'react';
import { m, AnimatePresence } from 'framer-motion';
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

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                onClick={onClose}
            >
                <m.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-blue-800 rounded-lg w-full max-w-5xl flex flex-col h-[90vh]"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="p-6 pb-4 flex-shrink-0 flex items-center justify-between border-b border-blue-700">
                        <div>
                            <h3 className="text-xl font-semibold text-yellow-300">
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
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-blue-700/50 text-yellow-300 hover:text-yellow-400 rounded-lg transition-all duration-200 ml-4"
                            title={String(t({
                                EN: "Close",
                                NL: "Sluiten"
                            }))}
                        >
                            <FaTimes className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-grow overflow-hidden p-6 pt-0">
                        <div className="w-full h-full bg-white rounded-lg relative">
                            <iframe
                                src={noteUrl}
                                className="w-full h-full rounded-lg"
                                title={`Notes preview for ${subject}`}
                                onError={(e) => console.error('Error loading PDF:', e)}
                            />
                            <div className="absolute inset-0 pointer-events-none select-none">
                                <div className="absolute inset-0 grid grid-cols-3 gap-4 p-8">
                                    {['w0','w1','w2','w3','w4','w5','w6','w7','w8','w9','w10','w11'].map((watermarkKey) => (
                                        <div
                                            key={watermarkKey}
                                            className="flex items-center justify-center"
                                        >
                                            <div className="text-2xl font-bold text-black/[0.07] whitespace-nowrap transform -rotate-[20deg] text-center">
                                                <div>Eigendom van Stephen&apos;s</div>
                                                <div className="text-lg mt-1">Kopiëren niet toegestaan</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 pt-4 flex justify-end border-t border-blue-700 flex-shrink-0">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 bg-blue-700 text-yellow-300 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            {String(t({
                                EN: "Close Preview",
                                NL: "Sluit Voorbeeld"
                            }))}
                        </button>
                    </div>
                </m.div>
            </m.div>
        </AnimatePresence>
    );
};

export default NotesPreviewModal; 