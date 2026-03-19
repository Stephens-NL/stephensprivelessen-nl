import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface ServiceCardProps {
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

const ServiceCard = ({ icon, titleKey, descriptionKey }: ServiceCardProps) => {
  const t = useTranslations('services');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl">
      <Image
        src={icon}
        alt={`${t(titleKey)} icon`}
        width={80}
        height={80}
        className="mb-4 mx-auto"
      />
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{t(titleKey)}</h3>
      <p className="text-gray-600">{t(descriptionKey)}</p>
    </div>
  );
};

export default ServiceCard;
