"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type Direction = "up" | "down" | "left" | "right" | "none";

type FadeInProps = HTMLMotionProps<"div"> & {
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
};

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Entrada leve ao rolar (fade + deslocamento). Respeita prefers-reduced-motion. */
export function FadeIn({
  direction = "up",
  distance = 20,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
  children,
  ...props
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const offset = offsets[direction];
  const initial = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, x: offset.x * distance, y: offset.y * distance };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: reduceMotion ? 0.2 : duration, delay, ease: EASE_OUT }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
