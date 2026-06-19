"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  graphiteFragmentShader,
  graphiteVertexShader,
} from "@/components/canvas/shaders/graphiteDispersion";

type GraphiteDispersionMaterialProps = {
  progress: number;
  intensity?: number;
};

function GraphiteDispersionMaterial({
  progress,
  intensity = 1,
}: GraphiteDispersionMaterialProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uIntensity: { value: intensity },
    }),
    [intensity, size.height, size.width]
  );

  useFrame((state) => {
    if (!materialRef.current) {
      return;
    }

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uProgress.value = THREE.MathUtils.clamp(
      progress,
      0,
      1
    );
    materialRef.current.uniforms.uResolution.value.set(
      size.width,
      size.height
    );
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={graphiteVertexShader}
      fragmentShader={graphiteFragmentShader}
      uniforms={uniforms}
      transparent
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  );
}

type GraphiteDispersionPlaneProps = {
  progress: number;
  intensity?: number;
};

export function GraphiteDispersionPlane({
  progress,
  intensity = 1,
}: GraphiteDispersionPlaneProps) {
  return (
    <mesh scale={[2, 2, 1]}>
      <planeGeometry args={[1, 1]} />
      <GraphiteDispersionMaterial progress={progress} intensity={intensity} />
    </mesh>
  );
}
