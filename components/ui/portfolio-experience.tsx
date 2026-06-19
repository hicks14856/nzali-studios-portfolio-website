"use client";

import { useRef } from "react";
import { AnimationLayer } from "@/components/animations/AnimationLayer";
import { AboutSection } from "@/components/ui/about-section";
import { CatalogueSection } from "@/components/ui/catalogue-section";
import { ChaptersSection } from "@/components/ui/chapters-section";
import { ContactSection } from "@/components/ui/contact-section";
import { HeroSection } from "@/components/ui/hero-section";
import { LoginScreen } from "@/components/ui/login-screen";
import { Navigation } from "@/components/ui/navigation";

type PortfolioExperienceProps = {
  onEnter?: () => void;
  showLogin?: boolean;
};

export function PortfolioExperience({
  showLogin = false,
  onEnter,
}: PortfolioExperienceProps) {
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  if (showLogin && onEnter) {
    return <LoginScreen onEnter={onEnter} />;
  }

  return (
    <AnimationLayer heroRef={heroRef} aboutRef={aboutRef}>
      <Navigation />
      <main>
        <HeroSection ref={heroRef} />
        <ChaptersSection />
        <div ref={aboutRef}>
          <AboutSection />
        </div>
        <CatalogueSection />
        <ContactSection />
      </main>
      <footer className="border-t border-charcoal/15 px-4 py-8 text-center sm:px-6">
        <p className="label-luxury text-graphite/50">
          © {new Date().getFullYear()} Nzali · All works reserved
        </p>
      </footer>
    </AnimationLayer>
  );
}
