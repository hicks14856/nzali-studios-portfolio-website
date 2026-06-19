"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, useTexture } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import type { Artwork } from "@/lib/artworks";

function AmbientTexturePlane({ src }: { src: string }) {
  const texture = useTexture(src);
  const meshRef = useRef<THREE.Mesh>(null);

  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.02;
    const material = meshRef.current.material;
    if (material instanceof THREE.MeshBasicMaterial) {
      material.opacity =
        0.08 + Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -4]} scale={[8, 10, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.09}
        depthWrite={false}
      />
    </mesh>
  );
}

function AmbientScene({ artwork }: { artwork: Artwork }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <Suspense fallback={null}>
        <AmbientTexturePlane src={artwork.src} />
      </Suspense>
      <Sparkles
        count={40}
        scale={[10, 8, 4]}
        size={1}
        speed={0.15}
        opacity={0.25}
        color="#7a0010"
      />
    </>
  );
}

type ArtworkAmbientCanvasInnerProps = {
  artwork: Artwork;
  dpr?: number | [number, number];
};

export function ArtworkAmbientCanvasInner({
  artwork,
  dpr = [1, 1.5],
}: ArtworkAmbientCanvasInnerProps) {
  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 2], fov: 50 }}
      gl={{ alpha: true, antialias: false }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <AmbientScene artwork={artwork} />
    </Canvas>
  );
}
