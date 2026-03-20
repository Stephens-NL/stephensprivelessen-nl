import FeedbackContent from './FeedbackContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl ? 'Feedback | Stephens Privelessen' : 'Feedback | Stephens Private Tutoring',
    description: isNl
      ? 'Deel je feedback over de bijlesdiensten van Stephens Privelessen.'
      : 'Share your feedback about Stephens Private Tutoring services.',
  };
}

export default function FeedbackPage() {
  return <FeedbackContent />;
}
