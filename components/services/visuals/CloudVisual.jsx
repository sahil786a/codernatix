"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cloud, Code2, Hammer, CheckCircle2, Rocket } from "lucide-react";

/*
 * Deploy pipeline for Cloud & DevOps: code > build > test > live.
 * Decorative only (parent wrapper is aria-hidden). Tinted by `color`.
 * Animations: cloud floats, a signal travels the pipeline, stages light up.
 * All stop under prefers-reduced-motion. Icons only: no uptime or speed claims.
 */
const STAGES = [Code2, Hammer, CheckCircle2, Rocket];
const CYCLE = 6;

export default function CloudVisual({ color = "#2563eb" }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px]">
      <div
        className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-5"
        style={{ borderColor: `${color}40`, boxShadow: `0 24px 60px ${color}33` }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: `radial-gradient(60% 50% at 50% 30%, ${color}14, transparent 70%)` }}
        />

        {/* cloud */}
        <div className="relative flex flex-1 items-center justify-center">
          {!reduce &&
            [0, 1].map((i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="absolute rounded-full border"
                style={{ borderColor: `${color}40`, width: 90, height: 90 }}
                animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: i * 1.5 }}
              />
            ))}
          <motion.div
            className="relative flex h-20 w-20 items-center justify-center rounded-3xl text-white"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}99)`, boxShadow: `0 12px 40px ${color}55` }}
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cloud size={38} strokeWidth={1.7} />
          </motion.div>
        </div>

        {/* pipeline */}
        <div className="relative px-2 pb-2">
          <div className="absolute left-7 right-7 top-[18px] h-px" style={{ background: `${color}40` }} />
          {!reduce && (
            <motion.span
              aria-hidden="true"
              className="absolute top-[14px] h-2 w-2 rounded-full"
              style={{ background: color, boxShadow: `0 0 10px ${color}` }}
              animate={{ left: ["8%", "92%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: CYCLE * 0.75, repeat: Infinity, ease: "linear" }}
            />
          )}
          <div className="relative flex justify-between">
            {STAGES.map((Icon, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <motion.span
                  className="flex h-9 w-9 items-center justify-center rounded-xl border bg-white"
                  style={{ borderColor: `${color}40`, color }}
                  animate={
                    reduce
                      ? undefined
                      : {
                          backgroundColor: ["#ffffff", color, "#ffffff"],
                          color: [color, "#ffffff", color],
                        }
                  }
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatDelay: CYCLE - 1.2,
                    delay: i * 1.3,
                    ease: "easeInOut",
                  }}
                >
                  <Icon size={17} strokeWidth={2} />
                </motion.span>
                <span className="h-1.5 w-8 rounded-full" style={{ background: `${color}33` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}