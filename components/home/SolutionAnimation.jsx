"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

// true  = scroll back/forward karne par animation har baar chalegi
// false = sirf ek baar chalegi
const REPEAT = true;
const VIEW = { once: !REPEAT, amount: 0.6 };

/* 1. SECTION TRANSITION */
export function SectionReveal({ children, className = "" }) {
  const reduce = useReducedMotion();
  const vp = { once: !REPEAT, amount: 0.08, margin: "0px 0px -8% 0px" };
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 90, scale: 0.97, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={vp}
      transition={{ duration: 1.1, ease: EASE }}
      className={`relative ${className}`}
    >
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={vp}
        transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
        className="absolute inset-x-0 top-0 h-px origin-center bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
      />
      {children}
    </motion.div>
  );
}

/* 2. HEADER GLOW: infinite slow float */
export function FloatingGlow() {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[420px] overflow-hidden"
    >
      <motion.div
        animate={reduce ? undefined : { x: [0, 40, -20, 0], y: [0, 24, -10, 0], scale: [1, 1.12, 0.96, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
      />
      <motion.div
        animate={reduce ? undefined : { x: [0, -36, 20, 0], y: [0, -18, 14, 0], scale: [1, 0.94, 1.1, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-24 -top-16 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl"
      />
    </div>
  );
}

/* 3. CAROUSEL GLOW: infinite breathing (cards ke peeche) */
export function CarouselGlow() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      animate={reduce ? undefined : { opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl"
    />
  );
}

/* 4. EYEBROW: lines draw (entrance) + pulse (infinite) */
export function Eyebrow({ children }) {
  const reduce = useReducedMotion();
  const Line = ({ origin }) => (
    <motion.span
      aria-hidden="true"
      initial={reduce ? false : { scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={VIEW}
      transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
      className={`inline-block h-px w-7 ${origin}`}
    >
      <motion.span
        animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="block h-full w-full bg-blue-400"
      />
    </motion.span>
  );

  return (
    <span className="inline-flex items-center gap-3 text-xs font-bold uppercase text-blue-400">
      <Line origin="origin-right" />
      <motion.span
        initial={reduce ? false : { opacity: 0, letterSpacing: "0.5em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
        viewport={VIEW}
        transition={{ duration: 1.1, ease: EASE }}
      >
        {children}
      </motion.span>
      <Line origin="origin-left" />
    </span>
  );
}

/* 5. HEADING WORDS: rise + blur (entrance), shimmer=true => blue shimmer wave (infinite) */
export function AnimatedWords({ text, delay = 0.2, className = "", shimmer = false }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;

  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: "0.5em", filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={VIEW}
            transition={{ duration: 0.7, delay: delay + i * 0.09, ease: EASE }}
          >
            {shimmer ? (
              <motion.span
                className={`inline-block ${className}`}
                style={{ backgroundSize: "220% 100%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 6, delay: delay + i * 0.25, repeat: Infinity, ease: "easeInOut" }}
              >
                {word}
              </motion.span>
            ) : (
              <span className={className}>{word}</span>
            )}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </>
  );
}

/* 6. TEXT BLUR-IN */
export function FadeBlur({ children, className = "", delay = 0, as = "div" }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={VIEW}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/* 7. CAROUSEL ENTRANCE */
export function CarouselReveal({ children, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 70, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: !REPEAT, amount: 0.2 }}
      transition={{ duration: 1.2, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* 8. CTA BUTTON: entrance + shine sweep (infinite) + arrow nudge (infinite) */
export function ShineLink({ href, children }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      initial={reduce ? false : { opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEW}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
      className="inline-flex"
    >
      <Link
        href={href}
        className="group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-6 py-3 text-sm font-semibold !text-[#090b0e] transition-colors hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
      >
        {!reduce && (
          <motion.span
            aria-hidden="true"
            initial={{ x: "-150%" }}
            animate={{ x: "450%" }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
            className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
          />
        )}
        <span className="relative">{children}</span>
        <motion.span
          aria-hidden="true"
          animate={reduce ? undefined : { x: [0, 3, 0], y: [0, -3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
          className="relative inline-flex"
        >
          <ArrowUpRight size={17} />
        </motion.span>
      </Link>
    </motion.span>
  );
}