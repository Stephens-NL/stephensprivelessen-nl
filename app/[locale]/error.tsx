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
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-12 text-center text-white">
        <div className="mb-8 flex justify-center">
          <FiAlertTriangle className="w-20 h-20 text-yellow-300" />
        </div>
        <h2 className="text-4xl font-bold mb-4">Oops! Something went wrong</h2>
        <p className="text-xl text-red-100 mb-8">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 transition-all duration-200 transform hover:scale-105"
        >
          <FiRefreshCw className="mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );
} 