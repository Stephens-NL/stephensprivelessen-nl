'use client';

import { useTranslations } from 'next-intl';
import { useLanguage } from '@/hooks/useLanguage';
import React from 'react';
import { m } from 'framer-motion';
import { FormData } from '../../Contact';
import { teachingWindow } from '@/data/business-config.generated';

import { FaClock, FaCalendarAlt, FaBan } from 'react-icons/fa';

interface ScheduleSelectionProps {
    formData: FormData;
    onUpdate: (updates: Partial<FormData>) => void;
}

// Days and slots come from the canonical business-config (rates.json →
// policy.teaching_window), vendored into data/ by scripts/sync-business-config.mjs.
// They used to be typed here, which is how the form ended up offering 12:00 and
// then 17:00 — both outside the hours Stephen actually teaches.
const DAY_LABELS: Record<string, { EN: string; NL: string }> = {
    monday: { EN: 'Monday', NL: 'Maandag' },
    tuesday: { EN: 'Tuesday', NL: 'Dinsdag' },
    wednesday: { EN: 'Wednesday', NL: 'Woensdag' },
    thursday: { EN: 'Thursday', NL: 'Donderdag' },
    friday: { EN: 'Friday', NL: 'Vrijdag' },
    saturday: { EN: 'Saturday', NL: 'Zaterdag' },
    sunday: { EN: 'Sunday', NL: 'Zondag' },
};

const weekDays = teachingWindow.days.map((value) => ({
    value,
    labelEN: DAY_LABELS[value]?.EN ?? value,
    labelNL: DAY_LABELS[value]?.NL ?? value,
}));

// START times — the config's last_start already accounts for lesson length.
const timeSlots: readonly string[] = teachingWindow.start_times;

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
            <h2 className="text-2xl font-semibold text-[var(--amber)] mb-2">
                {t('form.schedulePreferences')}
            </h2>
            {/* Stated, not just enforced by the options: someone who needs a
                daytime slot should be able to see that before filling the form
                in, rather than asking for one and being turned down later. */}
            <p className="text-on-dark/80 text-sm mb-4">
                {t('form.teachingWindow', {
                    window: isNl ? teachingWindow.display.nl : teachingWindow.display.en,
                })}
            </p>

            <div className="space-y-6">
                <div>
                    <h3 className="flex items-center text-lg text-on-dark mb-3">
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
                                        : 'bg-[var(--ink-light)] text-on-dark border-[var(--ink-light)] hover:border-[var(--amber)]'
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
                    <h3 className="flex items-center text-lg text-on-dark mb-3">
                        <FaClock className="mr-2" />
                        {t('form.preferredTimes')}
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {timeSlots.map((time) => (
                            <m.button
                                key={time}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`p-3 rounded-lg border-2 transition-colors ${
                                    formData.preferredTimes.includes(time)
                                        ? 'bg-[var(--amber)] text-[var(--ink)] border-[var(--amber)]'
                                        : 'bg-[var(--ink-light)] text-on-dark border-[var(--ink-light)] hover:border-[var(--amber)]'
                                }`}
                                onClick={() => toggleTime(time)}
                            >
                                {time}
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
                    <h3 className="flex items-center text-lg text-on-dark mb-3">
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
                                        : 'bg-[var(--ink-light)] text-on-dark border-[var(--ink-light)] hover:border-destructive'
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