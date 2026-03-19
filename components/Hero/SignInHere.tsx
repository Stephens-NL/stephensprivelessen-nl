'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const SignInHere = () => {
    const t = useTranslations('home');

    return (
        <p className="text-[var(--muted-text)] text-sm">
            {t('hero.alreadyEnrolled')}
            <a
                href="https://dash.stephensprivelessen.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--ink)] font-medium hover:text-[var(--amber)] transition-colors ml-1 underline underline-offset-2 decoration-[var(--border-warm)] hover:decoration-[var(--amber)]"
            >
                {t('hero.signInHere')}
            </a>
        </p>
    );
};

export default SignInHere;
