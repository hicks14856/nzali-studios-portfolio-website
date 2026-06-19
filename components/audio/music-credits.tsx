import { BACKGROUND_TRACK } from "@/lib/audio-config";

export function MusicCredits() {
  return (
    <p className="mt-3 font-body text-xs text-graphite/45">
      Music:{" "}
      <a
        href={BACKGROUND_TRACK.creditUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-crimson-muted/70 underline-offset-4 transition-colors hover:text-crimson-muted hover:underline"
      >
        &ldquo;{BACKGROUND_TRACK.title}&rdquo; by {BACKGROUND_TRACK.artist}
      </a>
    </p>
  );
}
