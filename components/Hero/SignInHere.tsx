'use client';

import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { hero } from '@/data/hero';

const SignInHere = () => {
    const { already_enrolled, sign_in_here } = hero;
    const { t } = useTranslation();
    
    return (
        <p className="mt-5 text-gray-600 text-sm sm:text-base">
            {String(t(already_enrolled))}
            <a 
                href="https://elo.stephensprivelessen.nl" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-black transition-all duration-200 hover:underline ml-1"
            >
                {String(t(sign_in_here))}
            </a>
        </p>
    );
};

export default SignInHere;