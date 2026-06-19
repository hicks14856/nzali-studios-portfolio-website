"use client";

import { useEffect } from "react";
import { useBackgroundMusicOptional } from "@/components/audio/background-music-provider";
import { MUSIC_STORAGE_KEY } from "@/lib/audio-config";

export function ExperienceMusicBootstrap() {
  const music = useBackgroundMusicOptional();

  useEffect(() => {
    if (!music?.isReady || music.isPlaying) {
      return;
    }

    if (sessionStorage.getItem(MUSIC_STORAGE_KEY) === "0") {
      return;
    }

    music.start();
  }, [music?.isReady, music?.isPlaying, music?.start]);

  return null;
}
