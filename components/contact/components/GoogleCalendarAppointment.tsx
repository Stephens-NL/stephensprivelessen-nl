'use client';

import React from 'react';
import { m } from 'framer-motion';
import { useTranslation } from '../../../hooks/useTranslation';

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
    const { t } = useTranslation();

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
                className="bg-blue-800 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col"
            >
                <div className="p-4 border-b border-blue-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-yellow-300">
                        {String(t({
                            EN: appointmentType === 'trial' 
                                ? "Schedule Trial Lesson" 
                                : "Schedule Regular Lesson",
                            NL: appointmentType === 'trial'
                                ? "Plan Proefles"
                                : "Plan Reguliere Les"
                        }))}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-yellow-300 hover:text-yellow-400 p-2"
                    >
                        ×
                    </button>
                </div>
                <div className="flex-grow">
                    <iframe
                        src={appointmentUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        title={String(t({
                            EN: "Appointment Scheduling",
                            NL: "Afspraak Plannen"
                        }))}
                    />
                </div>
            </m.div>
        </m.div>
    );
};

export default GoogleCalendarAppointment; 