'use client';

import React from 'react';
import { m } from 'framer-motion';
import { FaInfoCircle, FaCalendarCheck } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

interface InitialChoiceProps {
    onChooseInfo: () => void;
    onChooseLesson: () => void;
}

const InitialChoice = ({ onChooseInfo, onChooseLesson }: InitialChoiceProps) => {
    const t = useTranslations('contact');

    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
        >
            <p className="text-center text-cream mb-8">
                {t('form.wouldYouLikeToLearnMoreAboutOurTeachingMethodsOrSc')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <m.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center p-6 bg-ink-light rounded-lg text-on-dark hover:bg-ink-light transition-colors border-2 border-ink-light hover:border-amber"
                    onClick={onChooseInfo}
                >
                    <FaInfoCircle className="text-3xl mb-4 text-amber" />
                    <h3 className="text-lg font-semibold mb-2">
                        {t('form.moreInformation')}
                    </h3>
                    <p className="text-sm text-center text-on-dark-muted">
                        {t('form.learnAboutOurTeachingMethodsSubjectsAndPricing')}
                    </p>
                </m.button>

                <m.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center p-6 bg-ink-light rounded-lg text-on-dark hover:bg-ink-light transition-colors border-2 border-ink-light hover:border-amber"
                    onClick={onChooseLesson}
                >
                    <FaCalendarCheck className="text-3xl mb-4 text-amber" />
                    <h3 className="text-lg font-semibold mb-2">
                        {t('form.scheduleTrialLesson')}
                    </h3>
                    <p className="text-sm text-center text-on-dark-muted">
                        {t('form.bookAFree30minuteTrialLessonNow')}
                    </p>
                </m.button>
            </div>
        </m.div>
    );
};

export default InitialChoice;
