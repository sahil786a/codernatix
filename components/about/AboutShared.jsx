"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedWords, FadeBlur } from "@/components/home/SolutionAnimation";

export const EASE = [0.22, 1, 0.36, 1];
export const WRAP =
  "relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12";

/** Scroll par blur + rise (jab bhi section view me aaye) */
export function Reveal({ children, className = "", delay = 0, y = 28, x = 0, as = "div" }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y, x, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/** Chhota label: line draw (entrance) + line pulse (infinite) */
export function SectionLabel({ children, dark = false, center = false }) {
  const reduce = useReducedMotion();
  const line = (origin) => (
    <motion.span
      aria-hidden="true"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.9, ease: EASE }}
      className={`inline-block h-px w-7 ${origin}`}
    >
      <motion.span
        animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className={`block h-full w-full ${dark ? "bg-blue-300" : "bg-brand-blue"}`}
      />
    </motion.span>
  );

  return (
    <span
      className={`inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] ${
        dark ? "text-blue-300" : "text-brand-blue"
      }`}
    >
      {line(center ? "origin-right" : "origin-left")}
      {children}
      {center && line("origin-left")}
    </span>
  );
}

/** Label + heading (words animate) + optional description */
export function SectionHead({
  label,
  title,
  highlight,
  description,
  dark = false,
  align = "center",
  id,
}) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <SectionLabel dark={dark} center={center}>
        {label}
      </SectionLabel>

      <h2
        id={id}
        className={`mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-brand-black"
        }`}
      >
        <AnimatedWords text={title} delay={0.2} />
        {highlight && (
          <>
            {" "}
            <AnimatedWords
              text={highlight}
              delay={0.5}
              shimmer
              className={
                dark
                  ? "bg-gradient-to-r from-blue-400 via-sky-200 to-blue-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-brand-blue via-brand-blue-light to-brand-blue bg-clip-text text-transparent"
              }
            />
          </>
        )}
      </h2>

      {description && (
        <FadeBlur
          as="p"
          delay={0.7}
          className={`mt-5 text-sm leading-7 sm:text-base sm:leading-8 ${
            center ? "mx-auto max-w-2xl" : ""
          } ${dark ? "text-white/65" : "text-brand-gray-500"}`}
        >
          {description}
        </FadeBlur>
      )}
    </div>
  );
}