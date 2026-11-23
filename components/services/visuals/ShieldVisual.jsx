"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Lock, ShieldCheck } from "lucide-react";

/*
 * Protection scene for Cybersecurity: a shield, a scan line, and incoming
 * threats that are stopped. Decorative only (parent wrapper is aria-hidden).
 * Tinted by `color`. All animation stops under prefers-reduced-motion.
 * Icons and dots only: no numbers, no safety claims.
 */
const THREATS = [
  { from: { left: "6%", top: "18%" }, delay: 0 },
  { from: { left: "6%", top: "78%" }, delay: 1.1 },
  { from: { left: "92%", top: "26%" }, delay: 2.2 },
  { from: { left: "92%", top: "74%" }, delay: 3.3 },
];

export default function ShieldVisual({ color = "#2563eb" }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px]">
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl border bg-white"
        style={{ borderColor: `${color}40`, boxShadow: `0 24px 60px ${color}33` }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: `radial-gradient(55% 55% at 50% 50%, ${color}1a, transparent 70%)` }}
        />

        {/* scan rings */}
        {!reduce &&
          [0, 1].map((i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 rounded-full border"
              style={{ width: 120, height: 120, marginLeft: -60, marginTop: -60, borderColor: `${color}55` }}
              animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: i * 1.5 }}
            />
          ))}

        {/* scan line */}
        {!reduce && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-x-0 h-px"
            style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
            animate={{ top: ["8%", "92%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* threats moving toward the shield, then fading out */}
        {!reduce &&
          THREATS.map((t, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute h-2.5 w-2.5 rounded-full bg-slate-400"
              style={{ left: t.from.left, top: t.from.top }}
              animate={{
                left: [t.from.left, "50%"],
                top: [t.from.top, "50%"],
                opacity: [0, 1, 1, 0],
                scale: [1, 1, 1, 0.3],
              }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: "easeIn",
                delay: t.delay,
                times: [0, 0.15, 0.75, 1],
              }}
            />
          ))}

        {/* shield */}
        <motion.div
          className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[28px] text-white"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}99)`,
            boxShadow: `0 16px 50px ${color}66`,
          }}
          animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ShieldCheck size={46} strokeWidth={1.6} />
        </motion.div>

        {/* corner badges */}
        <span
          className="absolute bottom-4 left-4 flex h-8 w-8 items-center justify-center rounded-lg border bg-white"
          style={{ borderColor: `${color}40`, color }}
        >
          <Lock size={15} strokeWidth={2.2} />
        </span>
        <span
          className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg text-white"
          style={{ background: color }}
        >
          <Check size={15} strokeWidth={3} />
        </span>
      </div>
    </div>
  );
}
