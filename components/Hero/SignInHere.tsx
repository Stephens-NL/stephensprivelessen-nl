'use client';


import React from 'react'
import { hero } from '../../data'
import { useTranslation } from '../../hooks/useTranslation'

const SignInHere = () => {
    const {already_enrolled, sign_in_here} = hero
    const {t : translation} = useTranslation();
    return (
        <>

            <p className="mt-5 text-gray-600 text-sm sm:text-base">
                {translation(already_enrolled)}
                <a href="#login" className="text-black transition-all duration-200 hover:underline">
                    {translation(sign_in_here)}
                </a>
            </p>
        </>)
}

export default SignInHere