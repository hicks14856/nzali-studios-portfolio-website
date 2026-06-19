import type { ReactNode } from "react";
import type { ArtworkFrame } from "@/lib/artworks";
import { SketchBorder } from "./sketch-border";

type ArtworkFrameProps = {
  children: ReactNode;
  variant: ArtworkFrame;
  tilt?: number;
  className?: string;
  caption?: string;
};

const frameStyles: Record<ArtworkFrame, string> = {
  paper: "frame-paper",
  polaroid: "frame-polaroid",
  canvas: "frame-canvas",
  notebook: "frame-notebook",
};

export function ArtworkFrame({
  children,
  variant,
  tilt = 0,
  className = "",
  caption,
}: ArtworkFrameProps) {
  return (
    <figure
      className={`group ${className}`}
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined }}
    >
      <SketchBorder
        className={`overflow-hidden shadow-artwork transition-transform duration-700 ease-out group-hover:rotate-0 ${frameStyles[variant]}`}
      >
        {children}
      </SketchBorder>
      {caption ? (
        <figcaption className="memory-caption mt-3 text-center">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
