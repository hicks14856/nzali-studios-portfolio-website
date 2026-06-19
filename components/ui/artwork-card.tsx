"use client";

import { SecureImage } from "@/components/security/SecureImage";
import { InkReveal } from "@/components/animations/InkReveal";
import type { Artwork } from "@/lib/artworks";
import { ArtworkFrame } from "./artwork-frame";

type ArtworkCardProps = {
  artwork: Artwork;
  index?: number;
  priority?: boolean;
  reveal?: "scroll" | "none";
};

export function ArtworkCard({
  artwork,
  index = 0,
  priority = false,
  reveal = "scroll",
}: ArtworkCardProps) {
  const content = (
    <article>
      <ArtworkFrame
        variant={artwork.frame}
        tilt={artwork.tilt}
        caption={artwork.memory}
        className="h-full"
      >
        <div className="flex h-full flex-col">
          <div className="artwork-stage relative aspect-[3/4] w-full overflow-hidden">
            <SecureImage
              src={artwork.src}
              alt={artwork.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="artwork-lift object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
          <div className="sketch-padding !px-5 !py-4">
            <h3 className="font-heading text-lg text-charcoal">{artwork.title}</h3>
            <p className="mt-1 font-body text-xs uppercase tracking-widest text-graphite-light">
              {artwork.medium}
            </p>
            <p className="body-prose mt-3 text-sm leading-relaxed text-graphite-light">
              {artwork.story}
            </p>
          </div>
        </div>
      </ArtworkFrame>
    </article>
  );

  if (reveal === "none") {
    return content;
  }

  return <InkReveal delay={index * 0.08}>{content}</InkReveal>;
}
