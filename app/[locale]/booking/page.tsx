import TutoringDatePicker from '@/components/BookingSystem/TutoringDatePicker';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl ? 'Boek een Les | Stephens Privelessen' : 'Book a Lesson | Stephens Private Tutoring',
    description: isNl
      ? 'Plan een bijles of priveles in bij Stephens Privelessen in Amsterdam.'
      : 'Schedule a tutoring or private lesson with Stephens Private Tutoring in Amsterdam.',
  };
}

export default function BookingPage() {
  return <TutoringDatePicker />;
}
