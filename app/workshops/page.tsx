'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

const WorkshopsPage = () => {
    const { t } = useTranslation();

    const workshops = [
        {
            title: { EN: 'Statistics Project Course', NL: 'Statistiek Project Cursus' },
            description: {
                EN: 'Weekly statistics workshops spread over 8 weeks, perfect for high school students working on their research projects. Small groups ensure personal attention.',
                NL: 'Wekelijkse statistiek workshops verspreid over 8 weken, perfect voor middelbare scholieren die aan hun onderzoeksprojecten werken. Kleine groepen zorgen voor persoonlijke aandacht.'
            },
            duration: { EN: '1-2 hours weekly, 8 weeks', NL: '1-2 uur wekelijks, 8 weken' },
            level: { EN: 'High School', NL: 'Middelbare School' },
            format: { EN: 'Weekly Sessions', NL: 'Wekelijkse Sessies' }
        },
        {
            title: { EN: 'Math Teachers Innovation Day', NL: 'Innovatiedag voor Wiskundedocenten' },
            description: {
                EN: 'Full-day workshop for math teachers focusing on innovative teaching methods, AI tools in education, and making complex topics accessible.',
                NL: 'Volledige dag workshop voor wiskundedocenten gericht op innovatieve onderwijsmethoden, AI-tools in het onderwijs en het toegankelijk maken van complexe onderwerpen.'
            },
            duration: { EN: 'Full day (6 hours)', NL: 'Hele dag (6 uur)' },
            level: { EN: 'Teachers', NL: 'Docenten' },
            format: { EN: 'One-day Intensive', NL: 'Eendaagse Intensief' }
        },
        {
            title: { EN: 'AI & Mathematics Integration', NL: 'AI & Wiskunde Integratie' },
            description: {
                EN: 'Half-day workshops teaching how to effectively use AI tools like ChatGPT for mathematics education. Perfect for both teachers and advanced students.',
                NL: 'Halfdaagse workshops over het effectief gebruik van AI-tools zoals ChatGPT voor wiskundeonderwijs. Perfect voor zowel docenten als gevorderde leerlingen.'
            },
            duration: { EN: 'Half day (3 hours)', NL: 'Halve dag (3 uur)' },
            level: { EN: 'Teachers & Advanced Students', NL: 'Docenten & Gevorderde Leerlingen' },
            format: { EN: 'Half-day Session', NL: 'Halve Dag Sessie' }
        },
        {
            title: { EN: 'Research Project Guidance', NL: 'Profielwerkstuk Begeleiding' },
            description: {
                EN: 'Structured support for high school students working on their research projects. From statistics to methodology, spread over multiple sessions.',
                NL: 'Gestructureerde ondersteuning voor middelbare scholieren die aan hun profielwerkstuk werken. Van statistiek tot methodologie, verspreid over meerdere sessies.'
            },
            duration: { EN: '1.5 hours weekly, 6 weeks', NL: '1,5 uur wekelijks, 6 weken' },
            level: { EN: 'High School (Final Years)', NL: 'Bovenbouw' },
            format: { EN: 'Weekly Sessions', NL: 'Wekelijkse Sessies' }
        },
        {
            title: { EN: 'Data Analysis for Teachers', NL: 'Data Analyse voor Docenten' },
            description: {
                EN: 'Learn how to teach data analysis effectively using modern tools and real-world examples. Includes practical exercises and ready-to-use lesson materials.',
                NL: 'Leer hoe je data-analyse effectief kunt onderwijzen met moderne tools en praktijkvoorbeelden. Inclusief praktische oefeningen en kant-en-klaar lesmateriaal.'
            },
            duration: { EN: '2 hours weekly, 4 weeks', NL: '2 uur wekelijks, 4 weken' },
            level: { EN: 'Teachers', NL: 'Docenten' },
            format: { EN: 'Weekly Sessions', NL: 'Wekelijkse Sessies' }
        },
        {
            title: { EN: 'Mathematics Olympiad Preparation', NL: 'Wiskunde Olympiade Voorbereiding' },
            description: {
                EN: 'Intensive preparation sessions for students participating in mathematics competitions. Focus on problem-solving strategies and advanced concepts.',
                NL: 'Intensieve voorbereidingssessies voor leerlingen die deelnemen aan wiskundewedstrijden. Focus op probleemoplossende strategieën en gevorderde concepten.'
            },
            duration: { EN: '2 hours weekly, 10 weeks', NL: '2 uur wekelijks, 10 weken' },
            level: { EN: 'Advanced Students', NL: 'Gevorderde Leerlingen' },
            format: { EN: 'Weekly Sessions', NL: 'Wekelijkse Sessies' }
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold text-blue-900 mb-8">
                        {String(t({ EN: 'Workshops', NL: 'Workshops' }))}
                    </h1>
                    <p className="text-lg text-gray-600 mb-12">
                        {String(t({
                            EN: 'Flexible workshop formats designed for schools and teachers. From single sessions to multi-week programs.',
                            NL: 'Flexibele workshop formats ontworpen voor scholen en docenten. Van enkele sessies tot meerdere weken.'
                        }))}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {workshops.map((workshop, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-blue-900 mb-3">
                                        {String(t(workshop.title))}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {String(t(workshop.description))}
                                    </p>
                                    <div className="space-y-2 text-sm text-gray-500">
                                        <div className="flex justify-between">
                                            <span>
                                                {String(t({ EN: 'Duration', NL: 'Duur' }))}:{' '}
                                                {String(t(workshop.duration))}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>
                                                {String(t({ EN: 'Format', NL: 'Format' }))}:{' '}
                                                {String(t(workshop.format))}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>
                                                {String(t({ EN: 'For', NL: 'Voor' }))}:{' '}
                                                {String(t({ EN: workshop.level.EN, NL: workshop.level.NL }))}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 py-4 bg-gray-50 border-t">
                                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
                                        {String(t({ EN: 'Request Information', NL: 'Informatie Aanvragen' }))}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-600 mb-6">
                            {String(t({
                                EN: 'Looking for a custom workshop for your school or organization? We can create a program tailored to your needs.',
                                NL: 'Op zoek naar een workshop op maat voor je school of organisatie? We kunnen een programma maken dat aan jouw wensen voldoet.'
                            }))}
                        </p>
                        <button className="bg-yellow-400 text-blue-900 py-3 px-8 rounded-md hover:bg-yellow-300 transition-colors duration-300 font-medium">
                            {String(t({ EN: 'Contact Us', NL: 'Neem Contact Op' }))}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default WorkshopsPage; 