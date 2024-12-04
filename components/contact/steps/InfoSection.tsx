'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../../hooks/useTranslation';
import { FaGraduationCap, FaClock, FaEuroSign, FaArrowRight, FaWhatsapp, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface InfoSectionProps {
    onBack: () => void;
    onRequestLesson: () => void;
}

interface PricingTier {
    level: string;
    prices: {
        duration: string;
        price: string;
    }[];
}

const pricingTiers: PricingTier[] = [
    {
        level: "Hoger Onderwijs",
        prices: [
            { duration: "1 uur", price: "€80" },
            { duration: "2 uren", price: "€135" },
            { duration: "4 uren", price: "€250" },
        ]
    },
    {
        level: "Voortgezet Onderwijs (20+)",
        prices: [
            { duration: "1 uur", price: "€75" },
            { duration: "2 uren", price: "€130" },
            { duration: "4 uren", price: "€230" },
        ]
    },
    {
        level: "Voortgezet Onderwijs (20-)",
        prices: [
            { duration: "1 uur", price: "€60" },
            { duration: "2 uren", price: "€100" },
            { duration: "4 uren", price: "€200" },
        ]
    }
];

const PricingTable = ({ tier }: { tier: PricingTier }) => {
    const { t } = useTranslation();
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-600/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30"
        >
            <h4 className="text-xl font-semibold text-yellow-300 mb-4">
                {String(t({ EN: tier.level, NL: tier.level }))}
            </h4>
            <div className="space-y-3">
                {tier.prices.map((price, idx) => (
                    <div 
                        key={idx} 
                        className="flex justify-between items-center py-2 border-b border-blue-600/50 last:border-0"
                    >
                        <span className="text-yellow-100 font-medium">{price.duration}</span>
                        <span className="text-yellow-300 font-semibold text-lg">{price.price}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const InfoSection = ({ onBack, onRequestLesson }: InfoSectionProps) => {
    const { t } = useTranslation();
    const [showPricing, setShowPricing] = useState(false);
    const whatsappLink = `https://wa.me/+31612345678`; // Vervang met je echte WhatsApp nummer

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
        >
            <div className="space-y-6">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-blue-700 p-6 rounded-lg"
                >
                    <div className="flex items-center text-yellow-300 mb-3">
                        <FaGraduationCap className="text-2xl mr-3" />
                        <h3 className="text-lg font-semibold">
                            {String(t({ EN: "Teaching Method", NL: "Lesmethode" }))}
                        </h3>
                    </div>
                    <p className="text-yellow-100">
                        {String(t({
                            EN: "I focus on understanding rather than memorization. We'll work together to build a strong foundation in the subject, using practical examples and clear explanations.",
                            NL: "Ik focus op begrip in plaats van uit het hoofd leren. We werken samen aan een sterke basis in het vak, met praktische voorbeelden en heldere uitleg."
                        }))}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-blue-700 p-6 rounded-lg"
                >
                    <div className="flex items-center text-yellow-300 mb-3">
                        <FaClock className="text-2xl mr-3" />
                        <h3 className="text-lg font-semibold">
                            {String(t({ EN: "Lesson Structure", NL: "Lesstructuur" }))}
                        </h3>
                    </div>
                    <p className="text-yellow-100">
                        {String(t({
                            EN: "Lessons are typically 1-2 hours long, scheduled at your convenience. We start with a free 30-minute trial lesson to assess your needs and goals.",
                            NL: "Lessen duren meestal 1-2 uur, ingepland op tijden die jou uitkomen. We beginnen met een gratis proefles van 30 minuten om je behoeften en doelen te bespreken."
                        }))}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-blue-700 p-6 rounded-lg"
                >
                    <div className="flex items-center justify-between text-yellow-300 mb-3">
                        <div className="flex items-center">
                            <FaEuroSign className="text-2xl mr-3" />
                            <h3 className="text-lg font-semibold">
                                {String(t({ EN: "Pricing", NL: "Tarieven" }))}
                            </h3>
                        </div>
                        <button
                            onClick={() => setShowPricing(!showPricing)}
                            className="text-yellow-300 hover:text-yellow-400"
                        >
                            {showPricing ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                    </div>
                    <p className="text-yellow-100">
                        {String(t({
                            EN: "Rates start at €60 per hour. First trial lesson (30 min) is free!",
                            NL: "Tarieven vanaf €60 per uur. Eerste proefles (30 min) is gratis!"
                        }))}
                    </p>

                    <AnimatePresence>
                        {showPricing && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-6 space-y-6"
                            >
                                {pricingTiers.map((tier, index) => (
                                    <PricingTable key={index} tier={tier} />
                                ))}
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-sm text-yellow-200 text-center mt-4"
                                >
                                    {String(t({
                                        EN: "First trial lesson (30 minutes) is always free",
                                        NL: "Eerste proefles (30 minuten) is altijd gratis"
                                    }))}
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-blue-700 text-yellow-300 rounded-lg hover:bg-blue-600"
                    onClick={onBack}
                >
                    {String(t({ EN: "Back", NL: "Terug" }))}
                </motion.button>

                <div className="flex flex-col sm:flex-row gap-4">
                    <motion.a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        <FaWhatsapp className="mr-2" />
                        {String(t({
                            EN: "Contact via WhatsApp",
                            NL: "Contact via WhatsApp"
                        }))}
                    </motion.a>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center px-6 py-3 bg-yellow-400 text-blue-900 rounded-lg hover:bg-yellow-300"
                        onClick={onRequestLesson}
                    >
                        {String(t({
                            EN: "Schedule Trial Lesson",
                            NL: "Plan Proefles"
                        }))}
                        <FaArrowRight className="ml-2" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default InfoSection; 