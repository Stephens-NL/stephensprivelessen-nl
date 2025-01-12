'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

export default function ConsultancyPage() {
  const { t } = useTranslation();

  const content = {
    title: {
      EN: "We're Building Something Special",
      NL: "We Bouwen aan Iets Bijzonders"
    },
    description: {
      EN: "Our consultancy services are coming soon. We're working hard to bring you expert guidance and solutions.",
      NL: "Onze consultancydiensten komen eraan. We werken hard om je deskundige begeleiding en oplossingen te bieden."
    },
    buttons: {
      explore: {
        EN: "Explore Other Services",
        NL: "Bekijk Andere Diensten"
      },
      contact: {
        EN: "Contact Us",
        NL: "Neem Contact Op"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {String(t(content.title))}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {String(t(content.description))}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/services">
            <Button size="lg" variant="outline">
              {String(t(content.buttons.explore))}
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              {String(t(content.buttons.contact))}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 