"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const ONCE = { once: true, amount: 0.6 };

/* 1. SECTION TRANSITION: poora section uthta hai, top edge line draw hoti hai */
export function SectionReveal({ children, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 90, scale: 0.97, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 1.1, ease: EASE }}
      className={`relative ${className}`}
    >
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
        className="absolute inset-x-0 top-0 h-px origin-center bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent"
      />
      {children}
    </motion.div>
  );
}

/* 2. HEADER GLOW: infinite slow float (sirf header ke peeche, cards ke peeche nahi) */
export function FloatingGlow() {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[380px] overflow-hidden"
    >
      <motion.div
        animate={reduce ? undefined : { x: [0, 40, -20, 0], y: [0, 24, -10, 0], scale: [1, 1.12, 0.96, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-blue/10 blur-3xl"
      />
      <motion.div
        animate={reduce ? undefined : { x: [0, -36, 20, 0], y: [0, -18, 14, 0], scale: [1, 0.94, 1.1, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-24 -top-16 h-72 w-72 rounded-full bg-brand-blue/5 blur-3xl"
      />
    </div>
  );
}

/* 3. BADGE: pop-in (one-time) + pulse dot (infinite) */
export function PulseBadge({ children }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      initial={reduce ? false : { opacity: 0, scale: 0.8, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={ONCE}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue shadow-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
      </span>
      {children}
    </motion.span>
  );
}

/* 4. HEADING WORDS: ek-ek word rise + blur (one-time) */
export function AnimatedWords({ text, delay = 0.2 }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{text}</>;
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: "0.5em", filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={ONCE}
            transition={{ duration: 0.7, delay: delay + i * 0.09, ease: EASE }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </>
  );
}

/* 5. SHIMMER TEXT: entrance (one-time) + gradient shimmer (infinite) */
export function ShimmerText({ children, className = "", delay = 0.6 }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{children}</span>;
  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ backgroundSize: "200% 100%" }}
      initial={{ opacity: 0, y: "0.4em", filter: "blur(8px)", backgroundPosition: "0% 50%" }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      viewport={ONCE}
      transition={{
        opacity: { duration: 0.8, delay, ease: EASE },
        y: { duration: 0.8, delay, ease: EASE },
        filter: { duration: 0.8, delay, ease: EASE },
        backgroundPosition: { duration: 7, delay: delay + 0.8, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {children}
    </motion.span>
  );
}

/* 6. SVG UNDERLINE: draw (one-time) + travelling highlight (infinite) */
export function AnimatedUnderline({ className = "", delay = 1.1 }) {
  const reduce = useReducedMotion();
  const d = "M2 9 C 70 2, 160 2, 298 8";
  return (
    <svg aria-hidden="true" viewBox="0 0 300 12" preserveAspectRatio="none" className={className}>
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={ONCE}
        transition={{ duration: 1.1, delay, ease: EASE }}
      />
      {!reduce && (
        <motion.path
          d={d}
          fill="none"
          stroke="var(--blue)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0.22, pathOffset: 0, opacity: 0 }}
          whileInView={{ pathOffset: [0, 0.78], opacity: [0, 1, 1, 0] }}
          viewport={ONCE}
          transition={{
            duration: 1.6,
            delay: delay + 1.3,
            times: [0, 0.15, 0.85, 1],
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 3.5,
          }}
        />
      )}
    </svg>
  );
}

/* 7. TEXT BLUR-IN (one-time) */
export function FadeBlur({ children, className = "", delay = 0, as = "div" }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={ONCE}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/* 8. NUDGE ARROW: infinite halka right nudge (Show more link) */
export function NudgeArrow({ children }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      animate={reduce ? undefined : { x: [0, 6, 0] }}
      transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
      className="inline-flex"
    >
      {children}
    </motion.span>
  );
}