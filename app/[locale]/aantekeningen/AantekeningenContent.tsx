'use client';

import { useReducer, useEffect } from 'react';
import { Link } from '@/i18n/navigation';

type State = { studentName: string | null; isRedirecting: boolean };

function reducer(state: State, action: { type: 'SET_NAME' | 'SET_REDIRECTING'; payload?: string | boolean }): State {
  if (action.type === 'SET_NAME') return { ...state, studentName: (action.payload as string | null) ?? null };
  if (action.type === 'SET_REDIRECTING') return { ...state, isRedirecting: (action.payload as boolean) ?? true };
  return state;
}

interface AantekeningenContentProps {
  student?: string;
}

export function AantekeningenContent({ student: initialStudent }: AantekeningenContentProps) {
  const [state, dispatch] = useReducer(reducer, {
    studentName: initialStudent ?? null,
    isRedirecting: false,
  });
  const { studentName, isRedirecting } = state;

  const baseAantekeningenAppURL = process.env.NEXT_PUBLIC_AANTEKENINGEN_APP_URL;
  if (!baseAantekeningenAppURL) {
    throw new Error('NEXT_PUBLIC_AANTEKENINGEN_APP_URL environment variable is required but not set');
  }
  const redirectUrl = studentName
    ? `${baseAantekeningenAppURL}?student=${encodeURIComponent(studentName)}`
    : baseAantekeningenAppURL;

  useEffect(() => {
    dispatch({ type: 'SET_NAME', payload: initialStudent ?? undefined });
    dispatch({ type: 'SET_REDIRECTING', payload: true });
    const timer = setTimeout(() => {
      window.location.href = redirectUrl;
    }, 2000);
    return () => clearTimeout(timer);
  }, [initialStudent, redirectUrl]);

  return (
    <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[var(--cream-dark)] rounded-2xl shadow-xl p-8 text-center border border-[var(--border-warm)]">
        <div className="mb-8">
          <div className="w-20 h-20 bg-[var(--ink)] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📚</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-[var(--ink)] mb-2">
            {studentName ? `${studentName}'s Aantekeningen` : 'Aantekeningen'}
          </h1>
          <p className="text-[var(--muted-text)]">
            {studentName
              ? `Je wordt doorgestuurd naar ${studentName}'s aantekeningen...`
              : 'Je wordt doorgestuurd naar het nieuwe aantekeningen dashboard...'}
          </p>
        </div>

        <div className="mb-8">
          <div className="w-16 h-16 border-4 border-[var(--border-warm)] border-t-[var(--amber)] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--muted-text)] text-sm">
            {isRedirecting ? 'Doorsturen naar nieuwe app...' : 'Voorbereiden...'}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-[var(--muted-text)]">Als je niet automatisch wordt doorgestuurd:</p>
          <a
            href={redirectUrl}
            className="inline-block bg-[var(--ink)] text-[var(--cream)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--ink-light)] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            🚀 Ga naar Aantekeningen App
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border-warm)]">
          <div className="flex items-center justify-center gap-4 text-xs text-[var(--muted-text)]">
            <span>🔒 Privacy veilig</span>
            <span>•</span>
            <span>⚡ Snelle zoekresultaten</span>
            <span>•</span>
            <span>📱 Mobiel vriendelijk</span>
          </div>
          <div className="mt-3">
            <Link href="/" className="text-[var(--amber)] hover:text-[var(--amber-hover)] text-sm font-medium">
              ← Terug naar hoofdsite
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
