"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import {
  useDeviceCapability,
  usePrefersReducedMotion,
} from "@/hooks/useDeviceCapability";
import {
  sectionAtmospheres,
  type SectionAtmosphereId,
} from "@/lib/section-atmosphere";

type ImmersiveSectionProps = {
  children: ReactNode;
  atmosphere: SectionAtmosphereId;
  className?: string;
  id?: string;
  /** First section on the page — background visible immediately at load */
  isFirst?: boolean;
};

function ImmersiveSectionMotion({
  children,
  atmosphere,
  className = "",
  id,
  isFirst = false,
}: ImmersiveSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const theme = sectionAtmospheres[atmosphere];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center", "start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 26,
    mass: 0.55,
  });

  const bgScale = useTransform(smoothProgress, [0, 0.45, 1], [1.14, 1, 1.06]);
  const bgOpacity = useTransform(
    smoothProgress,
    isFirst ? [0, 0.15, 0.85, 1] : [0, 0.2, 0.8, 1],
    isFirst ? [1, 1, 1, 0.35] : [0, 1, 1, 0]
  );

  const contentScale = useTransform(
    smoothProgress,
    [0, 0.35, 0.55, 1],
    [0.84, 0.96, 1, 0.9]
  );
  const contentRotateX = useTransform(
    smoothProgress,
    [0, 0.35, 0.55, 1],
    [16, 5, 0, -8]
  );
  const contentY = useTransform(
    smoothProgress,
    [0, 0.35, 0.55, 1],
    [140, 40, 0, -100]
  );
  const contentOpacity = useTransform(
    smoothProgress,
    [0, 0.25, 0.75, 1],
    [0.15, 0.85, 1, 0.4]
  );

  return (
    <section
      ref={ref}
      id={id}
      className={`relative isolate overflow-hidden bg-transparent ${className}`}
    >
      <AtmosphereLayer
        background={theme.background}
        scale={bgScale}
        opacity={bgOpacity}
      />
      <motion.div
        className="relative z-[1] [transform-style:preserve-3d]"
        style={{
          scale: contentScale,
          rotateX: contentRotateX,
          y: contentY,
          opacity: contentOpacity,
          transformPerspective: 1400,
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}

type AtmosphereLayerProps = {
  background: string;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
};

function AtmosphereLayer({ background, scale, opacity }: AtmosphereLayerProps) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0 origin-center"
      style={{
        scale,
        opacity,
        background,
        willChange: "transform, opacity",
      }}
      aria-hidden="true"
    />
  );
}

/**
 * Scroll-driven section stage — crossfading atmosphere backgrounds and a
 * perspective zoom-in as each block enters the viewport.
 */
export function ImmersiveSection({
  children,
  atmosphere,
  className = "",
  id,
  isFirst = false,
}: ImmersiveSectionProps) {
  const reducedMotion = usePrefersReducedMotion();
  const capability = useDeviceCapability();
  const theme = sectionAtmospheres[atmosphere];

  if (reducedMotion || capability !== "full") {
    return (
      <section id={id} className={`relative bg-transparent ${className}`}>
        {children}
      </section>
    );
  }

  return (
    <ImmersiveSectionMotion
      atmosphere={atmosphere}
      className={className}
      id={id}
      isFirst={isFirst}
    >
      {children}
    </ImmersiveSectionMotion>
  );
}
