"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-[var(--cream)]">
          <div className="text-center">
            <h2 className="text-2xl font-bold font-display text-[var(--ink)] mb-2">Something went wrong!</h2>
            <button
              className="mt-4 px-4 py-2 bg-[var(--ink)] text-[var(--cream)] rounded hover:bg-[var(--ink-light)] transition-colors"
              onClick={() => reset()}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}