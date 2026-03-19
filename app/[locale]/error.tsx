'use client';

import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[var(--ink)] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-[var(--ink-light)]/80 backdrop-blur-lg rounded-2xl shadow-2xl p-12 text-center text-[var(--cream)]">
        <div className="mb-8 flex justify-center">
          <FiAlertTriangle className="w-20 h-20 text-[var(--terracotta)]" />
        </div>
        <h2 className="text-4xl font-bold font-display mb-4">Oops! Something went wrong</h2>
        <p className="text-xl text-[var(--cream)]/80 mb-8">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center px-6 py-3 text-lg font-semibold rounded-lg bg-[var(--amber)] hover:bg-[var(--amber-hover)] text-[var(--ink)] transition-all duration-200 transform hover:scale-105"
        >
          <FiRefreshCw className="mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );
} 