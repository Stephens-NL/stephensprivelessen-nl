import type { Metadata } from 'next';
import WorkshopsContent from '@/components/workshops/WorkshopsContent';

export const metadata: Metadata = {
    title: 'Workshops | Wiskunde, Statistiek & Creatieve Vaardigheden',
    description: 'Ontdek onze interactieve workshops voor wiskunde, statistiek en creatieve vaardigheden. Kleine groepen, flexibele planning en expert begeleiding in Amsterdam.',
    keywords: ['workshops', 'wiskunde workshops', 'statistiek workshops', 'creatieve workshops', 'amsterdam workshops', 'bijles workshops'],
    openGraph: {
        title: 'Workshops | Wiskunde, Statistiek & Creatieve Vaardigheden',
        description: 'Ontdek onze interactieve workshops voor wiskunde, statistiek en creatieve vaardigheden. Kleine groepen, flexibele planning en expert begeleiding in Amsterdam.',
        url: 'https://www.stephensprivelessen.nl/workshops',
        type: 'website',
        images: [
            {
                url: '/workshops-og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Stephens Privelessen Workshops',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Workshops | Wiskunde, Statistiek & Creatieve Vaardigheden',
        description: 'Interactieve workshops voor wiskunde, statistiek en creatieve vaardigheden.',
        images: ['/workshops-og-image.jpg'],
    },
};

export default function WorkshopsPage() {
    return <WorkshopsContent />;
} 