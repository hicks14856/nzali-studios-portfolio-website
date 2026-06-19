"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { StudioHeroCanvas } from "@/components/canvas/StudioHeroCanvas";
import { InkReveal } from "@/components/animations/InkReveal";
import { ArtworkViewer } from "@/components/ui/artwork-viewer";
import { ArtistName } from "@/components/ui/artist-name";
import { usePrefersReducedMotion } from "@/hooks/useDeviceCapability";
import { getHighlightArtworks, featuredArtwork } from "@/lib/artworks";
import { siteContent } from "@/lib/content";
import { springReveal } from "@/lib/motion";

const spotlightWorks = getHighlightArtworks();
const heroFloaters = spotlightWorks.slice(0, 3);

export function LandingHero() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeWork = spotlightWorks[activeIndex] ?? featuredArtwork;

  useEffect(() => {
    if (reducedMotion || spotlightWorks.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % spotlightWorks.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return (
    <section
      aria-labelledby="studio-heading"
      className="relative min-h-dvh overflow-hidden"
    >
      <StudioHeroCanvas artworks={heroFloaters} />
      <div className="memory-grain pointer-events-none absolute inset-0 z-[1] opacity-30" />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(250,247,242,0.45) 0%, transparent 55%), linear-gradient(180deg, rgba(255,252,247,0.35) 0%, transparent 45%, rgba(237,231,220,0.3) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-[2] mx-auto flex min-h-dvh max-w-content flex-col justify-end px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-20 lg:pt-36">
        <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <InkReveal delay={0.08}>
              <p className="label-luxury mb-5 text-crimson-muted/75">
                {siteContent.artist.discipline}
              </p>
            </InkReveal>
            <InkReveal delay={0.16}>
              <ArtistName as="h1" id="studio-heading" className="text-balance" />
            </InkReveal>
            <InkReveal delay={0.24}>
              <div className="sketch-divider my-7 max-w-xs" role="presentation" />
              <p className="font-heading text-xl italic text-graphite-light sm:text-2xl">
                {siteContent.artist.tagline}
              </p>
            </InkReveal>
            <InkReveal delay={0.32}>
              <p className="body-prose mt-6 max-w-lg text-graphite-light">
                {siteContent.landing.prelude}
              </p>
            </InkReveal>
            <InkReveal delay={0.4}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/stories"
                  className="sketch-border sketch-border-crimson rounded-sketch bg-crimson-dark/35 px-6 py-3 font-body text-xs uppercase tracking-[0.3em] text-white transition-all hover:bg-crimson-muted/40"
                >
                  Begin the story
                </Link>
                <Link
                  href="/gallery"
                  className="label-luxury inline-flex items-center gap-2 text-crimson-muted transition-colors hover:text-crimson"
                >
                  Enter the gallery
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </InkReveal>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWork.id}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={springReveal}
              >
                <ArtworkViewer
                  artwork={activeWork}
                  priority
                  className="shadow-luxury"
                  frameClassName="mx-auto w-full max-w-md lg:ml-auto"
                />
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-between lg:ml-auto lg:max-w-md">
              <div>
                <p className="font-heading text-lg text-charcoal">{activeWork.title}</p>
                <p className="font-body text-xs uppercase tracking-widest text-graphite-light">
                  {activeWork.medium}
                </p>
              </div>
              <div className="flex gap-2" aria-label="Featured works">
                {spotlightWorks.map((work, index) => (
                  <button
                    key={work.id}
                    type="button"
                    aria-label={`View ${work.title}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === activeIndex
                        ? "w-6 bg-crimson-muted"
                        : "bg-graphite/50 hover:bg-graphite-light"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
