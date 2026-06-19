"use client";

import { useBackgroundMusicOptional } from "@/components/audio/background-music-provider";

export function MusicToggleButton() {
  const music = useBackgroundMusicOptional();

  if (!music) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={music.toggle}
      aria-pressed={music.isPlaying}
      aria-label={music.isPlaying ? "Mute background music" : "Play background music"}
      className="label-luxury rounded-full border border-charcoal/20 px-3 py-1.5 text-[0.58rem] text-graphite-light transition-colors hover:border-crimson-muted/40 hover:text-charcoal sm:text-[0.62rem]"
    >
      {music.isPlaying ? "Mute" : "Music"}
    </button>
  );
}
