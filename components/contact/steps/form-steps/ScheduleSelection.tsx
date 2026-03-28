'use client';

import { useTranslations } from 'next-intl';
import { useLanguage } from '@/hooks/useLanguage';
import React from 'react';
import { m } from 'framer-motion';
import { FormData } from '../../Contact';

import { FaClock, FaCalendarAlt, FaBan } from 'react-icons/fa';

interface ScheduleSelectionProps {
    formData: FormData;
    onUpdate: (updates: Partial<FormData>) => void;
}

const weekDays = [
    { value: 'monday', labelEN: 'Monday', labelNL: 'Maandag' },
    { value: 'tuesday', labelEN: 'Tuesday', labelNL: 'Dinsdag' },
    { value: 'wednesday', labelEN: 'Wednesday', labelNL: 'Woensdag' },
    { value: 'thursday', labelEN: 'Thursday', labelNL: 'Donderdag' },
    { value: 'friday', labelEN: 'Friday', labelNL: 'Vrijdag' },
];

const timeSlots = [
    { value: '12:00', label: '12:00' },
    { value: '12:30', label: '12:30' },
    { value: '13:00', label: '13:00' },
    { value: '13:30', label: '13:30' },
    { value: '14:00', label: '14:00' },
    { value: '14:30', label: '14:30' },
    { value: '15:00', label: '15:00' },
    { value: '15:30', label: '15:30' },
    { value: '16:00', label: '16:00' },
    { value: '16:30', label: '16:30' },
    { value: '17:00', label: '17:00' },
    { value: '17:30', label: '17:30' },
    { value: '18:00', label: '18:00' },
];

const ScheduleSelection = ({ formData, onUpdate }: ScheduleSelectionProps) => {
    const language = useLanguage();
    const isNl = language === 'NL';
    const t = useTranslations('contact');

    const toggleDay = (day: string) => {
        const updatedDays = formData.preferredDays.includes(day)
            ? formData.preferredDays.filter(d => d !== day)
            : [...formData.preferredDays, day];
        onUpdate({ preferredDays: updatedDays });
    };

    const toggleTime = (time: string) => {
        const updatedTimes = formData.preferredTimes.includes(time)
            ? formData.preferredTimes.filter(t => t !== time)
            : [...formData.preferredTimes, time];
        onUpdate({ preferredTimes: updatedTimes });
    };

    const toggleUnavailableDay = (day: string) => {
        const updatedDays = formData.unavailableDays.includes(day)
            ? formData.unavailableDays.filter(d => d !== day)
            : [...formData.unavailableDays, day];
        onUpdate({ unavailableDays: updatedDays });
    };

    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
        >
            <h2 className="text-2xl font-semibold text-[var(--amber)] mb-4">
                {t('form.schedulePreferences')}
            </h2>

            <div className="space-y-6">
                <div>
                    <h3 className="flex items-center text-lg text-[var(--cream)] mb-3">
                        <FaCalendarAlt className="mr-2" />
                        {t('form.preferredDays')}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {weekDays.map((day) => (
                            <m.button
                                key={day.value}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`p-3 rounded-lg border-2 transition-colors ${
                                    formData.preferredDays.includes(day.value)
                                        ? 'bg-[var(--amber)] text-[var(--ink)] border-[var(--amber)]'
                                        : 'bg-[var(--ink-light)] text-[var(--amber)] border-[var(--ink-light)] hover:border-[var(--amber)]'
                                }`}
                                onClick={() => toggleDay(day.value)}
                            >
                                {isNl ? day.labelNL : day.labelEN}
                            </m.button>
                        ))}
                    </div>
                    {formData.preferredDays.length === 0 && (
                        <p className="text-destructive text-sm mt-2">
                            {t('form.pleaseSelectAtLeastOnePreferredDay')}
                        </p>
                    )}
                </div>

                <div>
                    <h3 className="flex items-center text-lg text-[var(--cream)] mb-3">
                        <FaClock className="mr-2" />
                        {t('form.preferredTimes')}
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {timeSlots.map((time) => (
                            <m.button
                                key={time.value}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`p-3 rounded-lg border-2 transition-colors ${
                                    formData.preferredTimes.includes(time.value)
                                        ? 'bg-[var(--amber)] text-[var(--ink)] border-[var(--amber)]'
                                        : 'bg-[var(--ink-light)] text-[var(--amber)] border-[var(--ink-light)] hover:border-[var(--amber)]'
                                }`}
                                onClick={() => toggleTime(time.value)}
                            >
                                {time.label}
                            </m.button>
                        ))}
                    </div>
                    {formData.preferredTimes.length === 0 && (
                        <p className="text-destructive text-sm mt-2">
                            {t('form.pleaseSelectAtLeastOnePreferredTime')}
                        </p>
                    )}
                </div>

                <div>
                    <h3 className="flex items-center text-lg text-[var(--cream)] mb-3">
                        <FaBan className="mr-2" />
                        {t('form.unavailableDays')}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {weekDays.map((day) => (
                            <m.button
                                key={day.value}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`p-3 rounded-lg border-2 transition-colors ${
                                    formData.unavailableDays.includes(day.value)
                                        ? 'bg-destructive text-white border-destructive'
                                        : 'bg-[var(--ink-light)] text-[var(--amber)] border-[var(--ink-light)] hover:border-destructive'
                                }`}
                                onClick={() => toggleUnavailableDay(day.value)}
                                disabled={formData.preferredDays.includes(day.value)}
                            >
                                {isNl ? day.labelNL : day.labelEN}
                            </m.button>
                        ))}
                    </div>
                </div>
            </div>
        </m.div>
    );
};

export default ScheduleSelection;