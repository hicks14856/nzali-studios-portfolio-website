import type { Transition, Variants } from "motion-dom";

/** Shared luxury easing — slow deceleration, editorial feel */
export const luxuryEase = [0.22, 1, 0.36, 1] as const;

export const smoothRevealTransition: Transition = {
  duration: 1.05,
  ease: [0.25, 0.1, 0.25, 1],
};

export const storyTransition: Transition = smoothRevealTransition;

export const inkTransition: Transition = smoothRevealTransition;

export const swipeTransition: Transition = smoothRevealTransition;

export const defaultViewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -6% 0px" as const,
};

/** Viewport tuned for full-width sections entering on scroll */
export const sectionViewport = {
  once: true,
  amount: 0.14,
  margin: "0px 0px -10% 0px" as const,
};

export const sectionRevealTransition: Transition = {
  duration: 1.15,
  ease: luxuryEase,
};

/** Whole section/block reveal when scrolling between components */
export const sectionRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: sectionRevealTransition,
  },
};

/** Staggered children inside a revealed section */
export const sectionChildVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothRevealTransition,
  },
};

export const sectionStaggerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...sectionRevealTransition,
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

/** Smooth fade + gentle rise — default reveal across the site */
export const smoothRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothRevealTransition,
  },
};

export const storyRevealVariants = smoothRevealVariants;

export const inkRevealVariants = smoothRevealVariants;

export const contrastSwipeVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -12,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothRevealTransition,
  },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

/** Page-level soft entrance — no blur */
export const pageTransitionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: luxuryEase,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.4,
      ease: [0.55, 0, 1, 0.45],
    },
  },
};

export const springReveal = {
  type: "spring" as const,
  stiffness: 62,
  damping: 24,
  mass: 0.9,
};
