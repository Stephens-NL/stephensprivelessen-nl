import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boek een Les | Stephens Privelessen',
  description: 'Plan een bijles of priveles in bij Stephens Privelessen in Amsterdam.',
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
