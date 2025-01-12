'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { useRouter } from 'next/navigation';
import workshopsData from '@/data/workshopsData';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import type { Workshop, Language } from '@/data/types';

interface WorkshopDetailContentProps {
    id: string;
}

export default function WorkshopDetailContent({ id }: WorkshopDetailContentProps) {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const router = useRouter();

    const workshop = workshopsData[id];

    if (!workshop) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        {String(t({ EN: 'Workshop Not Found', NL: 'Workshop Niet Gevonden' }))}
                    </h1>
                    <button
                        onClick={() => router.push('/workshops')}
                        className="text-blue-600 hover:text-blue-700"
                    >
                        {String(t({ EN: 'Return to Workshops', NL: 'Terug naar Workshops' }))}
                    </button>
                </div>
            </div>
        );
    }

    const isCreative = workshop.type === 'creative';
    const baseColorClass = isCreative ? 'purple' : 'blue';

    const handleRequestInfo = () => {
        router.push(`/contact?workshop=${id}`);
    };

    return (
        <div className={cn("min-h-screen", isCreative ? "bg-purple-50/30" : "bg-blue-50/30")}>
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <button
                        onClick={() => router.push('/workshops')}
                        className={cn(
                            "mb-8 flex items-center",
                            isCreative ? "text-purple-600 hover:text-purple-700" : "text-blue-600 hover:text-blue-700"
                        )}
                        aria-label={String(t({ EN: 'Back to Workshops overview', NL: 'Terug naar Workshop overzicht' }))}
                    >
                        ← {String(t({ EN: 'Back to Workshops', NL: 'Terug naar Workshops' }))}
                    </button>

                    <article className="bg-white rounded-lg shadow-lg p-8">
                        <header>
                            <div className="inline-flex gap-2 mb-6" role="group" aria-label={String(t({ EN: 'Workshop categories', NL: 'Workshop categorieën' }))}>
                                <span className={cn(
                                    "text-sm font-medium px-3 py-1 rounded-full",
                                    isCreative ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"
                                )}>
                                    {String(t(workshop.format))}
                                </span>
                                <span className={cn(
                                    "text-sm font-medium px-3 py-1 rounded-full",
                                    isCreative ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"
                                )}>
                                    {String(t({ 
                                        EN: isCreative ? 'Creative' : 'Academic',
                                        NL: isCreative ? 'Creatief' : 'Academisch'
                                    }))}
                                </span>
                            </div>
                            
                            <h1 className={cn(
                                "text-4xl font-bold mb-6",
                                isCreative ? "text-purple-900" : "text-blue-900"
                            )}>
                                {String(t(workshop.title))}
                            </h1>
                        </header>
                        
                        <div className="text-lg text-gray-600 mb-8" role="doc-subtitle">
                            {String(t(workshop.description))}
                        </div>

                        <section aria-label={String(t({ EN: 'Workshop details', NL: 'Workshop details' }))} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className={cn(
                                "p-4 rounded-lg",
                                isCreative ? "bg-purple-50/50" : "bg-blue-50/50"
                            )}>
                                <h3 className="font-semibold text-gray-700 mb-2">
                                    {String(t({ EN: 'Duration', NL: 'Duur' }))}
                                </h3>
                                <p className="text-gray-600">{String(t(workshop.durationText))}</p>
                            </div>
                            <div className={cn(
                                "p-4 rounded-lg",
                                isCreative ? "bg-purple-50/50" : "bg-blue-50/50"
                            )}>
                                <h3 className="font-semibold text-gray-700 mb-2">
                                    {String(t({ EN: 'Format', NL: 'Format' }))}
                                </h3>
                                <p className="text-gray-600">{String(t(workshop.format))}</p>
                            </div>
                            <div className={cn(
                                "p-4 rounded-lg",
                                isCreative ? "bg-purple-50/50" : "bg-blue-50/50"
                            )}>
                                <h3 className="font-semibold text-gray-700 mb-2">
                                    {String(t({ EN: 'For', NL: 'Voor' }))}
                                </h3>
                                <p className="text-gray-600">{String(t(workshop.level))}</p>
                            </div>
                        </section>

                        {(workshop.prerequisites || workshop.materials || workshop.location || workshop.maxParticipants) && (
                            <section aria-label={String(t({ EN: 'Additional Information', NL: 'Aanvullende Informatie' }))} className="mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {workshop.prerequisites && (
                                        <div className={cn(
                                            "p-4 rounded-lg",
                                            isCreative ? "bg-purple-50/50" : "bg-blue-50/50"
                                        )}>
                                            <h3 className="font-semibold text-gray-700 mb-2">
                                                {String(t({ EN: 'Prerequisites', NL: 'Vereisten' }))}
                                            </h3>
                                            <p className="text-gray-600">{String(t(workshop.prerequisites))}</p>
                                        </div>
                                    )}
                                    {workshop.materials && (
                                        <div className={cn(
                                            "p-4 rounded-lg",
                                            isCreative ? "bg-purple-50/50" : "bg-blue-50/50"
                                        )}>
                                            <h3 className="font-semibold text-gray-700 mb-2">
                                                {String(t({ EN: 'Materials', NL: 'Materialen' }))}
                                            </h3>
                                            <p className="text-gray-600">{String(t(workshop.materials))}</p>
                                        </div>
                                    )}
                                    {workshop.location && (
                                        <div className={cn(
                                            "p-4 rounded-lg",
                                            isCreative ? "bg-purple-50/50" : "bg-blue-50/50"
                                        )}>
                                            <h3 className="font-semibold text-gray-700 mb-2">
                                                {String(t({ EN: 'Location', NL: 'Locatie' }))}
                                            </h3>
                                            <p className="text-gray-600">{String(t(workshop.location))}</p>
                                        </div>
                                    )}
                                    {workshop.maxParticipants && (
                                        <div className={cn(
                                            "p-4 rounded-lg",
                                            isCreative ? "bg-purple-50/50" : "bg-blue-50/50"
                                        )}>
                                            <h3 className="font-semibold text-gray-700 mb-2">
                                                {String(t({ EN: 'Maximum Participants', NL: 'Maximum Aantal Deelnemers' }))}
                                            </h3>
                                            <p className="text-gray-600">{workshop.maxParticipants}</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        <section aria-label={String(t({ EN: 'Workshop content', NL: 'Workshop inhoud' }))} className="mb-8">
                            <h2 className={cn(
                                "text-2xl font-semibold mb-4",
                                isCreative ? "text-purple-900" : "text-blue-900"
                            )}>
                                {String(t({ EN: 'What to Expect', NL: 'Wat kun je verwachten' }))}
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                {workshop.details[language as Language]?.map((detail: string, index: number) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                        </section>

                        <footer className="flex justify-center">
                            <button
                                onClick={handleRequestInfo}
                                className={cn(
                                    "text-white py-3 px-8 rounded-xl transition-all duration-300 font-medium shadow-sm hover:shadow-md",
                                    isCreative 
                                        ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                                        : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                                )}
                                aria-label={String(t({ EN: 'Request information about this workshop', NL: 'Informatie aanvragen over deze workshop' }))}
                            >
                                {String(t({ EN: 'Request Information', NL: 'Informatie Aanvragen' }))}
                            </button>
                        </footer>
                    </article>
                </motion.div>
            </div>
        </div>
    );
} 