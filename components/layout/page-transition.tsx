"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { pageTransitionVariants } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useDeviceCapability";

type PageTransitionProps = {
  children: ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransitionVariants}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
