'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../../../hooks/useTranslation';
import { FaGraduationCap, FaClock, FaEuroSign, FaArrowRight } from 'react-icons/fa';

interface InfoSectionProps {
    onBack: () => void;
    onRequestLesson: () => void;
}

const InfoSection = ({ onBack, onRequestLesson }: InfoSectionProps) => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
        >
            <div className="space-y-6">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
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
                </motion.div>

                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
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
                </motion.div>

                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
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
                </motion.div>
            </div>

            <div className="flex justify-between">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-blue-700 text-yellow-300 rounded-lg hover:bg-blue-600"
                    onClick={onBack}
                >
                    {String(t({ EN: "Back", NL: "Terug" }))}
                </motion.button>

                <motion.button
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
                </motion.button>
            </div>
        </motion.div>
    );
};

export default InfoSection; 