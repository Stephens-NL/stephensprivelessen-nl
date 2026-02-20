'use client';

import { m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

export function RekentrajectenCTA({ onStart }: { onStart: () => void }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mt-20"
    >
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30" />
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
          <h3 className="text-4xl font-black text-gray-900 mb-4">KLAAR VOOR DE VOLGENDE STAP?</h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Kies jouw ideale traject en start vandaag nog met je rekenvoorbereiding.
          </p>
          <Button
            onClick={onStart}
            size="lg"
            className="px-12 py-6 text-xl font-black bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:scale-105 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl"
          >
            START NU
            <Zap className="w-6 h-6 ml-3" />
          </Button>
        </div>
      </div>
    </m.div>
  );
}
