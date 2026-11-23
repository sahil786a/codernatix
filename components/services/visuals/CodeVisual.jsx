"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Braces, Code2 } from "lucide-react";

/*
 * Code editor mockup for Software Development.
 * Decorative only (parent wrapper is aria-hidden). Tinted by `color`.
 * Animations: lines draw in a loop, blinking cursor, floating badges.
 * All of them stop under prefers-reduced-motion.
 * Lines are bars (no real code text), so nothing to translate or read.
 */

// [indent level, width %]
const LINES = [
  [0, 38],
  [1, 62],
  [1, 48],
  [2, 70],
  [2, 54],
  [1, 30],
  [0, 22],
  [0, 58],
  [1, 44],
];

export default function CodeVisual({ color = "#2563eb" }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px]">
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl border bg-[#0b1020]"
        style={{ borderColor: `${color}55`, boxShadow: `0 24px 60px ${color}40` }}
      >
        {/* title bar */}
        <div
          className="flex items-center gap-3 border-b px-4 py-3"
          style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
        >
          <div className="flex gap-1.5">
            {["99", "66", "40"].map((a) => (
              <span
                key={a}
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: `${color}${a}` }}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] text-white/60"
            style={{ background: `${color}22` }}
          >
            <Code2 size={12} strokeWidth={2} style={{ color }} />
            <span>main</span>
          </div>
        </div>

        {/* code lines */}
        <div className="flex gap-3 px-4 py-4">
          {/* line numbers */}
          <div className="flex flex-col gap-[11px] pt-px text-right text-[10px] leading-none text-white/25">
            {LINES.map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>

          <div className="relative flex min-w-0 flex-1 flex-col gap-[11px]">
            {LINES.map(([indent, width], i) => (
              <div
                key={i}
                className="h-[7px]"
                style={{ paddingLeft: `${indent * 14}px` }}
              >
                <motion.span
                  className="block h-full origin-left rounded-full"
                  style={{
                    width: `${width}%`,
                    background: i % 3 === 0 ? color : i % 3 === 1 ? `${color}88` : "rgba(255,255,255,0.28)",
                  }}
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={reduce ? undefined : { scaleX: [0, 1, 1, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.85, 1],
                    delay: i * 0.25,
                  }}
                />
              </div>
            ))}

            {/* blinking cursor */}
            <motion.span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-3.5 w-[3px] rounded-sm"
              style={{ background: color }}
              animate={reduce ? undefined : { opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </div>

      {/* floating badges */}
      <motion.div
        className="absolute -right-2 top-6 flex h-12 w-12 items-center justify-center rounded-xl text-white sm:-right-4"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, boxShadow: `0 10px 30px ${color}66` }}
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Braces size={22} strokeWidth={1.9} />
      </motion.div>

      <motion.div
        className="absolute -left-2 bottom-8 flex h-11 items-center rounded-xl border bg-white px-3 text-[13px] font-bold sm:-left-4"
        style={{ borderColor: `${color}40`, color, boxShadow: `0 10px 30px ${color}33` }}
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        {"</>"}
      </motion.div>
    </div>
  );
}