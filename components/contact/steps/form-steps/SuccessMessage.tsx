'use client';

import { useTranslations } from 'next-intl';
import { useLanguage } from '@/hooks/useLanguage';
import React from 'react';
import { m } from 'framer-motion';
import { FaCheck, FaWhatsapp } from 'react-icons/fa';

import { FormData } from '../../Contact';

interface SuccessMessageProps {
    formData: FormData;
}

const SuccessMessage = ({ formData }: SuccessMessageProps) => {
    const language = useLanguage();
    const isNl = language === 'NL';
    const t = useTranslations('contact');

    const getContactPerson = () => {
        if (formData.age < 18) {
            switch (formData.contactPreference) {
                case 'parent':
                    return isNl ? `je ouder/verzorger (${formData.parentName})` : `your parent/guardian (${formData.parentName})`;
                case 'both':
                    return t('form.bothYouAndYourParentguardian');
                default:
                    return t('form.you');
            }
        }
        return t('form.you');
    };

    return (
        <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-8"
        >
            <m.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-20 h-20 bg-[var(--sage)] rounded-full mx-auto flex items-center justify-center"
            >
                <FaCheck className="text-white text-3xl" />
            </m.div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[var(--amber)]">
                    {t('form.greatIveReceivedYourRequest')}
                </h2>

                <div className="space-y-2">
                    <p className="text-[var(--cream)]">
                        {t('form.illContact')}
                        {" "}
                        {getContactPerson()}
                        {" "}
                        {t('form.viaWhatsappAsSoonAsPossibleToScheduleYourFreeTrial')}
                    </p>

                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center justify-center text-[var(--sage)] mt-4"
                    >
                        <FaWhatsapp className="text-2xl mr-2" />
                        <p className="text-sm">
                            {t('form.usuallyWithin24Hours')}
                        </p>
                    </m.div>
                </div>
            </div>
        </m.div>
    );
};

export default SuccessMessage; 