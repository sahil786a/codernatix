"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeftRight, Database, LayoutGrid, Plug } from "lucide-react";

/*
 * API integration for API Integration: two systems exchanging data.
 * Decorative only (parent wrapper is aria-hidden). Tinted by `color`.
 * Animations: request packets go right, responses come back, hub pulses.
 * All stop under prefers-reduced-motion. Icons and bars only.
 */
export default function ApiVisual({ color = "#2563eb" }) {
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
          style={{ background: `radial-gradient(60% 50% at 50% 50%, ${color}14, transparent 70%)` }}
        />

        {/* left system */}
        <div
          className="absolute left-[6%] top-1/2 flex h-24 w-[22%] -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-xl border bg-white"
          style={{ borderColor: `${color}40`, color }}
        >
          <LayoutGrid size={22} strokeWidth={1.9} />
          <span className="h-1.5 w-8 rounded-full" style={{ background: `${color}55` }} />
        </div>

        {/* right system */}
        <div
          className="absolute right-[6%] top-1/2 flex h-24 w-[22%] -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-xl border bg-white"
          style={{ borderColor: `${color}40`, color }}
        >
          <Database size={22} strokeWidth={1.9} />
          <span className="h-1.5 w-8 rounded-full" style={{ background: `${color}55` }} />
        </div>

        {/* connector lines */}
        <span
          className="absolute left-[28%] right-[28%] top-[44%] h-px"
          style={{ background: `${color}55` }}
        />
        <span
          className="absolute left-[28%] right-[28%] top-[56%] h-px"
          style={{ background: `${color}33` }}
        />

        {/* request packets (left to right) */}
        {!reduce &&
          [0, 1].map((i) => (
            <motion.span
              key={`req-${i}`}
              className="absolute flex h-5 w-8 items-center justify-center rounded-md text-[10px] font-bold text-white"
              style={{ top: "calc(44% - 10px)", background: color }}
              animate={{ left: ["28%", "62%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 1.3 }}
            >
              {"{ }"}
            </motion.span>
          ))}

        {/* response packets (right to left) */}
        {!reduce &&
          [0, 1].map((i) => (
            <motion.span
              key={`res-${i}`}
              className="absolute flex h-5 w-8 items-center justify-center rounded-md border bg-white text-[10px] font-bold"
              style={{ top: "calc(56% - 10px)", borderColor: color, color }}
              animate={{ left: ["62%", "28%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.65 + i * 1.3 }}
            >
              {"{ }"}
            </motion.span>
          ))}

        {/* hub */}
        <motion.div
          className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl text-white"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}99)`, boxShadow: `0 12px 40px ${color}55` }}
          animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Plug size={24} strokeWidth={1.9} />
        </motion.div>

        {/* swap badge */}
        <span
          className="absolute bottom-4 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full"
          style={{ background: `${color}1a`, color }}
        >
          <ArrowLeftRight size={14} strokeWidth={2.2} />
        </span>
      </div>
    </div>
  );
}