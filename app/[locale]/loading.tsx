import { FiLoader } from 'react-icons/fi';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--ink)] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-[var(--ink-light)]/80 backdrop-blur-lg rounded-2xl shadow-2xl p-12 text-center text-[var(--cream)]">
        <div className="mb-8 flex justify-center">
          <FiLoader className="w-20 h-20 text-[var(--amber)] animate-spin" />
        </div>
        <h2 className="text-4xl font-bold font-display mb-4">Loading...</h2>
        <p className="text-xl text-[var(--cream)]/80">
          Please wait while we prepare your content.
        </p>
      </div>
    </div>
  );
} 