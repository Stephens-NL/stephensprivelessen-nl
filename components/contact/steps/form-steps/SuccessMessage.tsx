'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from '../../../../hooks/useTranslation';
import { FormData } from '../../Contact';

interface SuccessMessageProps {
    formData: FormData;
}

const SuccessMessage = ({ formData }: SuccessMessageProps) => {
    const { t } = useTranslation();

    const getContactPerson = () => {
        if (formData.age < 18) {
            switch (formData.contactPreference) {
                case 'parent':
                    return String(t({
                        EN: `your parent/guardian (${formData.parentName})`,
                        NL: `je ouder/verzorger (${formData.parentName})`
                    }));
                case 'both':
                    return String(t({
                        EN: "both you and your parent/guardian",
                        NL: "zowel jou als je ouder/verzorger"
                    }));
                default:
                    return String(t({ EN: "you", NL: "je" }));
            }
        }
        return String(t({ EN: "you", NL: "je" }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-8"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center"
            >
                <FaCheck className="text-white text-3xl" />
            </motion.div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-yellow-300">
                    {String(t({
                        EN: "Great! I've Received Your Request",
                        NL: "Super! Ik heb je aanvraag ontvangen"
                    }))}
                </h2>

                <div className="space-y-2">
                    <p className="text-yellow-100">
                        {String(t({
                            EN: "I'll contact",
                            NL: "Ik zal"
                        }))}
                        {" "}
                        {getContactPerson()}
                        {" "}
                        {String(t({
                            EN: "via WhatsApp as soon as possible to schedule your free trial lesson!",
                            NL: "zo snel mogelijk via WhatsApp contacteren om je gratis proefles in te plannen!"
                        }))}
                    </p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center justify-center text-green-400 mt-4"
                    >
                        <FaWhatsapp className="text-2xl mr-2" />
                        <p className="text-sm">
                            {String(t({
                                EN: "Usually within 24 hours",
                                NL: "Meestal binnen 24 uur"
                            }))}
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default SuccessMessage; 