import { m } from 'framer-motion';
import { PersonalIntermezzo } from '../../data';
import { useLocale } from 'next-intl';
import React from 'react'

const PersonalIntermezzoComponent: React.FC<{ intermezzo: PersonalIntermezzo }> = ({ intermezzo }) => {
    const locale = useLocale();
    const language = locale === 'nl' ? 'NL' : 'EN';

    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[var(--cream)] bg-opacity-10 p-6 rounded-md mb-6"
        >
            <h3 className="text-2xl font-semibold mb-4 text-white">{intermezzo.title[language]}</h3>
            <p className="text-white">{intermezzo.content[language]}</p>
        </m.div>
    );
};

export default PersonalIntermezzoComponent;