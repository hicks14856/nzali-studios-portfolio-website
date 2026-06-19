import type { ReactNode } from "react";
import type { Artwork, ArtworkFrame as FrameVariant } from "@/lib/artworks";
import { SecureImage } from "@/components/security/SecureImage";
import { ArtworkFrame } from "./artwork-frame";

type ArtworkViewerProps = {
  artwork: Artwork;
  priority?: boolean;
  className?: string;
  frameClassName?: string;
  showCaption?: boolean;
  /** contain preserves the full artwork; cover fills the frame */
  fit?: "contain" | "cover";
  children?: ReactNode;
};

export function ArtworkViewer({
  artwork,
  priority = false,
  className = "",
  frameClassName = "",
  showCaption = true,
  fit = "contain",
  children,
}: ArtworkViewerProps) {
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <ArtworkFrame
      variant={artwork.frame as FrameVariant}
      tilt={artwork.tilt}
      caption={showCaption ? artwork.memory : undefined}
      className={frameClassName}
    >
      <div
        className={`artwork-stage relative w-full overflow-hidden ${className}`}
      >
        <div className="relative aspect-[3/4] w-full sm:aspect-[4/5]">
          <SecureImage
            src={artwork.src}
            alt={artwork.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            priority={priority}
            className={`artwork-lift ${fitClass} p-3 sm:p-4`}
          />
        </div>
        {children}
      </div>
    </ArtworkFrame>
  );
}
