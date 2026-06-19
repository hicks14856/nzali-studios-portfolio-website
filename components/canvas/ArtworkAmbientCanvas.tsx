"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { Artwork } from "@/lib/artworks";
import { useDeviceCapability, useEnableWebGL } from "@/hooks/useDeviceCapability";

const ArtworkAmbientCanvasInner = dynamic(
  () =>
    import("@/components/canvas/ArtworkAmbientCanvasInner").then(
      (mod) => mod.ArtworkAmbientCanvasInner
    ),
  { ssr: false }
);

type ArtworkAmbientCanvasProps = {
  artwork: Artwork;
};

function AmbientFallback() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      style={{
        background: `
          radial-gradient(ellipse 65% 50% at 50% 30%, rgba(122, 0, 16, 0.06) 0%, transparent 70%),
          linear-gradient(180deg, #f5f0e8 0%, #faf7f2 100%)
        `,
      }}
    />
  );
}

export function ArtworkAmbientCanvas({ artwork }: ArtworkAmbientCanvasProps) {
  const capability = useDeviceCapability();
  const enableWebGL = useEnableWebGL();

  if (capability === "minimal" || !enableWebGL) {
    return <AmbientFallback />;
  }

  return (
    <Suspense fallback={<AmbientFallback />}>
      <ArtworkAmbientCanvasInner
        artwork={artwork}
        dpr={capability === "reduced" ? [1, 1.25] : [1, 1.5]}
      />
    </Suspense>
  );
}
