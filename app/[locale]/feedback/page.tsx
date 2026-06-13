import FeedbackContent from './FeedbackContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl ? "Feedback | Stephen's Privélessen" : "Feedback | Stephen's Private Tutoring",
    description: isNl
      ? "Deel je feedback over de bijlesdiensten van Stephen's Privélessen."
      : "Share your feedback about Stephen's Private Tutoring services.",
  };
}

export default function FeedbackPage() {
  return <FeedbackContent />;
}
