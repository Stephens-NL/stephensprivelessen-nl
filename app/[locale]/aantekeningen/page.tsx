import { Metadata } from 'next';
import { AantekeningenContent } from './AantekeningenContent';

type Props = { searchParams: Promise<{ student?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { student } = await searchParams;
  const studentName = student ?? null;
  const title = studentName
    ? `📚 ${studentName}'s Aantekeningen - Stephen's Privelessen`
    : "📚 Aantekeningen - Stephen's Privelessen";
  const description = studentName
    ? `${studentName}'s aantekeningen van Stephen's Privelessen. Alle notities georganiseerd en direct toegankelijk.`
    : "Vind je aantekeningen van Stephen's Privelessen. Alle notities georganiseerd en direct toegankelijk.";
  const url = `https://stephensprivelessen.nl/aantekeningen${studentName ? `?student=${encodeURIComponent(studentName)}` : ''}`;
  const ogImage = studentName
    ? `https://stephensprivelessen.nl/api/og-image?student=${encodeURIComponent(studentName)}`
    : 'https://stephensprivelessen.nl/images/og-aantekeningen.svg';

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, type: 'image/svg+xml' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function AantekeningenPage({ searchParams }: Props) {
  const { student } = await searchParams;
  return <AantekeningenContent student={student ?? undefined} />;
}
