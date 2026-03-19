import type { Metadata } from 'next';
import TutoringDatePicker from '@/components/BookingSystem/TutoringDatePicker';

export const metadata: Metadata = {
  title: 'Boek een Les | Stephens Privelessen',
  description: 'Plan een bijles of priveles in bij Stephens Privelessen in Amsterdam.',
};

export default function BookingPage() {
  return <TutoringDatePicker />;
}
