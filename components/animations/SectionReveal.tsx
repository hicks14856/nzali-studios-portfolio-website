"use client";

import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";
import {
  sectionChildVariants,
  sectionRevealVariants,
  sectionStaggerVariants,
  sectionViewport,
} from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useDeviceCapability";

type SectionRevealProps = MotionProps & {
  children?: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
  ariaLabel?: string;
  delay?: number;
  stagger?: boolean;
  as?: "section" | "div" | "article";
};

const motionTags = {
  section: motion.section,
  div: motion.div,
  article: motion.article,
} as const;

/**
 * Scroll-triggered reveal for major page sections and components.
 * Use `stagger` when direct children are motion elements with `sectionChildVariants`.
 */
export function SectionReveal({
  children,
  className,
  id,
  labelledBy,
  ariaLabel,
  delay = 0,
  stagger = false,
  as = "section",
  ...props
}: SectionRevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const Component = motionTags[as];

  if (reducedMotion) {
    const StaticTag = as;
    return (
      <StaticTag
        id={id}
        aria-labelledby={labelledBy}
        aria-label={ariaLabel}
        className={className}
      >
        {children}
      </StaticTag>
    );
  }

  const variants = stagger ? sectionStaggerVariants : sectionRevealVariants;

  return (
    <Component
      id={id}
      aria-labelledby={labelledBy}
      aria-label={ariaLabel}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...(typeof variants.visible === "object" && variants.visible !== null
            ? variants.visible
            : {}),
          transition: {
            ...(typeof variants.visible === "object" &&
            variants.visible !== null &&
            "transition" in variants.visible &&
            typeof variants.visible.transition === "object"
              ? variants.visible.transition
              : {}),
            delay,
          },
        },
      }}
      style={{ willChange: "transform, opacity" }}
      {...props}
    >
      {children}
    </Component>
  );
}

export { sectionChildVariants };
