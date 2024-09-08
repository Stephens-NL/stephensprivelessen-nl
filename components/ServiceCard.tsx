import React, { useContext } from 'react';
import Image from 'next/image';
// import { ServiceCardProps } from '@/data/siteData';
import { ServiceCardProps } from '../data';
import { useTranslation } from '../hooks/useTranslation';


const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  const { t } = useTranslation()
  const displayedTitle = t(title);
  const displayedDescription = t(description);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl">
      <Image 
        src={icon} 
        alt={`${displayedTitle} icon`} 
        width={80} 
        height={80} 
        className="mb-4 mx-auto" 
      />
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{String(displayedTitle)}</h3>
      <p className="text-gray-600">{String(displayedDescription)}</p>
    </div>
  );
};

export default ServiceCard;