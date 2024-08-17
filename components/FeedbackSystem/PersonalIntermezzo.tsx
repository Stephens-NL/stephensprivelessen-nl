import { motion } from 'framer-motion';
import { PersonalIntermezzo } from '../../data';
import { useTranslation } from '../../hooks/useTranslation';
import React from 'react'

const PersonalIntermezzoComponent: React.FC<{ intermezzo: PersonalIntermezzo }> = ({ intermezzo }) => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white bg-opacity-10 p-6 rounded-md mb-6"
        >
            <h3 className="text-2xl font-semibold mb-4 text-white">{t(intermezzo.title)}</h3>
            <p className="text-white">{t(intermezzo.content)}</p>
        </motion.div>
    );
};

export default PersonalIntermezzoComponent;