'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaCalendarCheck } from 'react-icons/fa';
import { useTranslation } from '../../../hooks/useTranslation';

interface InitialChoiceProps {
    onChooseInfo: () => void;
    onChooseLesson: () => void;
}

const InitialChoice = ({ onChooseInfo, onChooseLesson }: InitialChoiceProps) => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
        >
            <p className="text-center text-yellow-100 mb-8">
                {String(t({
                    EN: "Would you like to learn more about my teaching methods or schedule a trial lesson right away?",
                    NL: "Wil je meer weten over mijn lesmethoden of direct een proefles inplannen?"
                }))}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center p-6 bg-blue-700 rounded-lg text-yellow-300 hover:bg-blue-600 transition-colors border-2 border-blue-600 hover:border-yellow-400"
                    onClick={onChooseInfo}
                >
                    <FaInfoCircle className="text-3xl mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                        {String(t({
                            EN: "More Information",
                            NL: "Meer Informatie"
                        }))}
                    </h3>
                    <p className="text-sm text-center opacity-80">
                        {String(t({
                            EN: "Learn about my teaching methods, subjects, and pricing",
                            NL: "Leer meer over mijn lesmethoden, vakken en tarieven"
                        }))}
                    </p>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center p-6 bg-yellow-400 rounded-lg text-blue-900 hover:bg-yellow-300 transition-colors border-2 border-yellow-500"
                    onClick={onChooseLesson}
                >
                    <FaCalendarCheck className="text-3xl mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                        {String(t({
                            EN: "Schedule Trial Lesson",
                            NL: "Plan Proefles"
                        }))}
                    </h3>
                    <p className="text-sm text-center opacity-80">
                        {String(t({
                            EN: "Book a free 30-minute trial lesson now",
                            NL: "Plan direct een gratis proefles van 30 minuten"
                        }))}
                    </p>
                </motion.button>
            </div>
        </motion.div>
    );
};

export default InitialChoice; 