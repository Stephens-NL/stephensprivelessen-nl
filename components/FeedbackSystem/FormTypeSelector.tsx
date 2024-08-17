import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { Clock, ClipboardList } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FormTypeSelectorProps, welcomeScreenData } from '../../data';

export const FormTypeSelector: React.FC<FormTypeSelectorProps> = ({ onSelectFormType }) => {
  const { t } = useTranslation();
  // const { language } = useLanguage();
  
  const formTypes = {
    short: {
      title: t(welcomeScreenData.lengthSelection.shortOption),
      description: t({
        EN: "Perfect if you're short on time. Just a few quick questions to give me an idea of how I'm doing.",
        NL: "Perfect als je weinig tijd hebt. Slechts een paar korte vragen om mij een idee te geven van hoe het gaat.",
      }),
      icon: Clock,
    },
    long: {
      title: t(welcomeScreenData.lengthSelection.longOption),
      description: t({
        EN: "Ideal if you have more time. This version includes additional questions where I share more about myself, allowing for more in-depth feedback.",
        NL: "Ideaal als je meer tijd hebt. Deze versie bevat extra vragen waarin ik meer over mezelf vertel, waardoor je dieper kunt ingaan op de feedback.",
      }),
      icon: ClipboardList,
    }
  };

  return (
    <div className="text-center">
      <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0 md:space-x-4">
        {(Object.keys(formTypes) as Array<keyof typeof formTypes>).map((type) => {
          const { title, description, icon: Icon } = formTypes[type];
          return (
            <motion.button
              key={type}
              onClick={() => onSelectFormType(type)}
              className="w-full md:w-64 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-left"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center mb-2">
                <Icon className="mr-2 text-blue-900" size={24} />
                <h3 className="text-xl font-bold text-blue-900">{title}</h3>
              </div>
              <p className="text-gray-600">{description}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default FormTypeSelector;