'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { m } from 'framer-motion';

import { FaGraduationCap, FaClock, FaEuroSign, FaArrowRight, FaBook } from 'react-icons/fa';

interface InfoSectionProps {
    onBack: () => void;
    onRequestLesson: () => void;
}

const InfoSection = ({ onBack, onRequestLesson }: InfoSectionProps) => {
    const t = useTranslations('contact');

    const courses = {
        primary: [
            'Rekenen',
            'Taal',
        ],
        secondary: [
            'Wiskunde A/B/C/D',
            'Natuurkunde',
            'Scheikunde',
            'Engels',
        ],
        higher: [
            'Bedrijfsstatistiek',
            'Calculus',
            'Economie',
            'Statistiek',
            'Kansberekening',
            'Lineaire Algebra',
            'Verzamelingenleer',
        ],
        programming: [
            'C', 'C#', 'C++', 'CSS', 'HTML', 'Java', 'Javascript', 
            'MATLAB', 'Python', 'R', 'React', 'SPSS', 'SQL'
        ]
    };

    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
        >
            <div className="space-y-6">
                <m.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[var(--ink-light)] p-6 rounded-lg"
                >
                    <div className="flex items-center text-[var(--amber)] mb-3">
                        <FaBook className="text-2xl mr-3" />
                        <h3 className="text-lg font-semibold">
                            {t('form.availableSubjects')}
                        </h3>
                    </div>
                    <div className="text-[var(--cream)] space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">{t('form.primaryEducation')}</h4>
                            <ul className="list-disc list-inside pl-4">
                                {courses.primary.map((course) => (
                                    <li key={course}>{course}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">{t('form.secondaryEducation')}</h4>
                            <ul className="list-disc list-inside pl-4">
                                {courses.secondary.map((course) => (
                                    <li key={course}>{course}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">{t('form.higherEducation')}</h4>
                            <ul className="list-disc list-inside pl-4">
                                {courses.higher.map((course) => (
                                    <li key={course}>{course}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">{t('form.programming')}</h4>
                            <p className="mb-2">{t('form.variousProgrammingLanguagesAndTechnologiesIncludin')}</p>
                            <div className="flex flex-wrap gap-2">
                                {courses.programming.map((lang) => (
                                    <span key={lang} className="bg-[var(--ink-light)] px-2 py-1 rounded text-sm">
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </m.div>

                <m.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[var(--ink-light)] p-6 rounded-lg"
                >
                    <div className="flex items-center text-[var(--amber)] mb-3">
                        <FaGraduationCap className="text-2xl mr-3" />
                        <h3 className="text-lg font-semibold">
                            {t('form.teachingMethod')}
                        </h3>
                    </div>
                    <p className="text-[var(--cream)]">
                        {t('form.iFocusOnUnderstandingRatherThan')}
                    </p>
                </m.div>

                <m.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[var(--ink-light)] p-6 rounded-lg"
                >
                    <div className="flex items-center text-[var(--amber)] mb-3">
                        <FaClock className="text-2xl mr-3" />
                        <h3 className="text-lg font-semibold">
                            {t('form.lessonStructure')}
                        </h3>
                    </div>
                    <p className="text-[var(--cream)]">
                        {t('form.lessonsAreTypically12HoursLongScheduledAtYourConve')}
                    </p>
                </m.div>

                <m.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[var(--ink-light)] p-6 rounded-lg"
                >
                    <div className="flex items-center text-[var(--amber)] mb-3">
                        <FaEuroSign className="text-2xl mr-3" />
                        <h3 className="text-lg font-semibold">
                            {t('form.pricing')}
                        </h3>
                    </div>
                    <p className="text-[var(--cream)]">
                        {t('form.ratesStartAt50PerHourDependingOnTheSubjectLevelAnd')}
                    </p>
                </m.div>
            </div>

            <div className="flex justify-between">
                <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-[var(--ink-light)] text-[var(--amber)] rounded-lg hover:bg-[var(--ink-light)]"
                    onClick={onBack}
                >
                    {t('form.back')}
                </m.button>

                <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-6 py-3 bg-[var(--amber)] text-[var(--ink)] rounded-lg hover:bg-[var(--amber)]"
                    onClick={onRequestLesson}
                >
                    {t('form.scheduleTrialLesson')}
                    <FaArrowRight className="ml-2" />
                </m.button>
            </div>
        </m.div>
    );
};

export default InfoSection; 