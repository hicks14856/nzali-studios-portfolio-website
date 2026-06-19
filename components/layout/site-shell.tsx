"use client";

import type { ReactNode } from "react";
import { AnimationLayer } from "@/components/animations/AnimationLayer";
import { SiteArtworkBackdrop } from "@/components/layout/site-artwork-backdrop";
import { ExperienceMusicBootstrap } from "@/components/audio/experience-music-bootstrap";
import { MusicCredits } from "@/components/audio/music-credits";
import { Navigation } from "@/components/ui/navigation";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <SiteArtworkBackdrop />
      <AnimationLayer enableSectionTransition={false}>
        <ExperienceMusicBootstrap />
        <Navigation />
        <main className="relative z-[1] bg-transparent [perspective:1400px]">{children}</main>
        <footer className="relative z-[1] border-t border-charcoal/15 bg-velvet/40 px-4 py-10 text-center backdrop-blur-sm sm:px-6">
          <p className="label-luxury text-graphite/50">
            © {new Date().getFullYear()} Nzali · All works reserved
          </p>
          <MusicCredits />
        </footer>
      </AnimationLayer>
    </>
  );
}
