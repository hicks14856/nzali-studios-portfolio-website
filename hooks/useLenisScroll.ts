"use client";

import { useEffect } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import type { MotionValue } from "motion-dom";
import { useLenisInstance } from "@/components/animations/SmoothScrollProvider";

type UseLenisScrollOptions = {
  onScroll?: (scroll: number) => void;
};

/**
 * Bridges Framer Motion scroll signals with the active Lenis instance.
 * Returns the same `scrollY` / `scrollYProgress` MotionValues as `useScroll`.
 */
export function useLenisScroll(options: UseLenisScrollOptions = {}) {
  const lenis = useLenisInstance();
  const scroll = useScroll();

  useEffect(() => {
    if (!lenis || !options.onScroll) {
      return;
    }

    const unsubscribe = lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      options.onScroll?.(scroll);
    });

    return () => {
      unsubscribe();
    };
  }, [lenis, options.onScroll]);

  return scroll;
}

type SectionScrollProgress = {
  progress: MotionValue<number>;
  isTransitioning: MotionValue<number>;
};

type UseSectionTransitionProgressOptions = {
  /** Ref to the hero / landing section */
  heroTarget?: React.RefObject<HTMLElement | null>;
  /** Ref to the about section */
  aboutTarget?: React.RefObject<HTMLElement | null>;
};

/**
 * Tracks scroll progress between the landing hero and about sections.
 * `progress` runs 0→1 as the user scrolls from hero start to about midpoint.
 */
export function useSectionTransitionProgress(
  options: UseSectionTransitionProgressOptions = {}
): SectionScrollProgress {
  const { scrollYProgress } = useScroll({
    target: options.heroTarget ?? undefined,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: aboutProgress } = useScroll({
    target: options.aboutTarget ?? undefined,
    offset: ["start end", "start center"],
  });

  return {
    progress: scrollYProgress,
    isTransitioning: aboutProgress,
  };
}

export function useScrollProgressCallback(
  progress: MotionValue<number>,
  callback: (value: number) => void
) {
  useMotionValueEvent(progress, "change", callback);
}
