'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const SignInHere = () => {
    const t = useTranslations('home');

    return (
        <p className="mt-5 text-gray-600 text-sm sm:text-base">
            {t('hero.alreadyEnrolled')}
            <a
                href="https://elo.stephensprivelessen.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black transition-all duration-200 hover:underline ml-1"
            >
                {t('hero.signInHere')}
            </a>
        </p>
    );
};

export default SignInHere;
