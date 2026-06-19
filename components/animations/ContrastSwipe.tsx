"use client";

import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";
import {
  contrastSwipeVariants,
  defaultViewport,
  smoothRevealVariants,
} from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useDeviceCapability";

type ContrastSwipeProps = MotionProps & {
  children?: ReactNode;
  className?: string;
  from?: "left" | "right";
  as?: "div" | "section" | "article";
};

const motionTags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
} as const;

/** Smooth horizontal fade reveal (replaces hard swipe). */
export function ContrastSwipe({
  children,
  from = "left",
  as = "div",
  className,
  ...props
}: ContrastSwipeProps) {
  const reducedMotion = usePrefersReducedMotion();
  const Component = motionTags[as];
  const xOffset = from === "left" ? -14 : 14;

  if (reducedMotion) {
    const StaticTag = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={{
        hidden: {
          ...contrastSwipeVariants.hidden,
          x: xOffset,
        },
        visible: {
          ...smoothRevealVariants.visible,
          x: 0,
        },
      }}
      style={{ willChange: "transform, opacity" }}
      {...props}
    >
      {children}
    </Component>
  );
}
