// components/LocationPricingTable.tsx
'use client';

import React from 'react';
import { PriceInfo } from '../data';

interface LocationPricingTableProps {
  pricing: PriceInfo[];
  title: string;
}

const LocationPricingTable = ({ pricing, title }: LocationPricingTableProps) => {
    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold text-[var(--amber)] mb-2">{title}</h3>
            <table className="w-full text-[var(--cream)] text-sm">
                <thead>
                    <tr>
                        <th className="text-left">Location</th>
                        <th className="text-right">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {pricing.map((item) => (
                        <tr key={`${item.duration}-${item.price}`}>
                            <td>{item.duration}</td>
                            <td className="text-right">{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LocationPricingTable;