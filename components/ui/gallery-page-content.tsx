"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { sectionChildVariants } from "@/lib/motion";
import { StoryStagger } from "@/components/animations/StoryReveal";
import { ArtworkCard } from "@/components/ui/artwork-card";
import { SectionContainer } from "@/components/ui/section-container";
import {
  artworkChapters,
  artworks,
  getArtworksByChapter,
  getHighlightArtworks,
  type ArtworkChapter,
} from "@/lib/artworks";
import { siteContent } from "@/lib/content";

const chapters: ArtworkChapter[] = ["sketchbook", "pigment", "heritage"];
type GalleryFilter = ArtworkChapter | "all" | "highlights";

const highlights = getHighlightArtworks();

function resolveInitialFilter(param: string | null): GalleryFilter {
  if (param === "all") return "all";
  if (param === "highlights") return "highlights";
  if (param && chapters.includes(param as ArtworkChapter)) {
    return param as ArtworkChapter;
  }
  return "highlights";
}

export function GalleryPageContent() {
  const searchParams = useSearchParams();
  const initialFilter = useMemo(
    () => resolveInitialFilter(searchParams.get("filter")),
    [searchParams],
  );
  const [activeChapter, setActiveChapter] = useState<GalleryFilter>(initialFilter);
  const filtered =
    activeChapter === "highlights"
      ? highlights
      : activeChapter === "all"
        ? artworks
        : getArtworksByChapter(activeChapter);

  return (
    <>
      <SectionContainer sketchVariant="crimson" className="!pb-8">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="label-luxury mb-3 text-crimson-muted/60">Gallery</p>
            <h1 className="heading-display">{siteContent.catalogue.title}</h1>
            <p className="body-prose mt-4 max-w-prose text-graphite-light">
              {siteContent.catalogue.subtitle}
            </p>
          </div>
          <p className="label-luxury text-graphite/50">
            {highlights.length} highlights · {artworks.length} works total
          </p>
        </header>

        <div
          className="mt-10 flex flex-wrap gap-3"
          role="tablist"
          aria-label="Filter by chapter"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeChapter === "highlights"}
            onClick={() => setActiveChapter("highlights")}
            className={`sketch-border rounded-sketch px-4 py-2 font-body text-[0.65rem] uppercase tracking-[0.25em] transition-colors ${
              activeChapter === "highlights"
                ? "sketch-border-crimson bg-crimson-dark/30 text-white"
                : "text-graphite-light hover:text-charcoal"
            }`}
          >
            Highlights
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeChapter === "all"}
            onClick={() => setActiveChapter("all")}
            className={`sketch-border rounded-sketch px-4 py-2 font-body text-[0.65rem] uppercase tracking-[0.25em] transition-colors ${
              activeChapter === "all"
                ? "sketch-border-crimson bg-crimson-dark/30 text-white"
                : "text-graphite-light hover:text-charcoal"
            }`}
          >
            All works
          </button>
          {chapters.map((chapter) => (
            <button
              key={chapter}
              type="button"
              role="tab"
              aria-selected={activeChapter === chapter}
              onClick={() => setActiveChapter(chapter)}
              className={`sketch-border rounded-sketch px-4 py-2 font-body text-[0.65rem] uppercase tracking-[0.25em] transition-colors ${
                activeChapter === chapter
                  ? "sketch-border-crimson bg-crimson-dark/30 text-white"
                  : "text-graphite-light hover:text-charcoal"
              }`}
            >
              {artworkChapters[chapter].title}
            </button>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer reveal={false}>
        {activeChapter !== "all" && activeChapter !== "highlights" ? (
          <p className="body-prose mb-10 max-w-prose italic text-graphite-light">
            {artworkChapters[activeChapter].epigraph}
          </p>
        ) : null}

        <StoryStagger
          as="ul"
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
        >
          {filtered.map((artwork, index) => (
            <motion.li key={artwork.id} variants={sectionChildVariants}>
              <Link href={`/gallery/${artwork.id}`} className="block h-full">
                <ArtworkCard artwork={artwork} index={index} priority={index < 6} reveal="none" />
              </Link>
            </motion.li>
          ))}
        </StoryStagger>
      </SectionContainer>
    </>
  );
}
