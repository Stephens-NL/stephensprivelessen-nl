'use client';

import React from 'react';
import { m } from 'framer-motion';
import { useTranslation } from '../../../../hooks/useTranslation';
import { FaGraduationCap, FaClock, FaEuroSign, FaArrowRight, FaBook } from 'react-icons/fa';

interface InfoSectionProps {
    onBack: () => void;
    onRequestLesson: () => void;
}

const InfoSection = ({ onBack, onRequestLesson }: InfoSectionProps) => {
    const { t } = useTranslation();

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
                    className="bg-blue-700 p-6 rounded-lg"
                >
                    <div className="flex items-center text-yellow-300 mb-3">
                        <FaBook className="text-2xl mr-3" />
                        <h3 className="text-lg font-semibold">
                            {String(t({ EN: "Available Subjects", NL: "Beschikbare Vakken" }))}
                        </h3>
                    </div>
                    <div className="text-yellow-100 space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">{String(t({ EN: "Primary Education", NL: "Basisonderwijs" }))}</h4>
                            <ul className="list-disc list-inside pl-4">
                                {courses.primary.map((course) => (
                                    <li key={course}>{course}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">{String(t({ EN: "Secondary Education", NL: "Voortgezet Onderwijs" }))}</h4>
                            <ul className="list-disc list-inside pl-4">
                                {courses.secondary.map((course) => (
                                    <li key={course}>{course}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">{String(t({ EN: "Higher Education", NL: "Hoger Onderwijs" }))}</h4>
                            <ul className="list-disc list-inside pl-4">
                                {courses.higher.map((course) => (
                                    <li key={course}>{course}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">{String(t({ EN: "Programming", NL: "Programmeren" }))}</h4>
                            <p className="mb-2">{String(t({ 
                                EN: "Various programming languages and technologies including:", 
                                NL: "Verschillende programmeertalen en technologieën waaronder:" 
                            }))}</p>
                            <div className="flex flex-wrap gap-2">
                                {courses.programming.map((lang) => (
                                    <span key={lang} className="bg-blue-600 px-2 py-1 rounded text-sm">
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
                    className="bg-blue-700 p-6 rounded-lg"
                >
                    <div className="flex items-center text-yellow-300 mb-3">
                        <FaGraduationCap className="text-2xl mr-3" />
                        <h3 className="text-lg font-semibold">
                            {String(t({ EN: "Teaching Method", NL: "Lesmethode" }))}
                        </h3>
                    </div>
                    <p className="text-yellow-100">
                        {String(t({
                            EN: "I focus on understanding rather than memorization. We'll work together to build a strong foundation in the subject, using practical examples and clear explanations.",
                            NL: "Ik focus op begrip in plaats van uit het hoofd leren. We werken samen aan een sterke basis in het vak, met praktische voorbeelden en heldere uitleg."
                        }))}
                    </p>
                </m.div>

                <m.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-blue-700 p-6 rounded-lg"
                >
                    <div className="flex items-center text-yellow-300 mb-3">
                        <FaClock className="text-2xl mr-3" />
                        <h3 className="text-lg font-semibold">
                            {String(t({ EN: "Lesson Structure", NL: "Lesstructuur" }))}
                        </h3>
                    </div>
                    <p className="text-yellow-100">
                        {String(t({
                            EN: "Lessons are typically 1-2 hours long, scheduled at your convenience. We start with a free 30-minute trial lesson to assess your needs and goals.",
                            NL: "Lessen duren meestal 1-2 uur, ingepland op tijden die jou uitkomen. We beginnen met een gratis proefles van 30 minuten om je behoeften en doelen te bespreken."
                        }))}
                    </p>
                </m.div>

                <m.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-blue-700 p-6 rounded-lg"
                >
                    <div className="flex items-center text-yellow-300 mb-3">
                        <FaEuroSign className="text-2xl mr-3" />
                        <h3 className="text-lg font-semibold">
                            {String(t({ EN: "Pricing", NL: "Tarieven" }))}
                        </h3>
                    </div>
                    <p className="text-yellow-100">
                        {String(t({
                            EN: "Rates start at €50 per hour, depending on the subject level and frequency of lessons. The first 30-minute trial lesson is free.",
                            NL: "Tarieven beginnen vanaf €50 per uur, afhankelijk van het niveau en de frequentie van de lessen. De eerste proefles van 30 minuten is gratis."
                        }))}
                    </p>
                </m.div>
            </div>

            <div className="flex justify-between">
                <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-blue-700 text-yellow-300 rounded-lg hover:bg-blue-600"
                    onClick={onBack}
                >
                    {String(t({ EN: "Back", NL: "Terug" }))}
                </m.button>

                <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-6 py-3 bg-yellow-400 text-blue-900 rounded-lg hover:bg-yellow-300"
                    onClick={onRequestLesson}
                >
                    {String(t({
                        EN: "Schedule Trial Lesson",
                        NL: "Plan Proefles"
                    }))}
                    <FaArrowRight className="ml-2" />
                </m.button>
            </div>
        </m.div>
    );
};

export default InfoSection; 