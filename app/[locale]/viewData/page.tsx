import type { Metadata } from 'next';
import ViewDataContent from './ViewDataContent';

export const metadata: Metadata = {
  title: 'Feedback Data | Stephens Privelessen',
  description: 'View feedback data from Stephens Privelessen.',
};

export default function ViewDataPage() {
  return <ViewDataContent />;
}
