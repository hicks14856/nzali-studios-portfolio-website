"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { GraphiteDispersionPlane } from "@/components/canvas/GraphiteDispersionScene";

type GraphiteDispersionCanvasProps = {
  progress: number;
  intensity?: number;
  dpr?: number | [number, number];
  className?: string;
};

export function GraphiteDispersionCanvas({
  progress,
  intensity = 1,
  dpr = [1, 1.75],
  className = "",
}: GraphiteDispersionCanvasProps) {
  return (
    <Canvas
      className={className}
      dpr={dpr}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: false,
      }}
      camera={{ position: [0, 0, 1], fov: 75, near: 0.1, far: 10 }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <GraphiteDispersionPlane progress={progress} intensity={intensity} />
      </Suspense>
    </Canvas>
  );
}
