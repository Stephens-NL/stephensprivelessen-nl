// app/contact/page.tsx
'use client';

import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { m, AnimatePresence } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { getBusinessData } from '@/data/businessData';

type IconMap = {
    [key: string]: IconType;
};

const IconMap: IconMap = {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaWhatsapp,
};

interface ContactInfoProps {
    icon: string;
    title: string;
    content: string;
    href: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, title, content, href }) => {
    const IconComponent = IconMap[icon];
    const { t } = useTranslation('contact');

    return (
        <m.div
            className="flex items-center mb-4 bg-blue-900 rounded-lg p-3 border border-blue-800 hover:border-blue-700"
            whileHover={{ scale: 1.03, boxShadow: "0 5px 10px rgba(0,0,0,0.2)" }}
        >
            <div className="text-yellow-400 text-xl mr-3">
                <IconComponent />
            </div>
            <div>
                <h3 className="text-sm font-semibold text-yellow-100">{t(title)}</h3>
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-200 hover:text-yellow-400 transition-colors duration-300 text-sm"
                >
                    {content}
                </a>
            </div>
        </m.div>
    );
};

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation('contact');

    return (
        <div className="mb-4">
            <m.button
                className="w-full flex justify-between items-center bg-blue-700 p-3 rounded-lg text-yellow-300 font-semibold"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.02 }}
            >
                {t(title)}
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </m.button>
            <AnimatePresence>
                {isOpen && (
                    <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-blue-800 p-4 rounded-b-lg mt-1"
                    >
                        {children}
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface SubjectListProps {
    subjects: string[];
    title: string;
}

const SubjectList: React.FC<SubjectListProps> = ({ subjects, title }) => {
    const { t } = useTranslation('contact');
    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold text-yellow-300 mb-2">{t(title)}</h3>
            <ul className="list-disc list-inside text-yellow-100 text-sm">
                {subjects.map((subject) => (
                    <li key={t(subject)}>{t(subject)}</li>
                ))}
            </ul>
        </div>
    );
};

interface PricingItem {
    duration: string;
    price: string;
}

interface PricingTableProps {
    pricing: PricingItem[];
    title: string;
}

const PricingTable: React.FC<PricingTableProps> = ({ pricing, title }) => {
    const { t } = useTranslation('contact');
    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold text-yellow-300 mb-2">{t(title)}</h3>
            <table className="w-full text-yellow-100 text-sm">
                <thead>
                    <tr>
                        <th className="text-left">{t('duration')}</th>
                        <th className="text-right">{t('price')}</th>
                    </tr>
                </thead>
                <tbody>
                    {pricing.map((item) => (
                        <tr key={`${item.duration}-${item.price}`}>
                            <td>{t(item.duration)}</td>
                            <td className="text-right">{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const ContactPage: React.FC = () => {
    const { t } = useTranslation('contact');
    const businessData = getBusinessData(t);
    const whatsappLink = `https://wa.me/${businessData.contactItems[0].content.replace(/\s+/g, '')}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 py-12 px-4 sm:px-6 lg:px-8">
            <m.div
                className="max-w-2xl mx-auto bg-blue-800 rounded-lg shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="p-6">
                    <m.h1
                        className="text-3xl font-bold text-center text-yellow-300 mb-6"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {t('title')}
                    </m.h1>

                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <p className="text-yellow-100 mb-6 text-sm">{t('aboutMe')}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            {businessData.contactItems.map((item) => (
                                <ContactInfo
                                    key={item.icon}
                                    icon={item.icon}
                                    title={`contactInfo.${item.title}`}
                                    content={item.content}
                                    href={item.href}
                                />
                            ))}
                        </div>

                        <m.div
                            className="mb-6 text-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            >
                                <FaWhatsapp className="mr-2" />
                                {t('cta.whatsapp')}
                            </a>
                        </m.div>

                        <CollapsibleSection title="subjects.title">
                            <SubjectList subjects={businessData.subjects.primary} title="subjects.primary" />
                            <SubjectList subjects={businessData.subjects.secondary} title="subjects.secondary" />
                            <SubjectList subjects={businessData.subjects.higher} title="subjects.higher" />
                        </CollapsibleSection>

                        <CollapsibleSection title="pricing.title">
                            <PricingTable pricing={businessData.pricing.higher} title="subjects.higher" />
                            <PricingTable pricing={businessData.pricing.secondary20Plus} title="subjects.secondary" />
                            <PricingTable pricing={businessData.pricing.secondary20Minus} title="subjects.secondary" />
                        </CollapsibleSection>

                        <CollapsibleSection title="aboutLessons.title">
                            <p className="text-yellow-100 text-sm">{t('aboutLessons.content')}</p>
                        </CollapsibleSection>
                    </m.div>
                </div>
            </m.div>
        </div>
    );
};

export default ContactPage;