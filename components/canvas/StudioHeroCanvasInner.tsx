"use client";

import { Canvas } from "@react-three/fiber";
import { StudioHeroScene } from "@/components/canvas/StudioHeroScene";
import type { Artwork } from "@/lib/artworks";

type StudioHeroCanvasInnerProps = {
  artworks: Artwork[];
  className?: string;
  dpr?: number | [number, number];
};

export function StudioHeroCanvasInner({
  artworks,
  className = "",
  dpr = [1, 1.75],
}: StudioHeroCanvasInnerProps) {
  return (
    <Canvas
      className={className}
      dpr={dpr}
      camera={{ position: [0, 0, 4.5], fov: 42, near: 0.1, far: 30 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <StudioHeroScene artworks={artworks} />
    </Canvas>
  );
}
