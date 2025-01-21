'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { weekendLocations } from '@/data/weekendTutoring';
import { WeekendLocation, Bilingual, EducationLevel } from '@/data/types';
import { CustomCursor } from '../../../components/shared/CustomCursor';
import { HeroSection } from '../../../components/privelessen/boa-me-na-menboa-mo/HeroSection';
import { AboutSection } from '../../../components/privelessen/boa-me-na-menboa-mo/AboutSection';
import { SubjectsSection } from '../../../components/privelessen/boa-me-na-menboa-mo/SubjectsSection';
import { PricingSection } from '../../../components/privelessen/boa-me-na-menboa-mo/PricingSection';
import { LocationSection } from '../../../components/privelessen/boa-me-na-menboa-mo/LocationSection';
import { OffersSection } from '../../../components/privelessen/boa-me-na-menboa-mo/OffersSection';
import Header from '@/components/Header';
import { getBusinessData } from '@/data/businessData';
import { useState } from 'react';

// Get the content for this page
const content = weekendLocations.find(loc => loc.id === 'boa-me-na-menboa-mo') as WeekendLocation;
if (!content) throw new Error('Content not found for boa-me-na-menboa-mo');

export default function Page() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const businessData = getBusinessData(t);
  const [activeLevel, setActiveLevel] = useState<string>('basis');
  const [subject, setSubject] = useState<Bilingual>(businessData.subjects.primary[0]);

  // Update subject when level changes
  const handleLevelChange = (levelId: string) => {
    setActiveLevel(levelId);
    // Set the first subject of the new level
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
      title: language === 'NL' ? 'Basisonderwijs' : 'Primary Education',
      subjects: businessData.subjects.primary,
      icon: '🎓',
      color: 'from-amber-400 to-yellow-400'
    },
    {
      id: 'voortgezet',
      title: language === 'NL' ? 'Voortgezet Onderwijs' : 'Secondary Education',
      subjects: businessData.subjects.secondary,
      icon: '📚',
      color: 'from-yellow-400 to-yellow-500'
    },
    {
      id: 'hoger',
      title: language === 'NL' ? 'Hoger Onderwijs' : 'Higher Education',
      subjects: [...businessData.subjects.higher, ...businessData.subjects.programming],
      icon: '🎯',
      color: 'from-yellow-500 to-amber-500'
    }
  ];

  return (
    <div className="min-h-screen bg-amber-950 text-white">
      <CustomCursor />
      <Header />
      <HeroSection content={content} />
      <AboutSection content={content} />
      <SubjectsSection 
        educationLevels={educationLevels}
        activeLevel={activeLevel}
        setActiveLevel={handleLevelChange}
        subject={subject}
        setSubject={setSubject}
      />
      <PricingSection content={content} />
      <OffersSection 
        content={content} 
        educationLevels={educationLevels}
        activeLevel={activeLevel}
        subject={subject}
      />
      <LocationSection content={content} /> 
    </div>
  );
} 