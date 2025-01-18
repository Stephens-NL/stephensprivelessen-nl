import { Metadata } from 'next';
import { WeekendGhanaContent } from '@/components/privelessen/WeekendGhanaContent';

export const metadata: Metadata = {
  title: 'Akwaaba! Weekend Bijles in Zuidoost | Buurtkorting & Aan Huis Service',
  description: 'Speciale weekend bijles voor de Ghanese gemeenschap in Amsterdam Zuidoost. Ɛyɛ mmerɛw! (Het is makkelijk!) €30 per uur met buurtkorting. Gratis proefles beschikbaar.',
  keywords: [
    'ghanese bijles zuidoost',
    'twi bijles amsterdam',
    'weekend tutoring ghana',
    'bijles ghanezen amsterdam',
    'huiswerkbegeleiding ghanees',
    'ghana tutoring zuidoost',
    'akwaaba tutoring amsterdam'
  ],
};

export default function WeekendGhanaPage() {
  return <WeekendGhanaContent />;
} 