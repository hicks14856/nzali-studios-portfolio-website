"use client";

import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";
import {
  defaultViewport,
  sectionStaggerVariants,
  sectionViewport,
  smoothRevealVariants,
} from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useDeviceCapability";

type StoryRevealProps = MotionProps & {
  children?: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "p" | "span" | "h1" | "h2" | "h3";
};

const motionTags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  p: motion.p,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const;

export function StoryReveal({
  children,
  delay = 0,
  as = "div",
  className,
  ...props
}: StoryRevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const Component = motionTags[as];

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
        hidden: smoothRevealVariants.hidden,
        visible: {
          ...smoothRevealVariants.visible,
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

type StoryStaggerProps = MotionProps & {
  children?: ReactNode;
  className?: string;
  as?: "div" | "section" | "ul";
};

export function StoryStagger({
  children,
  as = "div",
  className,
  ...props
}: StoryStaggerProps) {
  const reducedMotion = usePrefersReducedMotion();
  const Component = as === "ul" ? motion.ul : motion.div;

  if (reducedMotion) {
    const StaticTag = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionStaggerVariants}
      {...props}
    >
      {children}
    </Component>
  );
}
