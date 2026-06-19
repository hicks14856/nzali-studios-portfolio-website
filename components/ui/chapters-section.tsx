"use client";

import { ContrastSwipe } from "@/components/animations/ContrastSwipe";
import { StoryReveal } from "@/components/animations/StoryReveal";
import { SecureImage } from "@/components/security/SecureImage";
import {
  artworkChapters,
  getSpotlightArtworks,
  type Artwork,
} from "@/lib/artworks";
import { SectionContainer } from "./section-container";
import { ArtworkFrame } from "./artwork-frame";

function SpotlightPanel({
  artwork,
  reversed = false,
}: {
  artwork: Artwork;
  reversed?: boolean;
}) {
  const chapter = artworkChapters[artwork.chapter];

  return (
    <article
      className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <ContrastSwipe from={reversed ? "right" : "left"}>
        <ArtworkFrame
          variant={artwork.frame}
          tilt={artwork.tilt}
          className="mx-auto w-full max-w-md"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <SecureImage
              src={artwork.src}
              alt={artwork.title}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </ArtworkFrame>
      </ContrastSwipe>

      <StoryReveal className="space-y-5">
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
      </StoryReveal>
    </article>
  );
}

export function ChaptersSection() {
  const headingId = "chapters-heading";
  const spotlights = getSpotlightArtworks();

  return (
    <SectionContainer id="stories" labelledBy={headingId} sketchVariant="crimson">
      <header className="mb-12 text-center lg:mb-16">
        <p className="label-luxury mb-4 text-crimson-muted/60">Memory Chapters</p>
        <h2 id={headingId} className="heading-section">
          Stories kept in the line
        </h2>
        <p className="body-prose mx-auto mt-6 max-w-prose text-graphite-light">
          Scroll slowly. Each piece is a page from a life — some drawn at midnight,
          some painted in daylight, all kept because letting go felt like forgetting.
        </p>
      </header>

      <div className="space-y-16 lg:space-y-24">
        {spotlights.map((artwork, index) => (
          <SpotlightPanel
            key={artwork.id}
            artwork={artwork}
            reversed={index % 2 === 1}
          />
        ))}
      </div>
    </SectionContainer>
  );
}
