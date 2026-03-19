'use client';

import { useTranslations } from 'next-intl';
import { Bilingual, EducationLevel } from '@/data/types';
import { CustomCursor } from '@/components/shared/CustomCursor';
import { HeroSection } from '@/components/privelessen/boa-me-na-menboa-mo/HeroSection';
import { AboutSection } from '@/components/privelessen/boa-me-na-menboa-mo/AboutSection';
import { SubjectsSection } from '@/components/privelessen/boa-me-na-menboa-mo/SubjectsSection';
import { PricingSection } from '@/components/privelessen/boa-me-na-menboa-mo/PricingSection';
import { LocationSection } from '@/components/privelessen/boa-me-na-menboa-mo/LocationSection';
import { OffersSection } from '@/components/privelessen/boa-me-na-menboa-mo/OffersSection';
import Header from '@/components/Header';
import { getBusinessData } from '@/data/businessData';
import { useState } from 'react';

export default function BoaContent() {
  const t = useTranslations('boa');
  const legacyT = (obj: Record<string, string> | string) => typeof obj === 'string' ? obj : obj['EN'] || '';
  const businessData = getBusinessData(legacyT);
  const [activeLevel, setActiveLevel] = useState<string>('basis');
  const [subject, setSubject] = useState<Bilingual>(businessData.subjects.primary[0]);

  const handleLevelChange = (levelId: string) => {
    setActiveLevel(levelId);
    switch (levelId) {
      case 'basis':
        setSubject(businessData.subjects.primary[0]);
        break;
      case 'voortgezet':
        setSubject(businessData.subjects.secondary[0]);
        break;
      case 'hoger':
        setSubject(businessData.subjects.higher[0]);
        break;
    }
  };

  const educationLevels: EducationLevel[] = [
    {
      id: 'basis',
      title: t('educationLevels.primary'),
      subjects: businessData.subjects.primary,
      icon: '🎓',
      color: 'from-amber-400 to-[var(--amber-hover)]'
    },
    {
      id: 'voortgezet',
      title: t('educationLevels.secondary'),
      subjects: businessData.subjects.secondary,
      icon: '📚',
      color: 'from-[var(--amber)] to-[var(--amber-hover)]'
    },
    {
      id: 'hoger',
      title: t('educationLevels.higher'),
      subjects: [...businessData.subjects.higher, ...businessData.subjects.programming],
      icon: '🎯',
      color: 'from-[var(--amber)] to-amber-500'
    }
  ];

  return (
    <div className="min-h-screen bg-amber-950 text-white">
      <CustomCursor />
      <Header />
      <HeroSection />
      <AboutSection />
      <SubjectsSection
        educationLevels={educationLevels}
        activeLevel={activeLevel}
        setActiveLevel={handleLevelChange}
        subject={subject}
        setSubject={setSubject}
      />
      <PricingSection />
      <OffersSection
        educationLevels={educationLevels}
        activeLevel={activeLevel}
        subject={subject}
      />
      <LocationSection />
    </div>
  );
}
