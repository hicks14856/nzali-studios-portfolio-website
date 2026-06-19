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
      className="label-luxury rounded-full border border-charcoal/45 bg-velvet/75 px-3.5 py-1.5 text-[0.62rem] font-medium text-charcoal shadow-sm backdrop-blur-sm transition-colors hover:border-crimson-muted/50 hover:bg-velvet/90 hover:text-crimson-dark sm:text-xs"
    >
      {music.isPlaying ? "Mute" : "Music"}
    </button>
  );
}
