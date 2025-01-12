// src/data/terms.ts

import { Bilingual } from './types';

interface Term {
    title: Bilingual;
    content: Bilingual[];
}

export const terms: Term[] = [
    {
        title: { EN: "Payment in Advance", NL: "Vooraf Betalen" },
        content: [
            {
                EN: "Payment must be made in advance.",
                NL: "Betaling dient vooraf te geschieden."
            },
            {
                EN: "Payment can be made via bank transfer or cash.",
                NL: "Betaling kan via bankoverschrijving of contant."
            },
            {
                EN: "If payment is not made on time, the lesson may be cancelled.",
                NL: "Bij niet tijdige betaling kan de les worden geannuleerd."
            }
        ]
    },
    {
        title: { EN: "Cancellation and Rescheduling", NL: "Annulering en Verplaatsing" },
        content: [
            {
                EN: "Cancellation is free up to 24 hours before the start of the lesson.",
                NL: "Annulering is kosteloos tot 24 uur voor aanvang van de les."
            },
            {
                EN: "For cancellations within 24 hours before the start, 50% will be charged.",
                NL: "Bij annulering binnen 24 uur voor aanvang wordt 50% in rekening gebracht."
            },
            {
                EN: "In case of no-show, the full amount will be charged.",
                NL: "Bij no-show wordt het volledige bedrag in rekening gebracht."
            },
            {
                EN: "Rescheduling a lesson is possible in consultation.",
                NL: "Verplaatsen van een les is mogelijk in overleg."
            },
            {
                EN: "In case of illness, a new appointment will be made in consultation.",
                NL: "Bij ziekte wordt in overleg een nieuwe afspraak gemaakt."
            }
        ]
    }
];