'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../../Contact';
import { useTranslation } from '../../../../hooks/useTranslation';
import { FaLaptop, FaUserFriends } from 'react-icons/fa';

interface LocationChoiceProps {
    formData: FormData;
    onUpdate: (updates: Partial<FormData>) => void;
}

const LocationChoice = ({ formData, onUpdate }: LocationChoiceProps) => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-semibold text-yellow-300 mb-4">
                {String(t({ EN: "Lesson Location", NL: "Leslocatie" }))}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 rounded-lg border-2 transition-colors ${
                        formData.isOnline
                            ? 'bg-yellow-400 text-blue-900 border-yellow-500'
                            : 'bg-blue-700 text-yellow-300 border-blue-600 hover:border-yellow-400'
                    }`}
                    onClick={() => onUpdate({ isOnline: true })}
                >
                    <FaLaptop className="text-3xl mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                        {String(t({ EN: "Online Lessons", NL: "Online Lessen" }))}
                    </h3>
                    <p className="text-sm opacity-80">
                        {String(t({
                            EN: "Via Zoom or Google Meet",
                            NL: "Via Zoom of Google Meet"
                        }))}
                    </p>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 rounded-lg border-2 transition-colors ${
                        !formData.isOnline
                            ? 'bg-yellow-400 text-blue-900 border-yellow-500'
                            : 'bg-blue-700 text-yellow-300 border-blue-600 hover:border-yellow-400'
                    }`}
                    onClick={() => onUpdate({ isOnline: false })}
                >
                    <FaUserFriends className="text-3xl mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                        {String(t({ EN: "In-Person Lessons", NL: "Fysieke Lessen" }))}
                    </h3>
                    <p className="text-sm opacity-80">
                        {String(t({
                            EN: "At your location or mine",
                            NL: "Bij jou of bij mij"
                        }))}
                    </p>
                </motion.button>
            </div>
        </motion.div>
    );
};

export default LocationChoice;