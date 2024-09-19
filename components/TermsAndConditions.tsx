// components/TermsAndConditions.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CollapsibleSection } from '@/components/CollapsibleSection';
import { useTranslation } from '@/hooks/useTranslation';

const TermsAndConditions = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-4xl mx-auto bg-blue-800 rounded-lg shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="p-6">
                    <motion.h1
                        className="text-3xl font-bold text-center text-yellow-300 mb-6"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {String(t({ EN: 'Terms and Conditions', NL: 'Lesvoorwaarden' }))}
                    </motion.h1>

                    {/* Vooraf Betalen */}
                    <CollapsibleSection title={{ EN: 'Payment in Advance', NL: 'Vooraf Betalen' }}>
                        <p className="text-yellow-100 text-sm">
                            {String(t({
                                EN: 'All lessons and lesson packages must be paid in full in advance. Payment must be completed within 48 hours after booking and at least 72 hours before the start of the (first) lesson.',
                                NL: 'Alle lessen en lespakketten dienen volledig vooraf te worden betaald. Betaling moet zijn voldaan binnen 48 uur na boeking en uiterlijk 72 uur vóór aanvang van de (eerste) les.'
                            }))}
                        </p>
                    </CollapsibleSection>

                    {/* Annulering en Verplaatsing */}
                    <CollapsibleSection title={{ EN: 'Cancellation and Rescheduling', NL: 'Annulering en Verplaatsing' }}>
                        <p className="text-yellow-100 text-sm">
                            {String(t({
                                EN: 'Rescheduling a lesson is free up to 72 hours before the scheduled lesson time, with a maximum of one rescheduling per booked lesson.',
                                NL: 'Verplaatsing van een les is kosteloos mogelijk tot 72 uur voor de geplande lestijd, maximaal één keer per geboekte les.'
                            }))}
                        </p>
                        <p className="text-yellow-100 text-sm">
                            {String(t({
                                EN: 'Cancellation up to 72 hours before the scheduled lesson: 25% of the lesson fee will be charged.',
                                NL: 'Annulering tot 72 uur voor de geplande les: 25% van het lestarief wordt in rekening gebracht.'
                            }))}
                        </p>
                    </CollapsibleSection>

                    {/* Lespakketten */}
                    <CollapsibleSection title={{ EN: 'Lesson Packages', NL: 'Lespakketten' }}>
                        <p className="text-yellow-100 text-sm">
                            {String(t({
                                EN: 'Lesson packages are valid until the end of the school year in which they are purchased. Unused lessons will expire without refund.',
                                NL: 'Lespakketten zijn geldig tot het einde van het schooljaar waarin ze zijn aangeschaft. Ongebruikte lessen uit een pakket vervallen aan het einde van de geldigheidsperiode zonder restitutie.'
                            }))}
                        </p>
                    </CollapsibleSection>

                    {/* Terugbetaling */}
                    <CollapsibleSection title={{ EN: 'Refund Policy', NL: 'Terugbetaling' }}>
                        <p className="text-yellow-100 text-sm">
                            {String(t({
                                EN: 'A no-refund policy applies to all paid lessons and packages. In exceptional cases, a credit may be granted at the tutor’s discretion.',
                                NL: 'Er geldt een no-refund beleid voor alle betaalde lessen en pakketten. In uitzonderlijke gevallen kan een tegoed worden verstrekt voor toekomstige lessen, ter beoordeling van de docent.'
                            }))}
                        </p>
                    </CollapsibleSection>
                    
                    {/* Add more sections as needed for the rest of your terms */}
                </div>
            </motion.div>
        </div>
    );
};

export default TermsAndConditions;