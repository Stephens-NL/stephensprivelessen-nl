'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../../Contact';
import { useTranslation } from '../../../../hooks/useTranslation';
import { FaCheck, FaClock, FaMapMarkerAlt, FaGraduationCap, FaBook, FaBullseye, FaSpinner } from 'react-icons/fa';
import SuccessMessage from './SuccessMessage';

interface ConfirmationProps {
    formData: FormData;
}

const Confirmation = ({ formData }: ConfirmationProps) => {
    const { t } = useTranslation();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/submit-lesson-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: 'info@stephenadei.nl',
                    subject: String(t({
                        EN: "New Lesson Request",
                        NL: "Nieuwe Lesaanvraag"
                    })),
                    formData
                }),
            });

            if (response.ok) {
                setIsSubmitted(true);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return <SuccessMessage formData={formData} />;
    }

    const formatDaysList = (days: string[]) => {
        return days.map(day => String(t({ 
            EN: day.charAt(0).toUpperCase() + day.slice(1), 
            NL: day.charAt(0).toUpperCase() + day.slice(1) 
        }))).join(', ');
    };

    const formatTimesList = (times: string[]) => times.join(', ');

    const getSubjectLabel = (subject: string) => {
        if (!subject.includes('_')) return subject;

        const subjectMap: { [key: string]: { EN: string, NL: string } } = {
            math_primary: { EN: 'Mathematics (Primary)', NL: 'Rekenen (Basisschool)' },
            dutch_primary: { EN: 'Dutch (Primary)', NL: 'Nederlands (Basisschool)' },
            english_primary: { EN: 'English (Primary)', NL: 'Engels (Basisschool)' },
            math_secondary: { EN: 'Mathematics', NL: 'Wiskunde' },
            physics: { EN: 'Physics', NL: 'Natuurkunde' },
            chemistry: { EN: 'Chemistry', NL: 'Scheikunde' },
            biology: { EN: 'Biology', NL: 'Biologie' },
            economics: { EN: 'Economics', NL: 'Economie' },
            calculus: { EN: 'Calculus', NL: 'Calculus' },
            statistics: { EN: 'Statistics', NL: 'Statistiek' },
            linear_algebra: { EN: 'Linear Algebra', NL: 'Lineaire Algebra' },
        };

        return String(t(subjectMap[subject] || { EN: subject, NL: subject }));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
        >
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center"
                >
                    <FaCheck className="text-blue-900 text-2xl" />
                </motion.div>
                <h2 className="text-2xl font-semibold text-yellow-300 mb-2">
                    {String(t({ EN: "Almost There!", NL: "Bijna Klaar!" }))}
                </h2>
                <p className="text-yellow-100">
                    {String(t({
                        EN: "Please review your information below",
                        NL: "Controleer je gegevens hieronder"
                    }))}
                </p>
            </div>

            <div className="bg-blue-700 rounded-lg p-6 space-y-6">
                <div>
                    <h3 className="flex items-center text-yellow-300 font-semibold mb-2">
                        <FaGraduationCap className="mr-2" />
                        {String(t({ EN: "Personal Details", NL: "Persoonlijke Gegevens" }))}
                    </h3>
                    <p className="text-yellow-100">
                        <strong>{String(t({ EN: "Name", NL: "Naam" }))}: </strong>
                        {formData.name}
                    </p>
                    <p className="text-yellow-100">
                        <strong>{String(t({ EN: "Level", NL: "Niveau" }))}: </strong>
                        {String(t({ 
                            EN: formData.level.charAt(0).toUpperCase() + formData.level.slice(1), 
                            NL: formData.level.charAt(0).toUpperCase() + formData.level.slice(1) 
                        }))}
                    </p>
                </div>

                <div>
                    <h3 className="flex items-center text-yellow-300 font-semibold mb-2">
                        <FaBook className="mr-2" />
                        {String(t({ EN: "Subject", NL: "Vak" }))}
                    </h3>
                    <p className="text-yellow-100">{getSubjectLabel(formData.subject)}</p>
                </div>

                <div>
                    <h3 className="flex items-center text-yellow-300 font-semibold mb-2">
                        <FaBullseye className="mr-2" />
                        {String(t({ EN: "Goals", NL: "Doelen" }))}
                    </h3>
                    <p className="text-yellow-100 whitespace-pre-line">{formData.goals}</p>
                </div>

                <div>
                    <h3 className="flex items-center text-yellow-300 font-semibold mb-2">
                        <FaClock className="mr-2" />
                        {String(t({ EN: "Schedule", NL: "Rooster" }))}
                    </h3>
                    <p className="text-yellow-100">
                        <strong>{String(t({ EN: "Preferred Days", NL: "Voorkeursdagen" }))}: </strong>
                        {formatDaysList(formData.preferredDays)}
                    </p>
                    <p className="text-yellow-100">
                        <strong>{String(t({ EN: "Preferred Times", NL: "Voorkeurstijden" }))}: </strong>
                        {formatTimesList(formData.preferredTimes)}
                    </p>
                    {formData.unavailableDays.length > 0 && (
                        <p className="text-yellow-100">
                            <strong>{String(t({ EN: "Unavailable", NL: "Niet Beschikbaar" }))}: </strong>
                            {formatDaysList(formData.unavailableDays)}
                        </p>
                    )}
                </div>

                <div>
                    <h3 className="flex items-center text-yellow-300 font-semibold mb-2">
                        <FaMapMarkerAlt className="mr-2" />
                        {String(t({ EN: "Location", NL: "Locatie" }))}
                    </h3>
                    <p className="text-yellow-100">
                        {formData.isOnline 
                            ? String(t({ EN: "Online Lessons", NL: "Online Lessen" }))
                            : String(t({ EN: "In-Person Lessons", NL: "Fysieke Lessen" }))}
                    </p>
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg text-center font-semibold transition-colors ${
                    isSubmitting
                        ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                        : 'bg-yellow-400 text-blue-900 hover:bg-yellow-300'
                }`}
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center">
                        <FaSpinner className="animate-spin mr-2" />
                        {String(t({
                            EN: "Submitting...",
                            NL: "Versturen..."
                        }))}
                    </span>
                ) : (
                    String(t({
                        EN: "Submit Request",
                        NL: "Verstuur Aanvraag"
                    }))
                )}
            </motion.button>
        </motion.div>
    );
};

export default Confirmation;