import { m } from 'framer-motion';
import { PersonalIntermezzo } from '../../data';
import { useLocale } from 'next-intl';
import React from 'react'

const PersonalIntermezzoComponent: React.FC<{ intermezzo: PersonalIntermezzo }> = ({ intermezzo }) => {
    const locale = useLocale();
  const language = locale.toUpperCase() as 'EN' | 'NL';
  const t = (obj: Record<string, string> | string) => typeof obj === 'string' ? obj : obj[language] || obj['EN'] || '';

    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white bg-opacity-10 p-6 rounded-md mb-6"
        >
            <h3 className="text-2xl font-semibold mb-4 text-white">{String(t(intermezzo.title))}</h3>
            <p className="text-white">{String(t(intermezzo.content))}</p>
        </m.div>
    );
};

export default PersonalIntermezzoComponent;