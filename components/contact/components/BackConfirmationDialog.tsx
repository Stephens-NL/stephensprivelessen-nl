'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../../hooks/useTranslation';
import { FaExclamationTriangle } from 'react-icons/fa';

interface BackConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const BackConfirmationDialog = ({ isOpen, onClose, onConfirm }: BackConfirmationDialogProps) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-blue-800 rounded-lg p-6 max-w-md w-full shadow-xl"
                >
                    <div className="text-center mb-6">
                        <FaExclamationTriangle className="text-yellow-400 text-4xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-yellow-300 mb-2">
                            {String(t({
                                EN: "Are you sure you want to leave?",
                                NL: "Weet je zeker dat je wilt stoppen?"
                            }))}
                        </h3>
                        <p className="text-yellow-100">
                            {String(t({
                                EN: "Your progress will be lost if you leave now.",
                                NL: "Je voortgang gaat verloren als je nu stopt."
                            }))}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-blue-700 text-yellow-300 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            {String(t({
                                EN: "Continue Form",
                                NL: "Formulier Voortzetten"
                            }))}
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                            {String(t({
                                EN: "Leave",
                                NL: "Stoppen"
                            }))}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BackConfirmationDialog; 