'use client';

import React, { useState } from 'react';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/hooks/useLanguage';
import { useDialog } from '@/hooks/useDialog';

interface GoogleCalendarAppointmentProps {
    isOpen: boolean;
    onClose: () => void;
    appointmentType: 'trial' | 'regular';
    studentName?: string;
    studentEmail?: string;
}

const GoogleCalendarAppointment = ({ 
    isOpen, 
    onClose, 
    appointmentType,
    studentName,
    studentEmail 
}: GoogleCalendarAppointmentProps) => {
    const language = useLanguage();
    const t = useTranslations('contact');

    const dialogRef = useDialog(isOpen, onClose);
    const [consented, setConsented] = useState(false);

    if (!isOpen) return null;

    // Use the environment variable for the calendar URL
    const baseUrl = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_URL;
    
    // Add query parameters for pre-filling the form
    const queryParams = new URLSearchParams({
        name: studentName || '',
        email: studentEmail || '',
        type: appointmentType
    }).toString();
    
    const appointmentUrl = baseUrl;  // Google Calendar appointments don't support query params directly

    return (
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
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="calendar-dialog-title"
                className="bg-[var(--ink)] rounded-lg w-full max-w-4xl h-[80vh] flex flex-col"
            >
                <div className="p-4 border-b border-[var(--ink-light)] flex justify-between items-center">
                    <h2 id="calendar-dialog-title" className="text-xl font-semibold text-[var(--amber)]">
                        {(language === 'NL' ? appointmentType === 'trial'
                                ? "Plan Proefles"
                                : "Plan Reguliere Les" : appointmentType === 'trial'
                                ? "Schedule Trial Lesson"
                                : "Schedule Regular Lesson")}
                    </h2>
                    <button
                        onClick={onClose}
                        aria-label={t('form.close')}
                        className="text-[var(--amber)] hover:text-[var(--amber)] p-2"
                    >
                        ×
                    </button>
                </div>
                <div className="flex-grow">
                    {consented ? (
                        <iframe
                            src={appointmentUrl}
                            className="w-full h-full"
                            frameBorder="0"
                            title={t('form.appointmentScheduling')}
                        />
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center gap-4 p-6 text-center">
                            <p className="text-on-dark-muted">{t('form.calendarNotice')}</p>
                            <button
                                onClick={() => setConsented(true)}
                                className="px-6 py-2.5 rounded-lg bg-[var(--amber)] text-[var(--ink)] font-semibold hover:bg-[var(--amber-hover)] transition-colors"
                            >
                                {t('form.calendarLoad')}
                            </button>
                        </div>
                    )}
                </div>
            </m.div>
        </m.div>
    );
};

export default GoogleCalendarAppointment; 