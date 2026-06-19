"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useBackgroundMusicOptional } from "@/components/audio/background-music-provider";
import { markExperienceEntered } from "@/components/layout/experience-gate";
import { ArtworkPageBackdrop } from "@/components/ui/artwork-page-backdrop";
import { BrandLoader } from "@/components/ui/brand-loader";
import { LoginScreen } from "@/components/ui/login-screen";
import { featuredArtwork } from "@/lib/artworks";

export default function EntryPage() {
  const router = useRouter();
  const music = useBackgroundMusicOptional();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("nzali-entered") === "1") {
      router.replace("/studio");
      return;
    }

    setChecking(false);
  }, [router]);

  if (checking) {
    return (
      <>
        <ArtworkPageBackdrop
          src={featuredArtwork.src}
          intensity="subtle"
          variant="fixed"
        />
        <BrandLoader message="Checking access" />
      </>
    );
  }

  return (
    <>
      <ArtworkPageBackdrop
        src={featuredArtwork.src}
        intensity="subtle"
        variant="fixed"
      />
      <LoginScreen
        onEnter={() => {
          markExperienceEntered();
          music?.start();
          router.push("/studio");
        }}
      />
    </>
  );
}
