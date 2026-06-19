"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, useTexture } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Artwork } from "@/lib/artworks";

type FloatingArtworkProps = {
  artwork: Artwork;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

function FloatingArtwork({
  artwork,
  position,
  rotation = [0, 0, 0],
  scale = 1,
}: FloatingArtworkProps) {
  const texture = useTexture(artwork.src);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y =
      rotation[1] + Math.sin(state.clock.elapsedTime * 0.35 + position[0]) * 0.08;
  });

  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
      <group position={position} rotation={rotation} scale={scale}>
        <mesh ref={meshRef}>
          <planeGeometry args={[1.35, 1.75]} />
          <meshStandardMaterial
            map={texture}
            transparent
            opacity={0.92}
            roughness={0.85}
            metalness={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[1.42, 1.82]} />
          <meshStandardMaterial color="#1a1a1a" roughness={1} />
        </mesh>
      </group>
    </Float>
  );
}

function GraphiteMist() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 420;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      sz[i] = Math.random() * 0.035 + 0.008;
    }

    return [pos, sz];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    pointsRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.08) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#8a8a8a"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={0.65} color="#fffaf5" />
      <pointLight position={[-3, 1, 2]} intensity={0.65} color="#7a0010" />
      <pointLight position={[3, -1, 1]} intensity={0.25} color="#8a8a8a" />
    </>
  );
}

function CameraRig() {
  const { camera, pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      pointer.x * 0.35,
      0.04
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      pointer.y * 0.2 + Math.sin(t * 0.25) * 0.05,
      0.04
    );
    camera.lookAt(0, 0, -1);
  });

  return null;
}

type StudioHeroSceneProps = {
  artworks: Artwork[];
};

function StudioHeroSceneInner({ artworks }: StudioHeroSceneProps) {
  const [left, center, right] = artworks;

  return (
    <>
      <SceneLighting />
      <CameraRig />
      <GraphiteMist />
      <Sparkles
        count={80}
        scale={[12, 8, 6]}
        size={1.2}
        speed={0.25}
        opacity={0.35}
        color="#7a0010"
      />

      {left ? (
        <FloatingArtwork
          artwork={left}
          position={[-2.8, 0.2, -1.5]}
          rotation={[0, 0.35, -0.08]}
          scale={0.85}
        />
      ) : null}
      {center ? (
        <FloatingArtwork
          artwork={center}
          position={[0, -0.1, -0.8]}
          rotation={[0, 0, 0.02]}
          scale={1.05}
        />
      ) : null}
      {right ? (
        <FloatingArtwork
          artwork={right}
          position={[2.6, 0.35, -1.2]}
          rotation={[0, -0.4, 0.06]}
          scale={0.8}
        />
      ) : null}

      <mesh position={[0, -2.5, -3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#ede7dc" roughness={1} />
      </mesh>
    </>
  );
}

export function StudioHeroScene({ artworks }: StudioHeroSceneProps) {
  return (
    <Suspense fallback={null}>
      <StudioHeroSceneInner artworks={artworks} />
    </Suspense>
  );
}
