"use client";

import { type ReactNode, type RefObject } from "react";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import { SectionTransitionOverlay } from "@/components/canvas/SectionTransitionOverlay";
import { SiteGrain } from "@/components/ui/site-grain";
import { usePrefersReducedMotion } from "@/hooks/useDeviceCapability";

type AnimationLayerProps = {
  children: ReactNode;
  heroRef?: RefObject<HTMLElement | null>;
  aboutRef?: RefObject<HTMLElement | null>;
  /** Set false to skip the WebGL section overlay */
  enableSectionTransition?: boolean;
};

/**
 * Top-level animation wrapper — mounts Lenis smooth scroll and optional
 * hero→about WebGL transition overlay. Wrap inside layout, above page content.
 */
export function AnimationLayer({
  children,
  heroRef,
  aboutRef,
  enableSectionTransition = true,
}: AnimationLayerProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <SmoothScrollProvider disabled={reducedMotion}>
      {!reducedMotion ? <SiteGrain /> : null}
      {enableSectionTransition && heroRef && aboutRef ? (
        <SectionTransitionOverlay heroRef={heroRef} aboutRef={aboutRef} />
      ) : null}
      {children}
    </SmoothScrollProvider>
  );
}
