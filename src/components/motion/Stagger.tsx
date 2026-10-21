"use client";

import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "motion/react";
import { EASE_OUT } from "./FadeIn";

type StaggerProps = HTMLMotionProps<"div"> & {
  stagger?: number;
  delay?: number;
  /** `true` anima ao entrar na viewport; `false` anima no mount (hero). */
  inView?: boolean;
  once?: boolean;
  amount?: number;
};

/** Container que anima os filhos (<StaggerItem>) em cascata. */
export function Stagger({
  stagger = 0.08,
  delay = 0,
  inView = true,
  once = true,
  amount = 0.2,
  children,
  ...props
}: StaggerProps) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  return (
    <motion.div
      variants={container}
      initial="hidden"
      {...(inView ? { whileInView: "show", viewport: { once, amount } } : { animate: "show" })}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = HTMLMotionProps<"div"> & { distance?: number; duration?: number };

export function StaggerItem({ distance = 18, duration = 0.6, children, ...props }: StaggerItemProps) {
  const reduceMotion = useReducedMotion();
  const item: Variants = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, y: 0, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: distance },
        show: { opacity: 1, y: 0, transition: { duration, ease: EASE_OUT } },
      };
  return (
    <motion.div variants={item} {...props}>
      {children}
    </motion.div>
  );
}
