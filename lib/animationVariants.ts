// Shared Framer Motion variants for smooth scroll-triggered animations.
// Using variants means Framer Motion interpolates BOTH enter AND exit,
// so elements never snap — they always transition smoothly in both directions.

import type { Variants } from "framer-motion"

/** Standard fade-up: most sections, headings, cards */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    filter: "blur(5px)",
    transition: { duration: 0.4, ease: [0.55, 0, 1, 0.45] },
  },
}

/** Slide in from left */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -36, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: -20,
    filter: "blur(5px)",
    transition: { duration: 0.4, ease: [0.55, 0, 1, 0.45] },
  },
}

/** Slide in from right */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 36, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: 20,
    filter: "blur(5px)",
    transition: { duration: 0.4, ease: [0.55, 0, 1, 0.45] },
  },
}

/** Scale + fade for badges, icons, emphasis elements */
export const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.84, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    filter: "blur(2px)",
    transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] },
  },
}

/** Container that staggers children automatically */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.05 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

/**
 * Shared viewport config.
 * amount: 0.15 — fires when 15% of the element is visible, not at 1px.
 * once: false  — replays every time.
 */
export const viewport = { once: false, amount: 0.15 } as const
