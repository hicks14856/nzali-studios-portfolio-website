"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionReveal, sectionChildVariants } from "@/components/animations/SectionReveal";
import { ArtworkViewer } from "@/components/ui/artwork-viewer";
import { getHighlightArtworks } from "@/lib/artworks";

const spotlight = getHighlightArtworks();

export function FeaturedStrip() {
  return (
    <SectionReveal
      stagger
      aria-labelledby="featured-heading"
      className="overflow-hidden px-4 py-section sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-content">
        <motion.div
          variants={sectionChildVariants}
          className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="label-luxury mb-3 text-crimson-muted/60">Collection</p>
            <h2 id="featured-heading" className="heading-section">
              Every piece, up close
            </h2>
          </div>
          <Link
            href="/gallery"
            className="label-luxury text-crimson-muted transition-colors hover:text-crimson"
          >
            View full catalogue →
          </Link>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {spotlight.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              variants={sectionChildVariants}
              className="w-[min(78vw,320px)] shrink-0"
            >
              <Link href={`/gallery/${artwork.id}`} className="group block">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.35 }}>
                  <ArtworkViewer
                    artwork={artwork}
                    priority={index < 2}
                    showCaption={false}
                    frameClassName="h-full"
                  />
                  <div className="mt-4 px-1">
                    <h3 className="font-heading text-lg text-charcoal transition-colors group-hover:text-crimson-muted">
                      {artwork.title}
                    </h3>
                    <p className="mt-1 font-body text-xs uppercase tracking-widest text-graphite-light">
                      {artwork.medium}
                    </p>
                    <p className="memory-caption mt-2 line-clamp-2">{artwork.memory}</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
