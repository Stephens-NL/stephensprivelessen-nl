// app/terms-and-pricing/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import PricingPage from '@/components/PricingPage';

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden & Tarieven | Stephens Privelessen',
  description: 'Algemene voorwaarden en tarieven voor bijles en privelessen bij Stephens Privelessen in Amsterdam.',
};

const page = () => {
    return (
        <>
            <PricingPage />
        </>
    );
};

export default page;