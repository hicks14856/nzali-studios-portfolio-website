"use client";

import Link from "next/link";
import { StoryReveal } from "@/components/animations/StoryReveal";
import { ArtworkViewer } from "@/components/ui/artwork-viewer";
import { SectionContainer } from "@/components/ui/section-container";
import { artworks } from "@/lib/artworks";

const closingPiece = artworks.find((a) => a.id === "soft-edge");

export function ContactPageContent() {
  return (
    <SectionContainer sketchVariant="crimson">
      <div className="relative mx-auto max-w-4xl">
        {closingPiece ? (
          <StoryReveal className="mb-12 flex justify-center lg:absolute lg:-right-4 lg:-top-8 lg:mb-0 lg:w-48 lg:opacity-30">
            <ArtworkViewer
              artwork={closingPiece}
              showCaption={false}
              frameClassName="w-40 lg:w-full"
            />
          </StoryReveal>
        ) : null}

        <StoryReveal className="text-center">
          <p className="label-luxury mb-4 text-crimson-muted/60">Contact</p>
          <h1 className="heading-display mb-6">Commissions &amp; Inquiries</h1>
          <p className="body-prose mx-auto mb-4 max-w-prose text-graphite-light">
            For private viewings, commission requests, or press — reach out with
            intention. Responses are considered, not rushed.
          </p>
          <p className="font-heading mx-auto mb-10 max-w-md text-lg italic text-graphite-light/80">
            Every commission begins with a conversation — the way every piece here
            began with a single line.
          </p>
          <a
            href="mailto:studio@nzali.art"
            className="sketch-border sketch-border-crimson inline-block rounded-sketch px-8 py-3 font-body text-xs uppercase tracking-[0.3em] text-white transition-colors hover:bg-crimson-dark/30"
          >
            studio@nzali.art
          </a>
          <p className="mt-10">
            <Link
              href="/studio"
              className="label-luxury text-crimson-muted transition-colors hover:text-crimson"
            >
              ← Return to studio
            </Link>
          </p>
        </StoryReveal>
      </div>
    </SectionContainer>
  );
}
