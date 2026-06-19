"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh items-center justify-center bg-[#faf7f2] px-6 font-sans text-[#404040]">
        <div className="max-w-md text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#7a0010]">
            Something went wrong
          </p>
          <h1 className="mb-4 text-3xl text-[#1a1a1a]">The studio paused</h1>
          <p className="mb-8 text-sm text-[#6b6b6b]">
            {error.message || "An unexpected error interrupted the page."}
          </p>
          <button
            type="button"
            onClick={reset}
            className="rounded border border-[#7a0010]/40 px-5 py-2 text-xs uppercase tracking-[0.25em] text-charcoal transition-colors hover:border-[#7a0010] hover:bg-[#7a0010]/5"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
