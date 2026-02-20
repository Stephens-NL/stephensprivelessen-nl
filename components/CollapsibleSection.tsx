// components/CollapsibleSection.tsx
'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export const CollapsibleSection = ({ title, children }: { title: string | { EN: string; NL: string }, children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4">
            <m.button
                className="w-full flex justify-between items-center bg-blue-700 p-3 rounded-lg text-yellow-300 font-semibold"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.02 }}
            >
                {typeof title === 'string' ? title : title.EN} {/* Pas dit aan voor NL */}
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