"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionReveal, sectionChildVariants } from "@/components/animations/SectionReveal";
import { SecureImage } from "@/components/security/SecureImage";
import {
  artworkChapters,
  getChapterCoverArtwork,
  type ArtworkChapter,
} from "@/lib/artworks";
import { siteContent } from "@/lib/content";

const chapters: ArtworkChapter[] = ["sketchbook", "pigment", "heritage"];

const chapterRoutes: Record<ArtworkChapter, string> = {
  sketchbook: "/stories#sketchbook",
  pigment: "/stories#pigment",
  heritage: "/stories#heritage",
};

export function StoryChapterCards() {
  return (
    <SectionReveal
      stagger
      aria-labelledby="chapters-heading"
      className="relative px-4 py-section sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-content">
        <motion.div variants={sectionChildVariants} className="mb-12 text-center lg:mb-16">
          <p className="label-luxury mb-4 text-crimson-muted/60">Three Chapters</p>
          <h2 id="chapters-heading" className="heading-section">
            Choose where the story begins
          </h2>
          <p className="body-prose mx-auto mt-6 max-w-prose text-graphite-light">
            {siteContent.landing.invitation}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {chapters.map((chapter, index) => {
            const meta = artworkChapters[chapter];
            const cover = getChapterCoverArtwork(chapter);

            return (
              <motion.div key={chapter} variants={sectionChildVariants}>
                <Link href={chapterRoutes[chapter]} className="group block h-full">
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="sketch-border sketch-border-crimson relative h-full overflow-hidden rounded-sketch bg-velvet-surface/80"
                  >
                    {cover ? (
                      <div className="artwork-stage relative aspect-[4/5] overflow-hidden">
                        <SecureImage
                          src={cover.src}
                          alt={cover.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="artwork-lift object-contain p-5 transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : null}
                    <div className="sketch-padding !pt-6">
                      <p className="label-luxury mb-2 text-crimson-muted/60">
                        Chapter {index + 1}
                      </p>
                      <h3 className="font-heading text-2xl text-charcoal">{meta.title}</h3>
                      <p className="body-prose mt-3 text-sm italic text-graphite-light">
                        {meta.epigraph}
                      </p>
                      <p className="label-luxury mt-6 text-crimson-muted/80 transition-colors group-hover:text-crimson">
                        Read chapter →
                      </p>
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
