'use client';

import React, { useRef } from 'react';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import type { Workshop, Language } from '@/data/types';
import { useLanguage } from '@/hooks/useLanguage';

interface WorkshopDetailContentProps {
    workshop: Workshop;
}

export default function WorkshopDetailContent({ workshop }: WorkshopDetailContentProps) {
    const language = useLanguage();
    const t = useTranslations('workshops');
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
                                {t('form.moreInfoScheduleNow')}
                            </button>
                            <button
                                onClick={() => router.push('/workshops')}
                                className="px-8 py-3 rounded-full bg-[var(--cream-dark)] text-[var(--warm-text)] hover:bg-[var(--border-warm)] transition-colors"
                            >
                                {t('form.backToWorkshops')}
                            </button>
                        </div>
                    </div>

                    {/* Workshop Details */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="p-6 rounded-xl bg-[var(--cream)] shadow-lg border border-[var(--border-warm)]">
                            <h2 className="text-2xl font-display font-semibold mb-4 text-[var(--ink)]">
                                {t('form.workshopDetails')}
                            </h2>
                            <ul className="space-y-3">
                                <li className="flex items-center text-[var(--warm-text)]">
                                    <span className="font-medium mr-2">{t('form.duration')}</span>
                                    {workshop.durationText[language as Language]}
                                </li>
                                <li className="flex items-center text-[var(--warm-text)]">
                                    <span className="font-medium mr-2">{t('form.level')}</span>
                                    {(language === 'NL' ? workshop.level === 'beginner' ? 'Beginner' :
                                            workshop.level === 'intermediate' ? 'Gevorderd' :
                                            workshop.level === 'advanced' ? 'Vergevorderd' :
                                            workshop.level === 'professional' ? 'Professional' : 'Alle Niveaus' : workshop.level.charAt(0).toUpperCase() + workshop.level.slice(1))}
                                </li>
                                <li className="flex items-center text-[var(--warm-text)]">
                                    <span className="font-medium mr-2">{t('form.format')}</span>
                                    {(language === 'NL' ? workshop.format === 'interactive' ? 'Interactief' :
                                            workshop.format === 'hands-on' ? 'Praktisch' :
                                            workshop.format === 'technical' ? 'Technisch' :
                                            workshop.format === 'creative' ? 'Creatief' :
                                            workshop.format === 'professional' ? 'Professioneel' :
                                            workshop.format === 'media' ? 'Media' :
                                            workshop.format === 'flexible' ? 'Flexibel' :
                                            workshop.format === 'wellness' ? 'Welzijn' : workshop.format : workshop.format.charAt(0).toUpperCase() + workshop.format.slice(1))}
                                </li>
                                {workshop.totalSessions && (
                                    <li className="flex items-center text-[var(--warm-text)]">
                                        <span className="font-medium mr-2">{t('form.totalSessions')}</span>
                                        {workshop.totalSessions}
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div className="p-6 rounded-xl bg-[var(--cream)] shadow-lg border border-[var(--border-warm)]">
                            <h2 className="text-2xl font-display font-semibold mb-4 text-[var(--ink)]">
                                {t('form.whatYoullLearn')}
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
                            {t('form.additionalInformation')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-medium mb-2">{t('form.prerequisites')}</h3>
                                <p className="text-[var(--warm-text)]">{workshop.prerequisites[language as Language]}</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">{t('form.materials')}</h3>
                                <p className="text-[var(--warm-text)]">{workshop.materials[language as Language]}</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">{t('form.location')}</h3>
                                <p className="text-[var(--warm-text)]">{workshop.location[language as Language]}</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">{t('form.price')}</h3>
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
                            {t('form.scheduleNow')}
                        </button>
                    </div>
                </m.div>
            </div>
        </div>
    );
}
