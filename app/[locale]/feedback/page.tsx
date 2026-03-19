import type { Metadata } from 'next';
import FeedbackContent from './FeedbackContent';

export const metadata: Metadata = {
  title: 'Feedback | Stephens Privelessen',
  description: 'Share your feedback about Stephens Privelessen tutoring services.',
};

export default function FeedbackPage() {
  return <FeedbackContent />;
}
