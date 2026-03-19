'use client';

import React from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { FaExclamationTriangle } from 'react-icons/fa';

interface BackConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const BackConfirmationDialog = ({ isOpen, onClose, onConfirm }: BackConfirmationDialogProps) => {
    const locale = useLocale();
    const language = locale === 'nl' ? 'NL' : 'EN';
    const t = useTranslations('contact');

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
                <m.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-[var(--ink)] rounded-lg p-6 max-w-md w-full shadow-xl"
                >
                    <div className="text-center mb-6">
                        <FaExclamationTriangle className="text-[var(--amber)] text-4xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-[var(--amber)] mb-2">
                            {t('form.areYouSureYouWantToLeave')}
                        </h3>
                        <p className="text-[var(--cream)]">
                            {t('form.yourProgressWillBeLostIfYouLeaveNow')}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-[var(--ink-light)] text-[var(--amber)] rounded-lg hover:bg-[var(--ink-light)] transition-colors"
                        >
                            {t('form.continueForm')}
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                            {t('form.leave')}
                        </button>
                    </div>
                </m.div>
            </m.div>
        </AnimatePresence>
    );
};

export default BackConfirmationDialog; 