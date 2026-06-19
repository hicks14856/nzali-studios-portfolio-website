"use client";

import type { ReactNode } from "react";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { SketchBorder } from "./sketch-border";

type SectionContainerProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  sketchVariant?: "default" | "heavy" | "crimson";
  labelledBy?: string;
  ariaLabel?: string;
  revealDelay?: number;
  revealStagger?: boolean;
  /** Set false when children handle their own scroll reveals */
  reveal?: boolean;
};

export function SectionContainer({
  id,
  children,
  className = "",
  sketchVariant = "default",
  labelledBy,
  ariaLabel,
  revealDelay = 0,
  revealStagger = false,
  reveal = true,
}: SectionContainerProps) {
  const inner = (
    <div className="mx-auto max-w-content">
      <SketchBorder variant={sketchVariant} className="sketch-padding">
        {children}
      </SketchBorder>
    </div>
  );

  if (!reveal) {
    return (
      <section
        id={id}
        aria-labelledby={labelledBy}
        aria-label={ariaLabel}
        className={`px-4 py-section sm:px-6 lg:px-8 ${className}`}
      >
        {inner}
      </section>
    );
  }

  return (
    <SectionReveal
      id={id}
      labelledBy={labelledBy}
      ariaLabel={ariaLabel}
      delay={revealDelay}
      stagger={revealStagger}
      className={`px-4 py-section sm:px-6 lg:px-8 ${className}`}
    >
      {inner}
    </SectionReveal>
  );
}
