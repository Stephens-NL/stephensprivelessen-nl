import ViewDataContent from './ViewDataContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl ? 'Feedback Data | Stephens Privelessen' : 'Feedback Data | Stephens Private Tutoring',
    description: isNl
      ? 'Bekijk feedbackgegevens van Stephens Privelessen.'
      : 'View feedback data from Stephens Private Tutoring.',
  };
}

export default function ViewDataPage() {
  return <ViewDataContent />;
}
