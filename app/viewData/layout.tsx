import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feedback Data | Stephens Privelessen',
  description: 'View feedback data from Stephens Privelessen.',
};

export default function ViewDataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
