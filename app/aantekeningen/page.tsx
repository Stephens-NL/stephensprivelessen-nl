import { Suspense } from 'react';
import { Metadata } from 'next';
import { AantekeningenClient } from './AantekeningenClient';

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

function AantekeningenFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📚</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Aantekeningen</h1>
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    </div>
  );
}

export default function AantekeningenPage() {
  return (
    <Suspense fallback={<AantekeningenFallback />}>
      <AantekeningenClient />
    </Suspense>
  );
}
