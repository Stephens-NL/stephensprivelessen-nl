import { Metadata } from 'next';
import { WeekendZuidoostContent } from '@/components/privelessen/WeekendZuidoostContent';

export const metadata: Metadata = {
  title: 'Weekend Bijles Amsterdam Zuidoost | Buurtkorting & Aan Huis Service',
  description: 'Speciale weekend bijles in Amsterdam Zuidoost voor €30 per uur. Gratis proefles van 30 minuten beschikbaar. Extra service: aan huis in Gein 3 en 4 (beperkte plekken).',
  keywords: [
    'weekend bijles zuidoost',
    'buurtkorting bijles',
    'aan huis bijles gein',
    'bijles amsterdam zuidoost',
    'goedkope bijles zuidoost',
    'weekend tutoring',
    'coaching zuidoost amsterdam'
  ],
};

export default function WeekendZuidoostPage() {
  return <WeekendZuidoostContent />;
} 