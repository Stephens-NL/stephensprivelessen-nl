'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TutoringPage } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ContactSectionProps {
  contact: TutoringPage['contact'];
  t: (text: any) => string;
}

export const ContactSection = ({ contact, t }: ContactSectionProps) => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            {t(contact.title)}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            {t(contact.subtitle)}
          </motion.p>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t(contact.form.name)}
              </label>
              <Input
                type="text"
                placeholder={t(contact.form.name)}
                className="w-full"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t(contact.form.email)}
              </label>
              <Input
                type="email"
                placeholder={t(contact.form.email)}
                className="w-full"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t(contact.form.subject.label)}
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t(contact.form.subject.label)} />
                </SelectTrigger>
                <SelectContent>
                  {contact.form.subject.options.map((option, index) => (
                    <SelectItem key={index} value={t(option).toLowerCase()}>
                      {t(option)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t(contact.form.message)}
              </label>
              <Textarea
                placeholder={t(contact.form.message)}
                className="w-full min-h-[150px]"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              {t(contact.form.submit)}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}; 