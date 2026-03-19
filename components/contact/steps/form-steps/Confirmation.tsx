'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { FormData } from '../../Contact';


interface ConfirmationProps {
    formData: FormData;
}

const Confirmation = ({ formData }: ConfirmationProps) => {
    const t = useTranslations('contact');

    return (
        <div className="space-y-6 text-white">
            <h2 className="text-2xl font-semibold text-center mb-6">
                {t('form.pleaseReviewYourInformation')}
            </h2>
            
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold text-[var(--amber)]">
                        {t('form.personalDetails')}
                    </h3>
                    <p>
                        <strong>{t('form.name')}: </strong>
                        {formData.name}
                    </p>
                    <p>
                        <strong>{t('form.email')}: </strong>
                        {formData.email}
                    </p>
                    <p>
                        <strong>{t('form.age')}: </strong>
                        {formData.age}
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-[var(--amber)]">
                        {t('form.lessonDetails')}
                    </h3>
                    <p>
                        <strong>{t('form.subject')}: </strong>
                        {formData.subject}
                    </p>
                    <p>
                        <strong>{t('form.level')}: </strong>
                        {formData.level}
                    </p>
                    <p>
                        <strong>{t('form.location')}: </strong>
                        {formData.isOnline 
                            ? t('form.online')
                            : t('form.inperson')
                        }
                    </p>
                </div>

                {formData.age < 18 && (
                    <div>
                        <h3 className="font-semibold text-[var(--amber)]">
                            {t('form.parentguardianDetails')}
                        </h3>
                        <p>
                            <strong>{t('form.name')}: </strong>
                            {formData.parentName}
                        </p>
                        <p>
                            <strong>{t('form.email')}: </strong>
                            {formData.parentEmail}
                        </p>
                        {formData.parentPhone && (
                            <p>
                                <strong>{t('form.phone')}: </strong>
                                {formData.parentPhone}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Confirmation;