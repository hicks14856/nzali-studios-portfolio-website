"use client";

import { usePathname } from "next/navigation";
import { ArtworkPageBackdrop } from "@/components/ui/artwork-page-backdrop";
import { resolvePageBackdrop } from "@/lib/page-backdrop";

/**
 * Route-aware ambient artwork layer for the experience shell.
 */
export function SiteArtworkBackdrop() {
  const pathname = usePathname();
  const { artwork, intensity } = resolvePageBackdrop(pathname);

  return (
    <ArtworkPageBackdrop
      src={artwork.src}
      alt=""
      intensity={intensity}
      variant="fixed"
    />
  );
}
