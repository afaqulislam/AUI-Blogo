"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center px-4 bg-amber-50 dark:bg-slate-950">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-amber-50">
              Something went wrong
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              An unexpected error occurred. Please try again.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
