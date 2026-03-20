// app/terms-and-pricing/page.tsx
import React from 'react';
import PricingPage from '@/components/PricingPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl ? 'Algemene Voorwaarden & Tarieven | Stephens Privelessen' : 'Terms & Pricing | Stephens Private Tutoring',
    description: isNl
      ? 'Algemene voorwaarden en tarieven voor bijles en privelessen bij Stephens Privelessen in Amsterdam.'
      : 'Terms and conditions and pricing for tutoring and private lessons at Stephens Private Tutoring in Amsterdam.',
  };
}

const page = () => {
    return (
        <>
            <PricingPage />
        </>
    );
};

export default page;