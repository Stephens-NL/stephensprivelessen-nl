'use client';

import React, { useRef } from 'react';
import { m } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { Workshop, Language } from '@/data/types';

interface WorkshopDetailContentProps {
    workshop: Workshop;
}

export default function WorkshopDetailContent({ workshop }: WorkshopDetailContentProps) {
    const locale = useLocale();
  const language = locale.toUpperCase() as 'EN' | 'NL';
  const t = (obj: Record<string, string> | string) => typeof obj === 'string' ? obj : obj[language] || obj['EN'] || '';
    const router = useRouter();
    const contactSectionRef = useRef<HTMLDivElement>(null);

    const handleRequestInfo = (scrollToContact: boolean = false) => {
        if (scrollToContact && contactSectionRef.current) {
            contactSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        } else {
            router.push(`/contact?workshop=${workshop.id}`);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--cream)]">
            <div className="container mx-auto px-4 py-12">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-[var(--ink)]">
                            {workshop.title[language as Language]}
                        </h1>
                        <p className="text-xl text-[var(--muted-text)] mb-8">
                            {workshop.description?.[language as Language] || ''}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => handleRequestInfo(true)}
                                className="px-8 py-3 rounded-full bg-[var(--ink)] text-[var(--cream)] hover:bg-[var(--ink-light)] transition-colors"
                            >
                                {String(t({ EN: 'More Info & Schedule Now', NL: 'Meer Info & Plan Nu' }))}
                            </button>
                            <button
                                onClick={() => router.push('/workshops')}
                                className="px-8 py-3 rounded-full bg-[var(--cream-dark)] text-[var(--warm-text)] hover:bg-[var(--border-warm)] transition-colors"
                            >
                                {String(t({ EN: 'Back to Workshops', NL: 'Terug naar Workshops' }))}
                            </button>
                        </div>
                    </div>

                    {/* Workshop Details */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="p-6 rounded-xl bg-[var(--cream)] shadow-lg border border-[var(--border-warm)]">
                            <h2 className="text-2xl font-display font-semibold mb-4 text-[var(--ink)]">
                                {String(t({ EN: 'Workshop Details', NL: 'Workshop Details' }))}
                            </h2>
                            <ul className="space-y-3">
                                <li className="flex items-center text-[var(--warm-text)]">
                                    <span className="font-medium mr-2">{String(t({ EN: 'Duration:', NL: 'Duur:' }))}</span>
                                    {workshop.durationText[language as Language]}
                                </li>
                                <li className="flex items-center text-[var(--warm-text)]">
                                    <span className="font-medium mr-2">{String(t({ EN: 'Level:', NL: 'Niveau:' }))}</span>
                                    {String(t({
                                        EN: workshop.level.charAt(0).toUpperCase() + workshop.level.slice(1),
                                        NL: workshop.level === 'beginner' ? 'Beginner' :
                                            workshop.level === 'intermediate' ? 'Gevorderd' :
                                            workshop.level === 'advanced' ? 'Vergevorderd' :
                                            workshop.level === 'professional' ? 'Professional' : 'Alle Niveaus'
                                    }))}
                                </li>
                                <li className="flex items-center text-[var(--warm-text)]">
                                    <span className="font-medium mr-2">{String(t({ EN: 'Format:', NL: 'Format:' }))}</span>
                                    {String(t({
                                        EN: workshop.format.charAt(0).toUpperCase() + workshop.format.slice(1),
                                        NL: workshop.format === 'interactive' ? 'Interactief' :
                                            workshop.format === 'hands-on' ? 'Praktisch' :
                                            workshop.format === 'technical' ? 'Technisch' :
                                            workshop.format === 'creative' ? 'Creatief' :
                                            workshop.format === 'professional' ? 'Professioneel' :
                                            workshop.format === 'media' ? 'Media' :
                                            workshop.format === 'flexible' ? 'Flexibel' :
                                            workshop.format === 'wellness' ? 'Welzijn' : workshop.format
                                    }))}
                                </li>
                                {workshop.totalSessions && (
                                    <li className="flex items-center text-[var(--warm-text)]">
                                        <span className="font-medium mr-2">{String(t({ EN: 'Total Sessions:', NL: 'Totaal Sessies:' }))}</span>
                                        {workshop.totalSessions}
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div className="p-6 rounded-xl bg-[var(--cream)] shadow-lg border border-[var(--border-warm)]">
                            <h2 className="text-2xl font-display font-semibold mb-4 text-[var(--ink)]">
                                {String(t({ EN: 'What You\'ll Learn', NL: 'Wat Je Leert' }))}
                            </h2>
                            <ul className="space-y-2">
                                {workshop.details[language as Language].map((detail: string) => (
                                    <li key={detail} className="flex items-start">
                                        <span className="mr-2 text-[var(--amber)]">&bull;</span>
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="p-6 rounded-xl bg-[var(--cream)] shadow-lg border border-[var(--border-warm)] mb-12">
                        <h2 className="text-2xl font-display font-semibold mb-4 text-[var(--ink)]">
                            {String(t({ EN: 'Additional Information', NL: 'Aanvullende Informatie' }))}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-medium mb-2">{String(t({ EN: 'Prerequisites', NL: 'Voorvereisten' }))}</h3>
                                <p className="text-[var(--warm-text)]">{workshop.prerequisites[language as Language]}</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">{String(t({ EN: 'Materials', NL: 'Materialen' }))}</h3>
                                <p className="text-[var(--warm-text)]">{workshop.materials[language as Language]}</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">{String(t({ EN: 'Location', NL: 'Locatie' }))}</h3>
                                <p className="text-[var(--warm-text)]">{workshop.location[language as Language]}</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">{String(t({ EN: 'Price', NL: 'Prijs' }))}</h3>
                                <p className="text-[var(--warm-text)]">{workshop.price[language as Language]}</p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div ref={contactSectionRef} className="text-center">
                        <button
                            onClick={() => handleRequestInfo(false)}
                            className="px-8 py-3 rounded-full bg-[var(--ink)] text-[var(--cream)] hover:bg-[var(--ink-light)] transition-colors"
                        >
                            {String(t({ EN: 'Schedule Now', NL: 'Plan Nu In' }))}
                        </button>
                    </div>
                </m.div>
            </div>
        </div>
    );
}
