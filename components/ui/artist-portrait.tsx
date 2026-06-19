import Image from "next/image";
import { siteContent } from "@/lib/content";
import { SketchBorder } from "./sketch-border";

type ArtistPortraitProps = {
  className?: string;
  priority?: boolean;
};

export function ArtistPortrait({ className = "", priority = false }: ArtistPortraitProps) {
  return (
    <figure className={className}>
      <SketchBorder className="frame-polaroid overflow-hidden shadow-artwork">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-velvet-stage">
          <Image
            src={siteContent.artist.portrait}
            alt={`${siteContent.artist.name}, painter and pencil artist`}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 400px"
            className="object-cover object-[center_18%]"
          />
        </div>
      </SketchBorder>
      <figcaption className="memory-caption mt-3 text-center">{siteContent.artist.name}</figcaption>
    </figure>
  );
}
