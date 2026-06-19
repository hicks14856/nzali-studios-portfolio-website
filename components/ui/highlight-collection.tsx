"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionReveal, sectionChildVariants } from "@/components/animations/SectionReveal";
import { ArtworkViewer } from "@/components/ui/artwork-viewer";
import { getHighlightArtworks } from "@/lib/artworks";

const highlights = getHighlightArtworks();
const [anchor, ...supporting] = highlights;

/** Bento spans for the eight-piece highlight wall */
const bentoSpans = [
  "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1 sm:col-span-1",
] as const;

export function HighlightCollection() {
  if (!anchor) return null;

  const pieces = [anchor, ...supporting];

  return (
    <SectionReveal
      stagger
      aria-labelledby="highlights-heading"
      className="relative px-4 py-section sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-content">
        <motion.div
          variants={sectionChildVariants}
          className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between lg:mb-16"
        >
          <div className="max-w-2xl">
            <p className="label-luxury mb-3 text-crimson-muted/70">The collection</p>
            <h2 id="highlights-heading" className="heading-section text-balance">
              Eight works. One voice.
            </h2>
            <p className="body-prose mt-5 max-w-prose text-graphite-light">
              Graphite confessions and painted heat — the pieces that define this studio,
              shown at full scale.
            </p>
          </div>
          <Link
            href="/gallery?filter=highlights"
            className="label-luxury shrink-0 text-crimson-muted transition-colors hover:text-crimson"
          >
            View in gallery →
          </Link>
        </motion.div>

        <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-2 gap-4 sm:auto-rows-[minmax(220px,auto)] sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {pieces.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              variants={sectionChildVariants}
              className={bentoSpans[index] ?? "col-span-1 row-span-1"}
            >
              <Link href={`/gallery/${artwork.id}`} className="group block h-full">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className="h-full"
                >
                  <ArtworkViewer
                    artwork={artwork}
                    priority={index < 4}
                    showCaption={index === 0}
                    frameClassName="h-full shadow-artwork"
                    className={index === 0 ? "min-h-[320px] lg:min-h-[520px]" : "min-h-[200px]"}
                  />
                  {index > 0 ? (
                    <div className="mt-3 px-1 sm:mt-4">
                      <h3 className="font-heading text-base text-charcoal transition-colors group-hover:text-crimson-muted sm:text-lg">
                        {artwork.title}
                      </h3>
                      <p className="mt-1 font-body text-[0.6rem] uppercase tracking-widest text-graphite-light sm:text-xs">
                        {artwork.medium}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 px-1">
                      <h3 className="font-heading text-xl text-charcoal transition-colors group-hover:text-crimson-muted sm:text-2xl">
                        {artwork.title}
                      </h3>
                      <p className="mt-1 font-body text-xs uppercase tracking-widest text-graphite-light">
                        {artwork.medium}
                      </p>
                      <p className="memory-caption mt-3 max-w-md">{artwork.memory}</p>
                    </div>
                  )}
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
