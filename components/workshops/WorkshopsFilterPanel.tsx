'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('workshops');

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-[var(--ink)]">
          {t('form.filterOptions')}
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-[var(--amber)] hover:text-[var(--amber-hover)] text-sm font-medium"
          >
            <FiRotateCcw className="w-4 h-4" />
            {t('form.resetFilters')}
          </button>
        )}
      </div>
      <FilterSection
        title={t('form.workshopType')}
        options={typeFilters}
        activeFilter={typeFilter}
        onFilterChange={(v) => onFilterChange('SET_TYPE', v)}
      />
      <FilterSection
        title={t('form.targetAudience')}
        options={audienceFilters}
        activeFilter={audienceFilter}
        onFilterChange={(v) => onFilterChange('SET_AUDIENCE', v)}
      />
      <FilterSection
        title={t('form.groupSize')}
        options={sizeFilters}
        activeFilter={sizeFilter}
        onFilterChange={(v) => onFilterChange('SET_SIZE', v)}
      />
      <FilterSection
        title={t('form.duration')}
        options={durationFilters}
        activeFilter={durationFilter}
        onFilterChange={(v) => onFilterChange('SET_DURATION', v)}
      />
      <FilterSection
        title={t('form.schedule')}
        options={scheduleFilters}
        activeFilter={scheduleFilter}
        onFilterChange={(v) => onFilterChange('SET_SCHEDULE', v)}
      />
    </>
  );
}
