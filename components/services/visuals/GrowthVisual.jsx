"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Megaphone, Search, TrendingUp } from "lucide-react";

/*
 * Growth scene for Digital Marketing: rising bars, a trend line, and
 * floating reach icons. Decorative only (parent wrapper is aria-hidden).
 * Tinted by `color`. Animation stops under prefers-reduced-motion.
 * Bars and icons only: no numbers, rankings or results claims.
 */
const BARS = [28, 40, 36, 56, 52, 72, 86];

export default function GrowthVisual({ color = "#2563eb" }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px]">
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl border bg-white p-5"
        style={{ borderColor: `${color}40`, boxShadow: `0 24px 60px ${color}33` }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: `radial-gradient(60% 55% at 70% 20%, ${color}18, transparent 70%)` }}
        />

        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span className="h-2 w-16 rounded-full" style={{ background: `${color}55` }} />
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg text-white"
              style={{ background: color }}
            >
              <TrendingUp size={15} strokeWidth={2.2} />
            </span>
          </div>

          <div className="relative mt-4 flex-1">
            <div className="flex h-full items-end gap-2">
              {BARS.map((h, i) => (
                <motion.span
                  key={i}
                  className="flex-1 origin-bottom rounded-t-md"
                  style={{ height: `${h}%`, background: `linear-gradient(to top, ${color}, ${color}55)` }}
                  initial={reduce ? false : { scaleY: 0 }}
                  animate={reduce ? undefined : { scaleY: [0, 1, 1, 0] }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeOut",
                    times: [0, 0.3, 0.88, 1],
                    delay: i * 0.12,
                  }}
                />
              ))}
            </div>

            <svg
              viewBox="0 0 100 50"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <motion.path
                d="M2 42 L18 36 L34 38 L50 26 L66 28 L82 14 L98 6"
                fill="none"
                stroke={color}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduce ? false : { pathLength: 0 }}
                animate={reduce ? undefined : { pathLength: [0, 1, 1, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", times: [0, 0.45, 0.88, 1] }}
              />
            </svg>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute -left-1 top-6 flex h-11 w-11 items-center justify-center rounded-xl border bg-white sm:-left-3"
        style={{ borderColor: `${color}40`, color, boxShadow: `0 10px 30px ${color}33` }}
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Search size={20} strokeWidth={2} />
      </motion.div>

      <motion.div
        className="absolute -right-1 bottom-10 flex h-12 w-12 items-center justify-center rounded-xl text-white sm:-right-3"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, boxShadow: `0 10px 30px ${color}66` }}
        animate={reduce ? undefined : { y: [0, 8, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Megaphone size={22} strokeWidth={1.9} />
      </motion.div>
    </div>
  );
}
