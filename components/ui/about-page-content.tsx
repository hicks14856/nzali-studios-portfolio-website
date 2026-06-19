"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionReveal, sectionChildVariants } from "@/components/animations/SectionReveal";
import { ArtistPortrait } from "@/components/ui/artist-portrait";
import { ArtworkViewer } from "@/components/ui/artwork-viewer";
import { SectionContainer } from "@/components/ui/section-container";
import { getArtworksByChapter } from "@/lib/artworks";
import { siteContent } from "@/lib/content";

export function AboutPageContent() {
  const heritage = getArtworksByChapter("heritage");
  const rootedHands = heritage.find((a) => a.id === "rooted-hands");

  return (
    <>
      <SectionContainer sketchVariant="crimson" className="!pb-8">
        <header className="max-w-3xl">
          <p className="label-luxury mb-4 text-crimson-muted/60">About the Artist</p>
          <h1 className="heading-display">The hand behind the line</h1>
          <div className="sketch-divider mt-8 max-w-[8rem]" role="presentation" />
        </header>
      </SectionContainer>

      <SectionContainer reveal={false} sketchVariant="crimson">
        <SectionReveal stagger as="div" className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div variants={sectionChildVariants} className="lg:col-span-5">
            <ArtistPortrait className="mx-auto max-w-md" priority />
          </motion.div>

          <motion.div variants={sectionChildVariants} className="lg:col-span-7">
            <p className="body-prose mb-6 text-lg text-charcoal/90">
              {siteContent.bio.intro}
            </p>
            {siteContent.bio.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="body-prose mb-5 last:mb-0">
                {paragraph}
              </p>
            ))}
            <Link
              href="/gallery"
              className="label-luxury mt-8 inline-flex text-crimson-muted transition-colors hover:text-crimson"
            >
              Explore the catalogue →
            </Link>
          </motion.div>
        </SectionReveal>

        {rootedHands ? (
          <SectionReveal as="div" className="mt-16 border-t border-charcoal/40 pt-16">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <blockquote>
                <p className="about-quote">
                  &ldquo;{rootedHands.memory}&rdquo;
                </p>
                <footer className="about-quote-footer mt-4">
                  — {rootedHands.title}
                </footer>
              </blockquote>
              <ArtworkViewer artwork={rootedHands} frameClassName="mx-auto max-w-lg" />
            </div>
          </SectionReveal>
        ) : null}
      </SectionContainer>
    </>
  );
}
