'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SubjectCategory } from '@/types';
import { Icon, IconName } from '@/components/ui/icons';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SubjectsSectionProps {
  subjects: SubjectCategory[];
  t: (text: { EN: string; NL: string }) => string;
}

export function SubjectsSection({ subjects, t }: SubjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(subjects[0]?.name.EN || '');

  return (
    <section className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        {/* Category Navigation */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {subjects.map((category) => (
            <button
              key={t(category.name)}
              onClick={() => setSelectedCategory(category.name.EN)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.name.EN
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon name={category.icon as IconName} className="w-4 h-4" />
                <span>{t(category.name)}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Subjects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {subjects
              .find((cat) => cat.name.EN === selectedCategory)
              ?.subjects.map((subject, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{t(subject.name)}</h3>
                  <Badge variant="secondary">{subject.level}</Badge>
                </Card>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
} 