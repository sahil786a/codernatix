"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Brain, Check, Mail, FileText, MessageSquare } from "lucide-react";

/*
 * Automation network for AI & Automation.
 * Decorative only (parent wrapper is aria-hidden). Tinted by `color`.
 * Animations: signals travel input > core > output, core pulses.
 * All of them stop under prefers-reduced-motion. Icons and bars only.
 */
const INPUTS = [Mail, FileText, MessageSquare];
const Y = [22, 50, 78]; // % positions of inputs/outputs

export default function NetworkVisual({ color = "#2563eb" }) {
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
          style={{ background: `radial-gradient(60% 60% at 50% 50%, ${color}14, transparent 70%)` }}
        />

        {/* lines */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {Y.map((y, i) => (
            <g key={i}>
              <line x1="18" y1={y} x2="46" y2="50" stroke={`${color}55`} strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <line x1="54" y1="50" x2="82" y2={y} stroke={`${color}55`} strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </g>
          ))}
        </svg>

        {/* travelling signals */}
        {!reduce &&
          Y.map((y, i) => (
            <motion.span
              key={`in-${i}`}
              className="absolute h-2 w-2 rounded-full"
              style={{ background: color, boxShadow: `0 0 10px ${color}` }}
              animate={{ left: ["18%", "50%"], top: [`${y}%`, "50%"], opacity: [0, 1, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
            />
          ))}
        {!reduce &&
          Y.map((y, i) => (
            <motion.span
              key={`out-${i}`}
              className="absolute h-2 w-2 rounded-full"
              style={{ background: color, boxShadow: `0 0 10px ${color}` }}
              animate={{ left: ["50%", "82%"], top: ["50%", `${y}%`], opacity: [0, 1, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.2 + i * 0.6 }}
            />
          ))}

        {/* inputs */}
        {INPUTS.map((Icon, i) => (
          <span
            key={i}
            className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border bg-white"
            style={{ left: "14%", top: `${Y[i]}%`, borderColor: `${color}40`, color }}
          >
            <Icon size={16} strokeWidth={2} />
          </span>
        ))}

        {/* outputs */}
        {Y.map((y, i) => (
          <motion.span
            key={i}
            className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl text-white"
            style={{ left: "86%", top: `${y}%`, background: color }}
            animate={reduce ? undefined : { scale: [1, 1, 1.12, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: 2.2 + i * 0.6, times: [0, 0.5, 0.7, 1] }}
          >
            <Check size={16} strokeWidth={3} />
          </motion.span>
        ))}

        {/* core */}
        <motion.div
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl text-white"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}99)`, boxShadow: `0 12px 40px ${color}55` }}
          animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Brain size={28} strokeWidth={1.8} />
        </motion.div>
      </div>
    </div>
  );
}