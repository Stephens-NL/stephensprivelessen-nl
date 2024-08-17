'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { contactData } from '../../data/contactData';
import { useTranslation } from '../../hooks/useTranslation';


const iconMap = {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
};

interface ContactInfoProps {
    icon: keyof typeof iconMap;
    title: { EN: string; NL: string };
    content: string;
    link: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, title, content, link }) => {
    const IconComponent = iconMap[icon];
    const { t } = useTranslation();

    return (
        <motion.div
            className="flex items-center mb-6 bg-blue-900 rounded-lg p-4 border border-blue-800 hover:border-blue-700"
            whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
        >
            <div className="text-yellow-400 text-2xl mr-4">
                <IconComponent />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-yellow-100">{t(title)}</h3>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-200 hover:text-yellow-400 transition-colors duration-300"
                >
                    {content}
                </a>
            </div>
        </motion.div>
    );
};

const Placeholder: React.FC = () => {
    const whatsappLink = `https://wa.me/${contactData.contactItems[0].content.replace(/\s+/g, '')}`;
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-3xl mx-auto bg-blue-800 rounded-lg shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="p-8">
                    <motion.h1
                        className="text-4xl font-bold text-center text-yellow-300 mb-8"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {t(contactData.title)}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <p className="text-yellow-100 mb-6">{t(contactData.aboutMe)}</p>

                        {contactData.contactItems.map((item, index) => (
                            <ContactInfo
                                key={index}
                                icon={item.icon as keyof typeof iconMap}
                                title={item.title}
                                content={item.content}
                                link={item.link}
                            />
                        ))}

                        <motion.div
                            className="mt-8 text-center"
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
                                {t({ EN: "Contact via WhatsApp", NL: "Contact via WhatsApp" })}
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div >
        </div >
    );
};

export default Placeholder;