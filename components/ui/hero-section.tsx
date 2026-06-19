"use client";

import { forwardRef, useCallback, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { HeroParallaxLayers } from "@/components/animations/HeroParallaxLayers";
import { InkReveal } from "@/components/animations/InkReveal";
import { SecureImage } from "@/components/security/SecureImage";
import { usePrefersReducedMotion } from "@/hooks/useDeviceCapability";
import { featuredArtwork } from "@/lib/artworks";
import { siteContent } from "@/lib/content";
import { ArtworkFrame } from "./artwork-frame";
import { ArtistName } from "./artist-name";
import { SketchBorder } from "./sketch-border";

export const HeroSection = forwardRef<HTMLElement>(function HeroSection(_, ref) {
  const reducedMotion = usePrefersReducedMotion();
  const internalRef = useRef<HTMLElement>(null);

  const setSectionRef = useCallback(
    (node: HTMLElement | null) => {
      internalRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  const { scrollYProgress } = useScroll({
    target: internalRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.5,
  });

  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "-18%"]);
  const contentScale = useTransform(smoothProgress, [0, 1], [1, 0.94]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.75, 1], [1, 0.85, 0.35]);
  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);

  if (reducedMotion) {
    return (
      <section
        ref={setSectionRef}
        id="hero"
        aria-labelledby="hero-heading"
        className="relative flex min-h-dvh items-center justify-center px-4 pb-section pt-28 sm:px-6 lg:px-8"
      >
        <HeroContent />
      </section>
    );
  }

  return (
    <section
      ref={setSectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative h-[220vh]"
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        <HeroParallaxLayers scrollProgress={smoothProgress} />

        <div className="memory-grain pointer-events-none absolute inset-0 z-[1] opacity-35" />

        <motion.div
          className="relative z-[2] flex h-full items-center justify-center px-4 pb-section pt-28 sm:px-6 lg:px-8"
          style={{
            y: contentY,
            scale: contentScale,
            opacity: contentOpacity,
            willChange: "transform, opacity",
          }}
        >
          <HeroContent animated />
        </motion.div>

        <motion.p
          className="label-luxury absolute bottom-8 left-1/2 z-[3] -translate-x-1/2 text-graphite/60"
          style={{ opacity: scrollHintOpacity }}
          aria-hidden="true"
        >
          Scroll to enter the studio
          <span className="mt-2 block text-center text-lg">↓</span>
        </motion.p>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

function HeroContent({ animated = false }: { animated?: boolean }) {
  const heading = (
    <>
      <p className="label-luxury mb-6 text-crimson-muted/70">
        {siteContent.artist.discipline}
      </p>
      <ArtistName as="h1" id="hero-heading" className="text-balance" />
      <div className="sketch-divider my-8 max-w-md" role="presentation" />
      <p className="font-heading text-xl italic text-graphite-light sm:text-2xl">
        {siteContent.artist.tagline}
      </p>
    </>
  );

  const story = (
    <p className="body-prose mt-6 max-w-md text-sm text-graphite-light">
      {featuredArtwork.story}
    </p>
  );

  const artwork = (
    <aside className="flex flex-col justify-end gap-6">
      <ArtworkFrame
        variant={featuredArtwork.frame}
        tilt={featuredArtwork.tilt}
        caption={featuredArtwork.memory}
        className="w-full max-w-sm lg:ml-auto"
      >
        <div className="artwork-stage relative aspect-[4/5] w-full overflow-hidden">
          <SecureImage
            src={featuredArtwork.src}
            alt={featuredArtwork.title}
            fill
            sizes="(max-width: 1024px) 100vw, 400px"
            priority
            className="artwork-lift object-cover p-3"
          />
        </div>
      </ArtworkFrame>
      <div className="text-right lg:ml-auto">
        <p className="font-heading text-lg text-charcoal">{featuredArtwork.title}</p>
        <p className="font-body text-xs uppercase tracking-widest text-graphite-light">
          {featuredArtwork.medium}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4 lg:ml-auto lg:justify-end">
        <a
          href="#stories"
          className="label-luxury inline-flex items-center gap-3 text-crimson-muted transition-colors hover:text-crimson"
        >
          Read the stories
          <span aria-hidden="true" className="text-lg">
            ↓
          </span>
        </a>
        <a
          href="#gallery"
          className="sketch-border sketch-border-crimson rounded-sketch px-5 py-2.5 font-body text-[0.65rem] uppercase tracking-[0.3em] text-white transition-colors hover:bg-crimson-dark/30"
        >
          View catalogue
        </a>
      </div>
    </aside>
  );

  return (
    <div className="relative mx-auto w-full max-w-content">
      <SketchBorder variant="heavy" className="sketch-padding shadow-luxury">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            {animated ? (
              <>
                <InkReveal delay={0.05}>{heading}</InkReveal>
                <InkReveal delay={0.2}>{story}</InkReveal>
              </>
            ) : (
              <>
                {heading}
                {story}
              </>
            )}
          </div>
          {animated ? <InkReveal delay={0.35}>{artwork}</InkReveal> : artwork}
        </div>
      </SketchBorder>
    </div>
  );
}
