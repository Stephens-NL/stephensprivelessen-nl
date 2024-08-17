import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import React from 'react'
import { Send } from 'lucide-react';
import { welcomeScreenData } from '../../data';

const SubmitCTA: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex flex-col items-center justify-center mt-8"
        >
            <h2 className="text-2xl font-bold text-white mb-4">{t(welcomeScreenData.submitCTA.title)}</h2>
            <p className="text-lg text-white mb-6">{t(welcomeScreenData.submitCTA.description)}</p>
            <motion.button
                onClick={onSubmit}
                className="px-8 py-4 bg-yellow-400 text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {t(welcomeScreenData.submitCTA.buttonText)}
                <Send className="ml-2" size={24} />
            </motion.button>
        </motion.div>
    );
};

export default SubmitCTA