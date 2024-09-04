'use client';


import { Hero } from '@/data';
import { useTranslation } from '../hooks/useTranslation'
import { motion } from 'framer-motion'
import React from 'react'

const ButtonTrial = ({ hero }: { hero: Hero }) => {
    const { schedulefreetrial } = hero
    const { t: translation } = useTranslation()
    return (
        <>
            <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-3 sm:px-6 sm:py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
                role="button"
            >
                {String(translation(schedulefreetrial))}
                <svg className="w-4 h-4 sm:w-6 sm:h-6 ml-4 sm:ml-8 -mr-1 sm:-mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </motion.a>
        </>
    )
}

export default ButtonTrial