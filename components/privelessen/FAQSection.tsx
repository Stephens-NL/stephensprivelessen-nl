'use client';

import React from 'react';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { inViewFadeUp } from '@/lib/animations';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQQuestionMessage {
  question: string;
  answer: string;
}

export const FAQSection = () => {
  const t = useTranslations('tutoring');
  const questions = t.raw('faq.questions') as FAQQuestionMessage[];

  return (
    <section className="py-24 bg-[var(--cream)]">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Header */}
        <m.h2
          {...inViewFadeUp}
          className="text-4xl font-bold text-center mb-16"
        >
          {t('faq.title')}
        </m.h2>

        {/* FAQ Accordion */}
        <m.div
          {...inViewFadeUp}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {questions.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-[var(--border-warm)] rounded-lg px-6 py-2 bg-[var(--cream)] shadow-sm"
              >
                <AccordionTrigger className="text-lg font-semibold text-[var(--ink)] hover:text-[var(--amber)] transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[var(--muted-text)] leading-relaxed pt-2">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </m.div>
      </div>
    </section>
  );
};
