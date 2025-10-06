"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useSearchParams } from "next/navigation";

export default function AantekeningenPage() {
  const [studentName, setStudentName] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const searchParams = useSearchParams();

  // Nieuwe Aantekeningen App URL - gelezen vanuit environment variable
  const baseAantekeningenAppURL = process.env.NEXT_PUBLIC_AANTEKENINGEN_APP_URL;
  
  if (!baseAantekeningenAppURL) {
    throw new Error('NEXT_PUBLIC_AANTEKENINGEN_APP_URL environment variable is required but not set');
  }
  
  // Add student parameter to new app URL if student name is available
  const AANTEKENINGEN_APP_URL = studentName 
    ? `${baseAantekeningenAppURL}?student=${encodeURIComponent(studentName)}`
    : baseAantekeningenAppURL;

  useEffect(() => {
    // Get student name from URL parameters
    const name = searchParams.get('student');
    if (name) {
      setStudentName(name);
    }
    
    // Redirect to the new app after a short delay
    setIsRedirecting(true);
    const timer = setTimeout(() => {
      window.location.href = AANTEKENINGEN_APP_URL;
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchParams, AANTEKENINGEN_APP_URL]);

  return (
    <>
      <Head>
        <title>{studentName ? `📚 ${studentName}'s Aantekeningen - Stephen's Privelessen` : "📚 Aantekeningen - Stephen's Privelessen"}</title>
        <meta name="description" content={studentName ? `${studentName}'s aantekeningen van Stephen's Privelessen. Alle notities georganiseerd en direct toegankelijk.` : "Vind je aantekeningen van Stephen's Privelessen. Alle notities georganiseerd en direct toegankelijk."} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://stephensprivelessen.nl/aantekeningen${studentName ? `?student=${encodeURIComponent(studentName)}` : ''}`} />
        <meta property="og:title" content={studentName ? `📚 ${studentName}'s Aantekeningen - Stephen's Privelessen` : "📚 Aantekeningen - Stephen's Privelessen"} />
        <meta property="og:description" content={studentName ? `${studentName}'s aantekeningen van Stephen's Privelessen. Alle notities georganiseerd en direct toegankelijk.` : "Vind je aantekeningen van Stephen's Privelessen. Alle notities georganiseerd en direct toegankelijk."} />
        <meta property="og:image" content={studentName ? `https://stephensprivelessen.nl/api/og-image?student=${encodeURIComponent(studentName)}` : "https://stephensprivelessen.nl/images/og-aantekeningen.svg"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/svg+xml" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://stephensprivelessen.nl/aantekeningen${studentName ? `?student=${encodeURIComponent(studentName)}` : ''}`} />
        <meta property="twitter:title" content={studentName ? `📚 ${studentName}'s Aantekeningen - Stephen's Privelessen` : "📚 Aantekeningen - Stephen's Privelessen"} />
        <meta property="twitter:description" content={studentName ? `${studentName}'s aantekeningen van Stephen's Privelessen. Alle notities georganiseerd en direct toegankelijk.` : "Vind je aantekeningen van Stephen's Privelessen. Alle notities georganiseerd en direct toegankelijk."} />
        <meta property="twitter:image" content={studentName ? `https://stephensprivelessen.nl/api/og-image?student=${encodeURIComponent(studentName)}` : "https://stephensprivelessen.nl/images/og-aantekeningen.svg"} />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📚</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {studentName ? `${studentName}'s Aantekeningen` : 'Aantekeningen'}
            </h1>
            <p className="text-gray-600">
              {studentName 
                ? `Je wordt doorgestuurd naar ${studentName}'s aantekeningen...`
                : 'Je wordt doorgestuurd naar het nieuwe aantekeningen dashboard...'
              }
            </p>
          </div>

          {/* Loading Animation */}
          <div className="mb-8">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm">
              {isRedirecting ? 'Doorsturen naar nieuwe app...' : 'Voorbereiden...'}
            </p>
          </div>

          {/* Manual Link */}
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Als je niet automatisch wordt doorgestuurd:
            </p>
            <a 
              href={AANTEKENINGEN_APP_URL}
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              🚀 Ga naar Aantekeningen App
            </a>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <span>🔒 Privacy veilig</span>
              <span>•</span>
              <span>⚡ Snelle zoekresultaten</span>
              <span>•</span>
              <span>📱 Mobiel vriendelijk</span>
            </div>
            <div className="mt-3">
              <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                ← Terug naar hoofdsite
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
