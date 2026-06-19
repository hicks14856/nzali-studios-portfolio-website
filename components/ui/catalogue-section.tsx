"use client";

import { StoryStagger } from "@/components/animations/StoryReveal";
import {
  artworkChapters,
  artworks,
  getArtworksByChapter,
  type ArtworkChapter,
} from "@/lib/artworks";
import { siteContent } from "@/lib/content";
import { ArtworkCard } from "./artwork-card";
import { SectionContainer } from "./section-container";

function ChapterBlock({ chapter }: { chapter: ArtworkChapter }) {
  const meta = artworkChapters[chapter];
  const pieces = getArtworksByChapter(chapter);

  return (
    <div className="space-y-8">
      <header className="border-b border-charcoal/40 pb-6">
        <p className="label-luxury mb-2 text-crimson-muted/60">{meta.subtitle}</p>
        <h3 className="font-heading text-2xl text-charcoal sm:text-3xl">{meta.title}</h3>
        <p className="body-prose mt-3 max-w-prose text-sm italic text-graphite-light">
          {meta.epigraph}
        </p>
      </header>

      <StoryStagger
        as="ul"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        {pieces.map((artwork, index) => (
          <li key={artwork.id}>
            <ArtworkCard artwork={artwork} index={index} priority={index < 3} />
          </li>
        ))}
      </StoryStagger>
    </div>
  );
}

export function CatalogueSection() {
  const headingId = "catalogue-heading";
  const chapters: ArtworkChapter[] = ["sketchbook", "pigment", "heritage"];

  return (
    <SectionContainer id="gallery" labelledBy={headingId}>
      <header className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label-luxury mb-3 text-crimson-muted/60">Gallery</p>
          <h2 id={headingId} className="heading-section">
            {siteContent.catalogue.title}
          </h2>
        </div>
        <p className="body-prose max-w-sm text-sm text-graphite-light">
          {siteContent.catalogue.subtitle}
        </p>
      </header>

      <p className="label-luxury mb-12 text-graphite/50">
        {artworks.length} works · three chapters
      </p>

      <div className="space-y-16 lg:space-y-24">
        {chapters.map((chapter) => (
          <ChapterBlock key={chapter} chapter={chapter} />
        ))}
      </div>
    </SectionContainer>
  );
}
