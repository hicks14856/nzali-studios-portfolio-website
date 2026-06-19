"use client";

import dynamic from "next/dynamic";
import {
  useEffect,
  useState,
  type RefObject,
} from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useDeviceCapability,
  useEnableWebGL,
} from "@/hooks/useDeviceCapability";

const GraphiteDispersionCanvas = dynamic(
  () =>
    import("@/components/canvas/GraphiteDispersionCanvas").then(
      (mod) => mod.GraphiteDispersionCanvas
    ),
  { ssr: false }
);

type SectionTransitionOverlayProps = {
  /** Ref attached to the landing / hero section */
  heroRef: RefObject<HTMLElement | null>;
  /** Ref attached to the about section */
  aboutRef: RefObject<HTMLElement | null>;
  className?: string;
};

/**
 * Scroll-driven WebGL overlay for hero → about transitions.
 * Renders a graphite dust / liquid smoke dispersion that follows scroll progress.
 * Automatically degrades to a CSS gradient on reduced-capability devices.
 */
export function SectionTransitionOverlay({
  heroRef,
  aboutRef,
  className = "",
}: SectionTransitionOverlayProps) {
  const capability = useDeviceCapability();
  const enableWebGL = useEnableWebGL();
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: aboutEntry } = useScroll({
    target: aboutRef,
    offset: ["start end", "start center"],
  });

  const blended = useTransform([scrollYProgress, aboutEntry], ([hero, about]) => {
    const heroVal = typeof hero === "number" ? hero : 0;
    const aboutVal = typeof about === "number" ? about : 0;
    return Math.min(1, heroVal * 0.65 + aboutVal * 0.55);
  });

  const smoothProgress = useSpring(blended, {
    stiffness: 90,
    damping: 28,
    mass: 0.6,
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (value: number) => {
      setProgress(value);
    });

    return unsubscribe;
  }, [smoothProgress]);

  const cssOpacity = useTransform(smoothProgress, [0, 0.4, 1], [0, 0.55, 0.25]);
  const cssShift = useTransform(smoothProgress, [0, 1], [0, 18]);
  const cssTransform = useTransform(cssShift, (y) => `translate3d(0, ${y}%, 0)`);

  if (capability === "minimal") {
    return null;
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {enableWebGL ? (
        <GraphiteDispersionCanvas
          progress={progress}
          intensity={capability === "reduced" ? 0.45 : 1}
          dpr={capability === "reduced" ? [1, 1.25] : [1, 1.75]}
        />
      ) : (
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: cssOpacity,
            transform: cssTransform,
            willChange: "transform, opacity",
            background: `
              radial-gradient(ellipse 80% 60% at 50% 40%, rgba(122, 0, 16, 0.08) 0%, transparent 65%),
              radial-gradient(ellipse 120% 80% at 50% 70%, rgba(107, 107, 107, 0.08) 0%, transparent 70%),
              linear-gradient(180deg, rgba(250, 247, 242, 0) 0%, rgba(250, 247, 242, 0.45) 100%)
            `,
          }}
        />
      )}
    </div>
  );
}
