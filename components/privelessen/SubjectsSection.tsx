'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Icon, IconName } from '@/components/ui/icons';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Stable ordered keys — must match messages subjects object keys
const SUBJECT_KEYS = ['mathematics', 'programming', 'dataScience'] as const;
type SubjectKey = typeof SUBJECT_KEYS[number];

// Presentational constants — not translatable copy
const SUBJECT_ICONS: Record<SubjectKey, IconName> = {
  mathematics: 'Calculator',
  programming: 'Code',
  dataScience: 'Database',
};

// Subject level badges — kept as presentational constants (EN-only, same in both locales)
const SUBJECT_LEVELS: Record<SubjectKey, string[]> = {
  mathematics: ['Advanced', 'Intermediate', 'All Levels'],
  programming: ['All Levels', 'Beginner', 'Intermediate'],
  dataScience: ['Advanced', 'Intermediate', 'Beginner'],
};

export function SubjectsSection() {
  const t = useTranslations('tutoring');
  const [selectedKey, setSelectedKey] = useState<SubjectKey>(SUBJECT_KEYS[0]);

  const activeItems = t.raw(`subjects.${selectedKey}.items`) as string[];
  const activeLevels = SUBJECT_LEVELS[selectedKey];

  return (
    <section className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        {/* Category Navigation */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {SUBJECT_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setSelectedKey(key)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedKey === key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon name={SUBJECT_ICONS[key]} className="w-4 h-4" />
                <span>{t(`subjects.${key}.name`)}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Subjects Grid */}
        <AnimatePresence mode="wait">
          <m.div
            key={selectedKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {activeItems.map((itemName, index) => (
              <Card key={`${selectedKey}-${index}`} className="p-6">
                <h3 className="text-xl font-semibold mb-4">{itemName}</h3>
                <Badge variant="secondary">{activeLevels[index]}</Badge>
              </Card>
            ))}
          </m.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
