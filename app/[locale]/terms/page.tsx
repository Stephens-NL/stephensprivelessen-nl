// app/terms-and-pricing/page.tsx
import React from 'react';
import PricingPage from '@/components/PricingPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl ? "Algemene Voorwaarden & Tarieven | Stephen's Privélessen" : "Terms & Pricing | Stephen's Private Tutoring",
    description: isNl
      ? "Algemene voorwaarden en tarieven voor bijles en privelessen bij Stephen's Privélessen in Amsterdam."
      : "Terms and conditions and pricing for tutoring and private lessons at Stephen's Private Tutoring in Amsterdam.",
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