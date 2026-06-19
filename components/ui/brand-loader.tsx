"use client";

import { motion, useReducedMotion } from "framer-motion";
import { luxuryEase } from "@/lib/motion";

type BrandLoaderProps = {
  message?: string;
};

export function BrandLoader({ message = "Opening the studio" }: BrandLoaderProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        className="relative z-[1] flex min-h-dvh flex-col items-center justify-center bg-transparent"
        aria-busy="true"
        aria-label={message}
      >
        <span className="heading-signature text-[clamp(5rem,20vw,9rem)]">N</span>
        <span className="sr-only">{message}</span>
      </div>
    );
  }

  return (
    <div
      className="relative z-[1] flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-transparent"
      aria-busy="true"
      aria-label={message}
    >
      <div className="site-grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <motion.div
        className="relative z-[1] flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: luxuryEase }}
      >
        <div className="relative">
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 font-signature text-[clamp(5.5rem,22vw,11rem)] leading-none text-crimson-muted/20 blur-md"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: [0, 0.55, 0.35], scale: [0.85, 1.08, 1] }}
            transition={{ duration: 2.4, ease: luxuryEase, times: [0, 0.45, 1] }}
          >
            N
          </motion.span>

          <motion.span
            className="brand-loader-outline relative block font-signature text-[clamp(5.5rem,22vw,11rem)] leading-none text-charcoal"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.2, ease: luxuryEase }}
          >
            N
          </motion.span>

          <motion.span
            aria-hidden="true"
            className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-transparent via-crimson-muted/80 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.35, ease: luxuryEase }}
          />
        </div>

        <motion.p
          className="label-luxury mt-10 text-[0.62rem] text-graphite-light/70 sm:text-xs"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: luxuryEase }}
        >
          {message}
        </motion.p>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-[18%] h-px w-24 bg-gradient-to-r from-transparent via-crimson-muted/50 to-transparent"
        initial={{ opacity: 0, scaleX: 0.4 }}
        animate={{ opacity: [0.2, 0.7, 0.2], scaleX: [0.4, 1, 0.4] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
