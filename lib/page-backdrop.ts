import {
  featuredArtwork,
  getArtworkById,
  getArtworksByChapter,
  getHighlightArtworks,
  type Artwork,
} from "@/lib/artworks";
import { siteContent } from "@/lib/content";

export type BackdropIntensity = "subtle" | "default" | "detail";

export type PageBackdropConfig = {
  artwork: Artwork;
  intensity: BackdropIntensity;
};

const fallbackArtwork = (): Artwork =>
  getHighlightArtworks()[0] ?? featuredArtwork;

/**
 * Picks a representative artwork and backdrop strength for the current route.
 */
export function resolvePageBackdrop(pathname: string): PageBackdropConfig {
  const detailMatch = pathname.match(/^\/gallery\/([^/]+)$/);
  if (detailMatch) {
    const artwork = getArtworkById(detailMatch[1]);
    if (artwork) {
      return { artwork, intensity: "detail" };
    }
  }

  if (pathname.startsWith("/studio")) {
    return { artwork: featuredArtwork, intensity: "default" };
  }

  if (pathname.startsWith("/gallery")) {
    return { artwork: fallbackArtwork(), intensity: "default" };
  }

  if (pathname.startsWith("/stories")) {
    const sketchbook = getHighlightArtworks().find((a) => a.chapter === "sketchbook");
    return {
      artwork: sketchbook ?? getArtworksByChapter("sketchbook")[0] ?? fallbackArtwork(),
      intensity: "default",
    };
  }

  if (pathname.startsWith("/about")) {
    return {
      artwork: { ...featuredArtwork, src: siteContent.artist.portrait },
      intensity: "default",
    };
  }

  if (pathname.startsWith("/contact")) {
    const piece =
      getArtworkById("release") ?? getArtworksByChapter("pigment")[0];
    return { artwork: piece ?? fallbackArtwork(), intensity: "subtle" };
  }

  if (pathname === "/") {
    return { artwork: featuredArtwork, intensity: "subtle" };
  }

  return { artwork: fallbackArtwork(), intensity: "default" };
}

export const backdropIntensityTokens: Record<
  BackdropIntensity,
  { imageOpacity: number; blurPx: number; scale: number }
> = {
  subtle: { imageOpacity: 0.28, blurPx: 22, scale: 1.08 },
  default: { imageOpacity: 0.34, blurPx: 20, scale: 1.1 },
  detail: { imageOpacity: 0.42, blurPx: 16, scale: 1.12 },
};
