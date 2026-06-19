"use client";

import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { defaultViewport, smoothRevealVariants } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useDeviceCapability";

type InkRevealProps = MotionProps & {
  children?: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left";
  as?: "div" | "p" | "span" | "h1" | "h2" | "h3" | "blockquote";
};

const directionOffsets = {
  up: 20,
  down: -20,
  left: 16,
} as const;

const motionTags = {
  div: motion.div,
  p: motion.p,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  blockquote: motion.blockquote,
} as const;

/** Smooth fade-and-rise reveal (formerly ink-style). */
export function InkReveal({
  children,
  delay = 0,
  direction = "up",
  as = "div",
  className,
  ...props
}: InkRevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const Component = motionTags[as];
  const offset = directionOffsets[direction];
  const isHorizontal = direction === "left";

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
          opacity: 0,
          ...(isHorizontal ? { x: offset } : { y: offset }),
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            ...(typeof smoothRevealVariants.visible === "object" &&
            smoothRevealVariants.visible !== null &&
            "transition" in smoothRevealVariants.visible
              ? smoothRevealVariants.visible.transition
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
