"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  backdropIntensityTokens,
  type BackdropIntensity,
} from "@/lib/page-backdrop";
import { usePrefersReducedMotion } from "@/hooks/useDeviceCapability";

type ArtworkPageBackdropProps = {
  src: string;
  alt?: string;
  intensity?: BackdropIntensity;
  /** fixed = sitewide layer; absolute = scoped to a page article */
  variant?: "fixed" | "absolute";
};

export function ArtworkPageBackdrop({
  src,
  alt = "",
  intensity = "default",
  variant = "fixed",
}: ArtworkPageBackdropProps) {
  const reducedMotion = usePrefersReducedMotion();
  const tokens = backdropIntensityTokens[intensity];
  const positionClass = variant === "fixed" ? "fixed" : "absolute";

  return (
    <div
      className={`pointer-events-none ${positionClass} inset-0 z-0 overflow-hidden`}
      aria-hidden="true"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={{ opacity: reducedMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Artwork layer — visible but soft */}
          <div
            className="absolute inset-0"
            style={{
              transform: `scale(${tokens.scale})`,
              opacity: tokens.imageOpacity,
              filter: `blur(${tokens.blurPx}px) saturate(0.92) contrast(1.06)`,
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority={intensity === "detail"}
              sizes="100vw"
              className="object-cover object-center"
              draggable={false}
            />
          </div>

          {/* Milk-white base — keeps page readable while letting art show through */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                180deg,
                rgba(250, 247, 242, 0.52) 0%,
                rgba(250, 247, 242, 0.38) 42%,
                rgba(245, 240, 232, 0.45) 100%
              )`,
            }}
          />

          {/* Edge vignette — protects text at top/bottom without washing out the centre */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 95% 55% at 50% 38%, transparent 30%, rgba(250, 247, 242, 0.55) 100%),
                linear-gradient(180deg, rgba(255, 252, 247, 0.65) 0%, transparent 22%, transparent 78%, rgba(237, 231, 220, 0.5) 100%)
              `,
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
