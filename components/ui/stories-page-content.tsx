"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionReveal, sectionChildVariants } from "@/components/animations/SectionReveal";
import { ArtworkViewer } from "@/components/ui/artwork-viewer";
import { SectionContainer } from "@/components/ui/section-container";
import {
  artworkChapters,
  getArtworksByChapter,
  getSpotlightArtworks,
  type Artwork,
  type ArtworkChapter,
} from "@/lib/artworks";
import { siteContent } from "@/lib/content";

function SpotlightPanel({
  artwork,
  reversed = false,
}: {
  artwork: Artwork;
  reversed?: boolean;
}) {
  const chapter = artworkChapters[artwork.chapter];

  return (
    <SectionReveal
      stagger
      as="article"
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <motion.div variants={sectionChildVariants}>
        <Link href={`/gallery/${artwork.id}`} className="group block">
          <ArtworkViewer
            artwork={artwork}
            frameClassName="mx-auto w-full max-w-lg transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </Link>
      </motion.div>

      <motion.div variants={sectionChildVariants} className="space-y-5">
        <p className="label-luxury text-crimson-muted/60">
          {chapter.title} · {chapter.subtitle}
        </p>
        <h3 className="font-heading text-3xl text-charcoal sm:text-4xl">
          {artwork.title}
        </h3>
        <p className="font-heading text-lg italic text-graphite-light">
          &ldquo;{artwork.memory}&rdquo;
        </p>
        <div className="sketch-divider max-w-[6rem]" role="presentation" />
        <p className="body-prose text-graphite-light">{artwork.story}</p>
        <p className="font-body text-xs uppercase tracking-widest text-graphite/60">
          {artwork.medium}
        </p>
        <Link
          href={`/gallery/${artwork.id}`}
          className="label-luxury inline-flex text-crimson-muted transition-colors hover:text-crimson"
        >
          View in gallery →
        </Link>
      </motion.div>
    </SectionReveal>
  );
}

function ChapterIntro({ chapter }: { chapter: ArtworkChapter }) {
  const meta = artworkChapters[chapter];
  const pieces = getArtworksByChapter(chapter);

  return (
    <SectionReveal as="div" className="mb-12 scroll-mt-28 border-b border-charcoal/40 pb-8">
      <div id={chapter}>
        <p className="label-luxury mb-3 text-crimson-muted/60">{meta.subtitle}</p>
        <h3 className="font-heading text-3xl text-charcoal sm:text-4xl">{meta.title}</h3>
        <p className="body-prose mt-4 max-w-prose italic text-graphite-light">
          {meta.epigraph}
        </p>
        <p className="label-luxury mt-4 text-graphite/50">
          {pieces.length} works in this chapter
        </p>
      </div>
    </SectionReveal>
  );
}

export function StoriesPageContent() {
  const headingId = "stories-heading";
  const spotlights = getSpotlightArtworks();
  const chapters: ArtworkChapter[] = ["sketchbook", "pigment", "heritage"];

  return (
    <>
      <SectionContainer sketchVariant="crimson" className="!pb-8">
        <header className="max-w-3xl">
          <p className="label-luxury mb-4 text-crimson-muted/60">Memory Chapters</p>
          <h1 id={headingId} className="heading-display text-balance">
            {siteContent.stories.subtitle}
          </h1>
          <p className="body-prose mt-6 text-lg text-graphite-light">
            {siteContent.stories.intro}
          </p>
        </header>
      </SectionContainer>

      {chapters.map((chapter) => {
        const chapterSpotlights = spotlights.filter((a) => a.chapter === chapter);

        return (
          <SectionContainer key={chapter} reveal={false} sketchVariant="crimson">
            <ChapterIntro chapter={chapter} />
            <div className="space-y-20 lg:space-y-28">
              {chapterSpotlights.map((artwork, index) => (
                <SpotlightPanel
                  key={artwork.id}
                  artwork={artwork}
                  reversed={index % 2 === 1}
                />
              ))}
            </div>
          </SectionContainer>
        );
      })}
    </>
  );
}
