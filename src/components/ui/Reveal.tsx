"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 34, y: 0 },
  right: { x: -34, y: 0 },
  none: { x: 0, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  as?: "div" | "section" | "li" | "span" | "article" | "header";
};

/** Мягкое появление блока при попадании во вьюпорт. Один раз, без «прыжков» при обратном скролле. */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "up",
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const offset = reduced ? OFFSET.none : OFFSET[direction];
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 0.61, 0.24, 1] }}
    >
      {children}
    </Component>
  );
}

/** Родитель для каскадного появления дочерних <RevealItem>. */
export function RevealGroup({
  children,
  className,
  delay = 0,
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-70px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const revealItemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 0.61, 0.24, 1] } },
};

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Component = motion[as];
  return (
    <Component className={className} variants={revealItemVariants}>
      {children}
    </Component>
  );
}
