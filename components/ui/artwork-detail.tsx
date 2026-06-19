"use client";



import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";

import { InkReveal } from "@/components/animations/InkReveal";

import { ArtworkViewer } from "@/components/ui/artwork-viewer";

import {

  artworkChapters,

  getAdjacentArtworks,

  getArtworkById,

  type Artwork,

} from "@/lib/artworks";

import { springReveal } from "@/lib/motion";



type ArtworkDetailProps = {

  artwork: Artwork;

};



export function ArtworkDetail({ artwork }: ArtworkDetailProps) {

  const chapter = artworkChapters[artwork.chapter];

  const { prev, next } = getAdjacentArtworks(artwork.id);



  return (

    <article className="relative min-h-dvh overflow-hidden">

      <div className="memory-grain pointer-events-none absolute inset-0 z-[1] opacity-20" />



      <div className="relative z-[2] mx-auto max-w-content px-4 pb-section pt-32 sm:px-6 lg:px-8 lg:pt-36">

        <InkReveal>

          <Link

            href="/gallery"

            className="label-luxury mb-8 inline-flex items-center gap-2 text-graphite-light transition-colors hover:text-crimson-muted"

          >

            ← Back to gallery

          </Link>

        </InkReveal>



        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">

          <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={springReveal}

          >

            <ArtworkViewer

              artwork={artwork}

              priority

              frameClassName="w-full"

              className="shadow-luxury"

            />

          </motion.div>



          <div className="space-y-6 lg:sticky lg:top-28">

            <InkReveal delay={0.08}>

              <p className="label-luxury text-crimson-muted/60">

                {chapter.title} · {chapter.subtitle}

              </p>

            </InkReveal>

            <InkReveal delay={0.14}>

              <h1 className="heading-section">{artwork.title}</h1>

            </InkReveal>

            <InkReveal delay={0.2}>

              <p className="font-body text-xs uppercase tracking-widest text-graphite-light">

                {artwork.medium}

              </p>

            </InkReveal>

            <InkReveal delay={0.26}>

              <div className="sketch-divider max-w-[5rem]" role="presentation" />

            </InkReveal>

            <InkReveal delay={0.32}>

              <blockquote className="font-heading text-2xl italic text-graphite-light">

                &ldquo;{artwork.memory}&rdquo;

              </blockquote>

            </InkReveal>

            <InkReveal delay={0.38}>

              <p className="body-prose text-graphite-light">{artwork.story}</p>

            </InkReveal>

            <InkReveal delay={0.44}>

              <p className="body-prose text-sm italic text-graphite/70">

                {chapter.epigraph}

              </p>

            </InkReveal>

          </div>

        </div>



        <nav

          aria-label="Adjacent works"

          className="mt-16 flex flex-col gap-4 border-t border-charcoal/20 pt-10 sm:flex-row sm:justify-between"

        >

          {prev ? (

            <Link

              href={`/gallery/${prev.id}`}

              className="group sketch-border rounded-sketch px-5 py-4 transition-colors hover:bg-velvet-surface/60"

            >

              <p className="label-luxury text-graphite/60">Previous</p>

              <p className="font-heading text-lg text-charcoal group-hover:text-crimson-muted">

                {prev.title}

              </p>

            </Link>

          ) : (

            <span />

          )}

          {next ? (

            <Link

              href={`/gallery/${next.id}`}

              className="group sketch-border rounded-sketch px-5 py-4 text-right transition-colors hover:bg-velvet-surface/60 sm:ml-auto"

            >

              <p className="label-luxury text-graphite/60">Next</p>

              <p className="font-heading text-lg text-charcoal group-hover:text-crimson-muted">

                {next.title}

              </p>

            </Link>

          ) : null}

        </nav>

      </div>

    </article>

  );

}



export function ArtworkDetailPage({ id }: { id: string }) {

  const artwork = getArtworkById(id);

  if (!artwork) {

    notFound();

  }

  return <ArtworkDetail artwork={artwork} />;

}


