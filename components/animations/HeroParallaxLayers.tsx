"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";

type HeroParallaxLayersProps = {
  scrollProgress: MotionValue<number>;
  className?: string;
};

/**
 * Multi-depth parallax atmosphere for the hero — graphite mist, crimson bloom,
 * and a foreground veil that rises on scroll (Supari-style layered reveal,
 * adapted to Nzali's milk-white palette).
 */
export function HeroParallaxLayers({
  scrollProgress,
  className = "",
}: HeroParallaxLayersProps) {
  const deepShift = useTransform(scrollProgress, [0, 1], ["0%", "-12%"]);
  const crimsonShift = useTransform(scrollProgress, [0, 1], ["0%", "-28%"]);
  const crimsonScale = useTransform(scrollProgress, [0, 1], [1, 1.18]);
  const mistSlow = useTransform(scrollProgress, [0, 1], ["0%", "-38%"]);
  const mistFast = useTransform(scrollProgress, [0, 1], ["0%", "-55%"]);
  const strokeRotate = useTransform(scrollProgress, [0, 1], [0, 8]);
  const veilScale = useTransform(scrollProgress, [0, 0.55, 1], [0.08, 0.65, 1]);
  const veilOpacity = useTransform(scrollProgress, [0, 0.35, 0.85], [0.35, 0.75, 1]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          y: deepShift,
          background: `
            radial-gradient(ellipse 90% 70% at 50% 110%, rgba(122, 0, 16, 0.08) 0%, transparent 58%),
            radial-gradient(ellipse 120% 80% at 50% -10%, rgba(255, 252, 247, 0.95) 0%, transparent 55%),
            linear-gradient(180deg, #f5f0e8 0%, #faf7f2 45%, #fffcf7 100%)
          `,
        }}
      />

      <motion.div
        className="absolute -inset-x-[10%] top-[8%] h-[70%] opacity-60 blur-3xl"
        style={{
          y: crimsonShift,
          scale: crimsonScale,
          background:
            "radial-gradient(ellipse 55% 45% at 50% 40%, rgba(122, 0, 16, 0.12) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="absolute inset-x-0 top-[18%] h-[45%] opacity-50 blur-2xl"
        style={{
          y: mistSlow,
          background:
            "radial-gradient(ellipse 80% 55% at 30% 50%, rgba(107, 107, 107, 0.1) 0%, transparent 68%)",
        }}
      />

      <motion.div
        className="absolute inset-x-0 top-[32%] h-[38%] opacity-40 blur-xl"
        style={{
          y: mistFast,
          background:
            "radial-gradient(ellipse 70% 50% at 72% 45%, rgba(107, 107, 107, 0.08) 0%, transparent 65%)",
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-[0.14]"
        style={{ rotate: strokeRotate }}
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-40 620 C 180 580, 320 660, 520 610 S 880 560, 1120 630 S 1380 680, 1520 640"
            stroke="rgba(107,107,107,0.35)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M80 420 C 260 380, 420 440, 640 400 S 980 360, 1200 430"
            stroke="rgba(122,0,16,0.22)"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <path
            d="M200 760 C 400 720, 560 790, 760 740 S 1040 700, 1320 770"
            stroke="rgba(82,82,82,0.28)"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeDasharray="4 14"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-[55%] origin-bottom"
        style={{
          scaleY: veilScale,
          opacity: veilOpacity,
          background: `
            linear-gradient(180deg, transparent 0%, rgba(250, 247, 242, 0.65) 28%, rgba(250, 247, 242, 0.95) 72%, #faf7f2 100%),
            radial-gradient(ellipse 120% 80% at 50% 100%, rgba(122, 0, 16, 0.06) 0%, transparent 60%)
          `,
        }}
      />
    </div>
  );
}
