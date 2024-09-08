'use client';


import React from 'react'
// import { hero } from '../../data'
import { useTranslation } from '../../hooks/useTranslation'
import { Hero } from '@/data';

const SignInHere = ({ hero }: { hero: Hero }) => {

    const { already_enrolled, sign_in_here } = hero
    const { t } = useTranslation();
    return (
        <>

            <p className="mt-5 text-gray-600 text-sm sm:text-base">
                {String(t(already_enrolled))}
                <a href="#login" className="text-black transition-all duration-200 hover:underline">
                    {String(t(sign_in_here))}
                </a>
            </p>
        </>)
}

export default SignInHere