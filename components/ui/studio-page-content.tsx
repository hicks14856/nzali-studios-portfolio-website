"use client";

import { ImmersiveSection } from "@/components/animations/ImmersiveSection";
import { FeaturedStrip } from "@/components/ui/featured-strip";
import { HighlightCollection } from "@/components/ui/highlight-collection";
import { LandingHero } from "@/components/ui/landing-hero";
import { StoryChapterCards } from "@/components/ui/story-chapter-cards";
import { StudioInvitation } from "@/components/ui/studio-invitation";

export function StudioPageContent() {
  return (
    <div className="[perspective:1400px]">
      <ImmersiveSection atmosphere="studio-dawn" id="studio-hero" isFirst>
        <LandingHero />
      </ImmersiveSection>
      <ImmersiveSection atmosphere="gallery-hall" id="studio-highlights">
        <HighlightCollection />
      </ImmersiveSection>
      <ImmersiveSection atmosphere="chapter-parchment" id="studio-chapters">
        <StoryChapterCards />
      </ImmersiveSection>
      <ImmersiveSection atmosphere="gallery-hall" id="studio-featured">
        <FeaturedStrip />
      </ImmersiveSection>
      <ImmersiveSection atmosphere="crimson-close" id="studio-invitation">
        <StudioInvitation />
      </ImmersiveSection>
    </div>
  );
}
