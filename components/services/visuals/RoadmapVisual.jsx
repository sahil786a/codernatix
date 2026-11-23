"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Flag, Lightbulb } from "lucide-react";

/*
 * Roadmap scene for IT Consulting: milestones along a path, a flag moving
 * from one to the next. Decorative only (parent wrapper is aria-hidden).
 * Tinted by `color`. Animation stops under prefers-reduced-motion
 * (shows the finished roadmap). Icons and bars only: no dates or numbers.
 */
const CYCLE = 8;
// milestone positions in % of the stage (left, top)
const POINTS = [
  { left: 12, top: 74 },
  { left: 36, top: 46 },
  { left: 62, top: 62 },
  { left: 86, top: 24 },
];

export default function RoadmapVisual({ color = "#2563eb" }) {
  const reduce = useReducedMotion();
  const lefts = POINTS.map((p) => `${p.left}%`);
  const tops = POINTS.map((p) => `${p.top}%`);

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px]">
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl border bg-white"
        style={{ borderColor: `${color}40`, boxShadow: `0 24px 60px ${color}33` }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${color}22 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
        />

        {/* path */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path
            d="M12 74 C 22 74, 26 46, 36 46 S 52 62, 62 62 S 78 24, 86 24"
            fill="none"
            stroke={`${color}33`}
            strokeWidth="2"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
          />
          <motion.path
            d="M12 74 C 22 74, 26 46, 36 46 S 52 62, 62 62 S 78 24, 86 24"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={reduce ? false : { pathLength: 0 }}
            animate={reduce ? { pathLength: 1 } : { pathLength: [0, 1, 1, 0] }}
            transition={{ duration: CYCLE, repeat: reduce ? 0 : Infinity, ease: "easeInOut", times: [0, 0.7, 0.92, 1] }}
          />
        </svg>

        {/* milestones */}
        {POINTS.map((p, i) => (
          <motion.span
            key={i}
            className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 bg-white"
            style={{ left: `${p.left}%`, top: `${p.top}%`, borderColor: color, color }}
            animate={
              reduce
                ? { backgroundColor: color, color: "#ffffff" }
                : {
                    backgroundColor: ["#ffffff", "#ffffff", color, color, "#ffffff"],
                    color: [color, color, "#ffffff", "#ffffff", color],
                  }
            }
            transition={{
              duration: CYCLE,
              repeat: reduce ? 0 : Infinity,
              ease: "easeOut",
              times: [0, 0.12 + i * 0.18, 0.2 + i * 0.18, 0.92, 1],
            }}
          >
            {i === 0 ? <Lightbulb size={13} strokeWidth={2.4} /> : <Check size={13} strokeWidth={3} />}
          </motion.span>
        ))}

        {/* flag */}
        <motion.div
          className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-[130%] items-center justify-center rounded-xl text-white"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}bb)`,
            boxShadow: `0 10px 30px ${color}66`,
            left: lefts[reduce ? 3 : 0],
            top: tops[reduce ? 3 : 0],
          }}
          animate={reduce ? undefined : { left: lefts, top: tops }}
          transition={{ duration: CYCLE * 0.7, repeat: Infinity, repeatDelay: CYCLE * 0.3, ease: "easeInOut" }}
        >
          <Flag size={17} strokeWidth={2.2} />
        </motion.div>
      </div>
    </div>
  );
}
