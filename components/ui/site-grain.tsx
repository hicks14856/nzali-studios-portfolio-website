"use client";

/**
 * Sitewide cinematic grain overlay — matches Supari's film-grain layer,
 * tuned for Nzali's milk-white palette.
 */
export function SiteGrain() {
  return (
    <div
      className="site-grain pointer-events-none fixed inset-0 z-[60]"
      aria-hidden="true"
    />
  );
}
