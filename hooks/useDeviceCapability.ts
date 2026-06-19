"use client";

import { useEffect, useState } from "react";

export type DeviceCapability = "full" | "reduced" | "minimal";

function resolveCapability(): DeviceCapability {
  if (typeof window === "undefined") {
    return "full";
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    return "minimal";
  }

  const coarsePointer = window.matchMedia(
    "(hover: none) and (pointer: coarse)"
  ).matches;

  const narrowViewport = window.matchMedia("(max-width: 768px)").matches;

  const lowMemory =
    "deviceMemory" in navigator &&
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory !==
      undefined &&
    ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <=
      4;

  if (coarsePointer || narrowViewport || lowMemory) {
    return "reduced";
  }

  return "full";
}

/**
 * Detects whether heavy WebGL / scroll effects should run at full fidelity.
 * Uses media queries for coarse pointers, narrow viewports, reduced motion,
 * and low device memory when available.
 */
export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>("full");

  useEffect(() => {
    const queries = [
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(hover: none) and (pointer: coarse)"),
      window.matchMedia("(max-width: 768px)"),
    ];

    const update = () => setCapability(resolveCapability());

    update();
    queries.forEach((query) => query.addEventListener("change", update));

    return () => {
      queries.forEach((query) => query.removeEventListener("change", update));
    };
  }, []);

  return capability;
}

export function usePrefersReducedMotion(): boolean {
  const capability = useDeviceCapability();
  return capability === "minimal";
}

export function useEnableWebGL(): boolean {
  const capability = useDeviceCapability();
  return capability === "full";
}
