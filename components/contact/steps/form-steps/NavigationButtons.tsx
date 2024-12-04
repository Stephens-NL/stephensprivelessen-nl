'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useTranslation } from '../../../../hooks/useTranslation';

interface NavigationButtonsProps {
    onBack: () => void;
    onNext: () => void;
    isFirst: boolean;
    isLast: boolean;
    disabled?: boolean;
}

const NavigationButtons = ({ onBack, onNext, isFirst, isLast, disabled }: NavigationButtonsProps) => {
    const { t } = useTranslation();

    return (
        <div className="flex justify-between mt-8">
            {!isFirst && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-4 py-2 bg-blue-700 text-yellow-300 rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={onBack}
                >
                    <FaArrowLeft className="mr-2" />
                    {String(t({ EN: "Back", NL: "Terug" }))}
                </motion.button>
            )}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ml-auto ${
                    disabled
                        ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                        : 'bg-yellow-400 text-blue-900 hover:bg-yellow-300'
                }`}
                onClick={onNext}
                disabled={disabled}
            >
                {isLast 
                    ? String(t({ EN: "Submit", NL: "Versturen" }))
                    : String(t({ EN: "Next", NL: "Volgende" }))}
                {!isLast && <FaArrowRight className="ml-2" />}
            </motion.button>
        </div>
    );
};

export default NavigationButtons;