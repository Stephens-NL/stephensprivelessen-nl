// components/PricingTable.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

type PricingItem = {
  duration: number; // Hours as a number for easier integration
  price: number;    // Price as a number
};

type PricingTableProps = {
  pricing: PricingItem[];
  title: string;
};

export const PricingTable = ({ pricing, title }: PricingTableProps) => {
  return (
    <div className="mb-8 p-6 bg-blue-800 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-yellow-300 mb-4 text-center">{title}</h3>
      <table className="w-full table-auto text-yellow-100 text-sm">
        <thead>
          <tr className="border-b border-yellow-400">
            <th className="text-left py-2 px-4">Duration (hours)</th>
            <th className="text-right py-2 px-4">Price (€)</th>
          </tr>
        </thead>
        <tbody>
          {pricing.map((item, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-yellow-600 hover:bg-blue-700 transition-colors duration-200"
            >
              <td className="py-2 px-4">{item.duration} {item.duration === 1 ? "hour" : "hours"}</td>
              <td className="text-right py-2 px-4">{item.price.toFixed(2)}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PricingTable;