// app/services/page.tsx
import type { Metadata } from 'next';
import Services from '@/components/Services';

export const metadata: Metadata = {
    title: 'Diensten | Stephens Privelessen Amsterdam',
    description: 'Professionele bijles, workshops en consultancy in Amsterdam. Gespecialiseerd in wiskunde, programmeren en creatieve vaardigheden.',
    keywords: [
        'bijles amsterdam',
        'wiskunde bijles',
        'programmeerles',
        'workshops amsterdam',
        'creatieve workshops',
        'academische workshops',
        'consultancy',
        'educatieve diensten'
    ],
    openGraph: {
        title: 'Diensten | Stephens Privelessen Amsterdam',
        description: 'Professionele bijles, workshops en consultancy in Amsterdam. Gespecialiseerd in wiskunde, programmeren en creatieve vaardigheden.',
        url: 'https://www.stephensprivelessen.nl/services',
        type: 'website',
    },
};

export default function ServicesPage() {
    return <Services />;
}