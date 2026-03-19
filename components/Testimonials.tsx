'use client';

import React from 'react'
import { useTranslations } from 'next-intl';
import Testimonial from './Testimonial'

const Testimonials = () => {
    const t = useTranslations('home');
    // Get the number of testimonial items from translations
    const items = [0, 1, 2]; // Fixed array matching message file entries

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Wat Onze Studenten Zeggen</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((index) => (
                        <Testimonial
                            key={index}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>)
}

export default Testimonials
