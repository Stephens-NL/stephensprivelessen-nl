import { WelcomeScreenData } from '../../data';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import React from 'react'

const WelcomeScreen: React.FC<{ data: WelcomeScreenData; onContinue: () => void }> = ({ data, onContinue }) => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full text-center"
        >
            <motion.h1
                className="text-5xl font-bold text-white mb-6"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {t(data.title)}
            </motion.h1>
            <motion.p
                className="text-xl text-white mb-8"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                {t(data.description)}
            </motion.p>
            <motion.button
                onClick={onContinue}
                className="px-8 py-4 bg-white text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {t(data.startButtonText)}
            </motion.button>
        </motion.div>
    );
};

export default WelcomeScreen