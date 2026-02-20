'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { FiRotateCcw } from 'react-icons/fi';
import {
  FilterSection,
  typeFilters,
  audienceFilters,
  sizeFilters,
  durationFilters,
  scheduleFilters,
} from './WorkshopsFilters';

interface WorkshopsFilterPanelProps {
  typeFilter: string;
  audienceFilter: string;
  sizeFilter: string;
  durationFilter: string;
  scheduleFilter: string;
  hasActiveFilters: boolean;
  onFilterChange: (type: string, payload: string) => void;
  onReset: () => void;
}

export function WorkshopsFilterPanel({
  typeFilter,
  audienceFilter,
  sizeFilter,
  durationFilter,
  scheduleFilter,
  hasActiveFilters,
  onFilterChange,
  onReset,
}: WorkshopsFilterPanelProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900">
          {String(t({ EN: 'Filter Options', NL: 'Filter Opties' }))}
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <FiRotateCcw className="w-4 h-4" />
            {String(t({ EN: 'Reset Filters', NL: 'Filters Resetten' }))}
          </button>
        )}
      </div>
      <FilterSection
        title={String(t({ EN: 'Workshop Type', NL: 'Workshop Type' }))}
        options={typeFilters}
        activeFilter={typeFilter}
        onFilterChange={(v) => onFilterChange('SET_TYPE', v)}
      />
      <FilterSection
        title={String(t({ EN: 'Target Audience', NL: 'Doelgroep' }))}
        options={audienceFilters}
        activeFilter={audienceFilter}
        onFilterChange={(v) => onFilterChange('SET_AUDIENCE', v)}
      />
      <FilterSection
        title={String(t({ EN: 'Group Size', NL: 'Groepsgrootte' }))}
        options={sizeFilters}
        activeFilter={sizeFilter}
        onFilterChange={(v) => onFilterChange('SET_SIZE', v)}
      />
      <FilterSection
        title={String(t({ EN: 'Duration', NL: 'Tijdsduur' }))}
        options={durationFilters}
        activeFilter={durationFilter}
        onFilterChange={(v) => onFilterChange('SET_DURATION', v)}
      />
      <FilterSection
        title={String(t({ EN: 'Schedule', NL: 'Rooster' }))}
        options={scheduleFilters}
        activeFilter={scheduleFilter}
        onFilterChange={(v) => onFilterChange('SET_SCHEDULE', v)}
      />
    </>
  );
}
