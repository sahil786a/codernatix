"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];
const VIEW = { once: true, amount: 0.8 };

/* ---------- 1. Check icon: circle draws, tick draws, ring pulses once ---------- */
export function AnimatedCheckIcon({ size = 18, className = "", delay = 0 }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <CheckCircle2 size={size} className={className} aria-hidden="true" />;
  }

  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex ${className}`}
      style={{ width: size, height: size }}
    >
      {/* one-time ripple */}
      <motion.span
        className="absolute inset-0 rounded-full bg-brand-blue/30"
        initial={{ scale: 1, opacity: 0 }}
        whileInView={{ scale: [1, 2.3], opacity: [0.5, 0] }}
        viewport={VIEW}
        transition={{ duration: 0.9, delay: delay + 0.6, ease: "easeOut" }}
      />

      <motion.svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative"
        initial={{ scale: 0.4, opacity: 0, rotate: -30 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
        viewport={VIEW}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay }}
        whileHover={{ scale: 1.15, rotate: 8 }}
      >
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={VIEW}
          transition={{ duration: 0.7, delay, ease: EASE }}
        />
        <motion.path
          d="m9 12 2 2 4-4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={VIEW}
          transition={{ duration: 0.45, delay: delay + 0.45, ease: EASE }}
        />
      </motion.svg>
    </span>
  );
}

/* ---------- 2. Heading words: rise + blur-in, one by one ---------- */
export function AnimatedWords({ text, delay = 0.1 }) {
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
            viewport={{ once: true, amount: 0.6 }}
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

/* ---------- 3. "Digital Products": entrance + slow gradient shimmer ---------- */
export function ShimmerText({ children, className = "", delay = 0.4 }) {
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
      viewport={{ once: true, amount: 0.6 }}
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

/* ---------- 4. SVG underline: draws itself, then a highlight travels along it ---------- */
export function AnimatedUnderline({ className = "", delay = 1.0 }) {
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
        viewport={{ once: true, amount: 0.6 }}
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
          viewport={{ once: true, amount: 0.6 }}
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