"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MousePointer2, Palette, Type } from "lucide-react";

/*
 * Design canvas for UI/UX Design: wireframe fills with colour and type.
 * Decorative only (parent wrapper is aria-hidden). Tinted by `color`.
 * Animations: blocks fill from grey to colour, cursor drifts, swatches pop.
 * All stop under prefers-reduced-motion (shows the finished design).
 * Bars and icons only: no text, numbers or claims.
 */
const CYCLE = 6;

export default function CanvasVisual({ color = "#2563eb" }) {
  const reduce = useReducedMotion();

  // grey -> colour fill, looping
  const fill = (delay, to) =>
    reduce
      ? {}
      : {
          animate: { backgroundColor: ["#e2e8f0", "#e2e8f0", to, to, "#e2e8f0"] },
          transition: {
            duration: CYCLE,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, delay / CYCLE, (delay + 0.8) / CYCLE, 0.9, 1],
          },
        };

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px]">
      <div
        className="absolute inset-0 flex overflow-hidden rounded-2xl border bg-white"
        style={{ borderColor: `${color}40`, boxShadow: `0 24px 60px ${color}33` }}
      >
        {/* toolbar */}
        <div
          className="flex w-[13%] flex-col items-center gap-3 border-r py-4"
          style={{ borderColor: `${color}22`, background: `${color}0d` }}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md text-white" style={{ background: color }}>
            <MousePointer2 size={13} strokeWidth={2.2} />
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-md" style={{ background: `${color}1a`, color }}>
            <Type size={13} strokeWidth={2.2} />
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-md" style={{ background: `${color}1a`, color }}>
            <Palette size={13} strokeWidth={2.2} />
          </span>
        </div>

        {/* canvas */}
        <div
          className="relative flex-1 p-4"
          style={{ backgroundImage: `radial-gradient(${color}22 1px, transparent 1px)`, backgroundSize: "14px 14px" }}
        >
          <div className="mx-auto flex h-full max-w-[250px] flex-col gap-3 rounded-xl border bg-white p-3 shadow-sm" style={{ borderColor: `${color}30` }}>
            {/* hero block */}
            <motion.div
              className="h-[34%] rounded-lg"
              style={{ backgroundColor: reduce ? color : "#e2e8f0" }}
              {...fill(0.6, color)}
            />
            {/* title bars */}
            <div className="space-y-2">
              <motion.span className="block h-2.5 w-2/3 rounded-full" style={{ backgroundColor: reduce ? `${color}88` : "#e2e8f0" }} {...fill(1.8, `${color}88`)} />
              <span className="block h-1.5 w-full rounded-full bg-slate-200" />
              <span className="block h-1.5 w-4/5 rounded-full bg-slate-200" />
            </div>
            {/* cards */}
            <div className="grid flex-1 grid-cols-2 gap-2">
              <motion.span className="rounded-lg" style={{ backgroundColor: reduce ? `${color}44` : "#e2e8f0" }} {...fill(2.6, `${color}44`)} />
              <motion.span className="rounded-lg" style={{ backgroundColor: reduce ? `${color}44` : "#e2e8f0" }} {...fill(3.2, `${color}44`)} />
            </div>
            {/* button */}
            <motion.span className="h-6 w-1/2 rounded-md" style={{ backgroundColor: reduce ? color : "#e2e8f0" }} {...fill(3.9, color)} />
          </div>

          {/* swatches */}
          <div className="absolute right-3 top-3 flex flex-col gap-1.5">
            {[color, `${color}88`, `${color}44`].map((c, i) => (
              <motion.span
                key={i}
                className="h-4 w-4 rounded-full border border-white shadow"
                style={{ background: c }}
                animate={reduce ? undefined : { scale: [0, 0, 1.2, 1, 1, 0] }}
                transition={{ duration: CYCLE, repeat: Infinity, ease: "easeOut", times: [0, 0.1 + i * 0.08, 0.2 + i * 0.08, 0.26 + i * 0.08, 0.9, 1] }}
              />
            ))}
          </div>

          {/* cursor */}
          {!reduce && (
            <motion.div
              className="absolute"
              style={{ color }}
              animate={{ left: ["20%", "55%", "40%", "60%", "20%"], top: ["22%", "40%", "68%", "82%", "22%"] }}
              transition={{ duration: CYCLE, repeat: Infinity, ease: "easeInOut" }}
            >
              <MousePointer2 size={20} strokeWidth={1.8} fill="currentColor" className="drop-shadow-md" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}