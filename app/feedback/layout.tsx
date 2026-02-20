import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feedback | Stephens Privelessen',
  description: 'Share your feedback about Stephens Privelessen tutoring services.',
};

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
