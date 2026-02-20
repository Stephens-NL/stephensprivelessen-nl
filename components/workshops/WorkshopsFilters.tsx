'use client';

import React from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { FiX, FiRotateCcw } from 'react-icons/fi';

export interface FilterOption {
  id: string;
  labelEN: string;
  labelNL: string;
}

export const typeFilters: FilterOption[] = [
  { id: 'all', labelEN: 'All Workshops', labelNL: 'Alle Workshops' },
  { id: 'creative', labelEN: 'Creative', labelNL: 'Creatief' },
  { id: 'academic', labelEN: 'Academic', labelNL: 'Academisch' },
];

export const audienceFilters: FilterOption[] = [
  { id: 'all', labelEN: 'All Audiences', labelNL: 'Alle Doelgroepen' },
  { id: 'students', labelEN: 'Students', labelNL: 'Leerlingen' },
  { id: 'teachers', labelEN: 'Teachers', labelNL: 'Docenten' },
  { id: 'everyone', labelEN: 'Everyone', labelNL: 'Iedereen' },
];

export const sizeFilters: FilterOption[] = [
  { id: 'all', labelEN: 'All Sizes', labelNL: 'Alle Groottes' },
  { id: 'small', labelEN: 'Small Groups (≤8)', labelNL: 'Kleine Groepen (≤8)' },
  { id: 'medium', labelEN: 'Medium Groups (9-15)', labelNL: 'Middelgrote Groepen (9-15)' },
  { id: 'large', labelEN: 'Large Groups (15+)', labelNL: 'Grote Groepen (15+)' },
];

export const durationFilters: FilterOption[] = [
  { id: 'all', labelEN: 'All Durations', labelNL: 'Alle Tijdsduren' },
  { id: 'short', labelEN: '2-3 hours', labelNL: '2-3 uur' },
  { id: 'medium', labelEN: '4-5 hours', labelNL: '4-5 uur' },
  { id: 'long', labelEN: '6+ hours', labelNL: '6+ uur' },
];

export const scheduleFilters: FilterOption[] = [
  { id: 'all', labelEN: 'All Schedules', labelNL: 'Alle Roosters' },
  { id: 'single', labelEN: 'Single Session', labelNL: 'Eenmalig' },
  { id: 'weekly', labelEN: 'Weekly Sessions', labelNL: 'Wekelijkse Sessies' },
  { id: 'monthly', labelEN: 'Monthly Sessions', labelNL: 'Maandelijkse Sessies' },
];

interface FilterButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      isActive ? 'bg-blue-600 text-white shadow-md transform scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    {children}
  </button>
);

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  options,
  activeFilter,
  onFilterChange,
}) => {
  const { t } = useTranslation();
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-500 mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <FilterButton
            key={option.id}
            isActive={activeFilter === option.id}
            onClick={() => onFilterChange(option.id)}
          >
            {String(t({ EN: option.labelEN, NL: option.labelNL }))}
          </FilterButton>
        ))}
      </div>
    </div>
  );
};

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({ isOpen, onClose, children }) => {
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <m.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-[85%] max-w-md bg-white z-50 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {String(t({ EN: 'Filter Workshops', NL: 'Filter Workshops' }))}
              </h2>
              <button onClick={onClose} className="p-2">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            {children}
            <button onClick={onClose} className="w-full bg-blue-600 text-white py-3 rounded-xl mt-6">
              {String(t({ EN: 'Apply Filters', NL: 'Filters Toepassen' }))}
            </button>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface TabProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count: number;
}

export const Tab: React.FC<TabProps> = ({ isActive, onClick, children, count }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 font-medium rounded-xl transition-all duration-200 ${
      isActive ? 'bg-white shadow-md text-gray-900' : 'text-gray-600 hover:bg-white/50'
    }`}
  >
    <span>{children}</span>
    <span
      className={`text-sm px-2 py-0.5 rounded-full ${
        isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
      }`}
    >
      {count}
    </span>
  </button>
);
