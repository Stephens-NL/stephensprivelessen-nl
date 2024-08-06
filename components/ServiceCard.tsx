import React, { useContext } from 'react';
import Image from 'next/image';
// import { ServiceCardProps } from '@/data/siteData';
import { ServiceCardProps } from '@/data/types';
import { LanguageContext } from '@/contexts/LanguageContext';


const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  const { language } = useContext(LanguageContext);
  const displayedTitle = language === 'EN' ? title.EN : title.NL;
  const displayedDescription = language === 'EN' ? description.EN : description.NL;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl">
      <Image 
        src={icon} 
        alt={`${displayedTitle} icon`} 
        width={80} 
        height={80} 
        className="mb-4 mx-auto" 
      />
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{displayedTitle}</h3>
      <p className="text-gray-600">{displayedDescription}</p>
    </div>
  );
};

export default ServiceCard;