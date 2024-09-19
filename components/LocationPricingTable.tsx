// components/LocationPricingTable.tsx
'use client';

import React from 'react';
import { LocationPricingTableProps } from '../data'


export const LocationPricingTable = ({ pricing, title }: LocationPricingTableProps) => {
    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold text-yellow-300 mb-2">{title}</h3>
            <table className="w-full text-yellow-100 text-sm">
                <thead>
                    <tr>
                        <th className="text-left">Location</th>
                        <th className="text-right">Price (€)</th>
                    </tr>
                </thead>
                <tbody>
                    {pricing.map((item, index) => (
                        <tr key={index}>
                            <td>{item.location}</td>
                            <td className="text-right">{item.price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LocationPricingTable;