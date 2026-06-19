"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { siteContent } from "@/lib/content";

export function StudioInvitation() {
  return (
    <SectionReveal
      aria-labelledby="invitation-heading"
      className="px-4 py-section sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-content">
        <div className="sketch-border sketch-border-crimson sketch-padding relative overflow-hidden rounded-sketch bg-gradient-to-br from-velvet-surface/90 via-velvet/80 to-crimson-dark/20 text-center">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(122,0,16,0.25) 0%, transparent 70%)",
            }}
          />
          <p className="label-luxury relative mb-4 text-crimson-muted/70">
            The journey continues
          </p>
          <h2 id="invitation-heading" className="heading-section relative">
            Every piece has a before and an after
          </h2>
          <p className="body-prose relative mx-auto mt-6 max-w-prose text-graphite-light">
            Walk the chapters in order, or wander the gallery until something
            stops you. Either way — take your time.
          </p>
          <div className="relative mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/about"
              className="sketch-border rounded-sketch px-6 py-3 font-body text-xs uppercase tracking-[0.3em] text-charcoal transition-colors hover:bg-velvet-muted"
            >
              Meet {siteContent.artist.name}
            </Link>
            <Link
              href="/contact"
              className="sketch-border sketch-border-crimson rounded-sketch px-6 py-3 font-body text-xs uppercase tracking-[0.3em] text-white transition-colors hover:bg-crimson-dark/30"
            >
              Request access
            </Link>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
