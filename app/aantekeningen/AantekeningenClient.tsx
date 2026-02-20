'use client';

import { useReducer, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type State = { studentName: string | null; isRedirecting: boolean };

function reducer(state: State, action: { type: 'SET_NAME' | 'SET_REDIRECTING'; payload?: string | boolean }): State {
  if (action.type === 'SET_NAME') return { ...state, studentName: (action.payload as string | null) ?? null };
  if (action.type === 'SET_REDIRECTING') return { ...state, isRedirecting: (action.payload as boolean) ?? true };
  return state;
}

function AantekeningenContent() {
  const [state, dispatch] = useReducer(reducer, { studentName: null, isRedirecting: false });
  const { studentName, isRedirecting } = state;
  const searchParams = useSearchParams();

  const baseAantekeningenAppURL = process.env.NEXT_PUBLIC_AANTEKENINGEN_APP_URL;
  if (!baseAantekeningenAppURL) {
    throw new Error('NEXT_PUBLIC_AANTEKENINGEN_APP_URL environment variable is required but not set');
  }
  const redirectUrl = studentName
    ? `${baseAantekeningenAppURL}?student=${encodeURIComponent(studentName)}`
    : baseAantekeningenAppURL;

  useEffect(() => {
    const name = searchParams.get('student');
    if (name) dispatch({ type: 'SET_NAME', payload: name });
    dispatch({ type: 'SET_REDIRECTING', payload: true });
    const timer = setTimeout(() => {
      window.location.href = redirectUrl;
    }, 2000);
    return () => clearTimeout(timer);
  }, [searchParams, redirectUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
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
              : 'Je wordt doorgestuurd naar het nieuwe aantekeningen dashboard...'}
          </p>
        </div>

        <div className="mb-8">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-sm">
            {isRedirecting ? 'Doorsturen naar nieuwe app...' : 'Voorbereiden...'}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">Als je niet automatisch wordt doorgestuurd:</p>
          <a
            href={redirectUrl}
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            🚀 Ga naar Aantekeningen App
          </a>
        </div>

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
  );
}

export function AantekeningenClient() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Laden...</div>}>
      <AantekeningenContent />
    </Suspense>
  );
}
