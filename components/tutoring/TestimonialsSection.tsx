'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TutoringPage } from '@/types';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: TutoringPage['testimonials'];
  t: (text: any) => string;
}

export const TestimonialsSection = ({ testimonials, t }: TestimonialsSectionProps) => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            {t(testimonials.title)}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            {t(testimonials.subtitle)}
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slides.map((slide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 h-full flex flex-col">
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < slide.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-600 mb-6 flex-grow">
                  &ldquo;{t(slide.quote)}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {slide.image && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={slide.image}
                        alt={slide.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="font-semibold">{slide.author}</div>
                    <div className="text-sm text-gray-500">
                      {t(slide.role)} • {t(slide.subject)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 