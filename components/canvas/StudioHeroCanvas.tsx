"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { Artwork } from "@/lib/artworks";
import { useDeviceCapability, useEnableWebGL } from "@/hooks/useDeviceCapability";

const StudioHeroCanvasInner = dynamic(
  () =>
    import("@/components/canvas/StudioHeroCanvasInner").then(
      (mod) => mod.StudioHeroCanvasInner
    ),
  { ssr: false }
);

type StudioHeroCanvasProps = {
  artworks: Artwork[];
  className?: string;
};

function StudioHeroFallback({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
      style={{
        background: `
          radial-gradient(ellipse 70% 55% at 50% 40%, rgba(122, 0, 16, 0.06) 0%, transparent 65%),
          radial-gradient(ellipse 90% 70% at 20% 80%, rgba(107, 107, 107, 0.04) 0%, transparent 55%)
        `,
      }}
    />
  );
}

export function StudioHeroCanvas({ artworks, className = "" }: StudioHeroCanvasProps) {
  const capability = useDeviceCapability();
  const enableWebGL = useEnableWebGL();

  if (capability === "minimal" || !enableWebGL) {
    return <StudioHeroFallback className={className} />;
  }

  return (
    <Suspense fallback={<StudioHeroFallback className={className} />}>
      <StudioHeroCanvasInner
        artworks={artworks}
        className={className}
        dpr={capability === "reduced" ? [1, 1.25] : [1, 1.75]}
      />
    </Suspense>
  );
}
