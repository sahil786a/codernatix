"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Globe, MousePointer2 } from "lucide-react";

/*
 * Browser window mockup for Web Development.
 * Decorative only (parent wrapper is aria-hidden). Tinted by `color`.
 * Animations: loading bar, pulsing content cards, moving cursor.
 * All of them stop under prefers-reduced-motion.
 */
export default function BrowserVisual({ color = "#2563eb" }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px]">
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl border bg-white"
        style={{ borderColor: `${color}40`, boxShadow: `0 24px 60px ${color}33` }}
      >
        {/* title bar */}
        <div
          className="flex items-center gap-3 border-b px-4 py-3"
          style={{ borderColor: `${color}22`, background: `${color}0d` }}
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
          <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px]">
            <Globe size={13} strokeWidth={2} style={{ color }} />
            <span className="truncate text-slate-500">www.example.com</span>
          </div>
        </div>

        {/* loading bar */}
        <div className="relative h-0.5 w-full" style={{ background: `${color}1a` }}>
          <motion.div
            className="absolute inset-y-0 left-0"
            style={{ background: color }}
            initial={{ width: reduce ? "100%" : "0%" }}
            animate={
              reduce
                ? undefined
                : { width: ["0%", "100%", "100%"], opacity: [1, 1, 0] }
            }
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.7, 1],
            }}
          />
        </div>

        {/* page content */}
        <div className="space-y-3 p-4">
          <div
            className="flex h-24 flex-col justify-center gap-2 rounded-xl px-5"
            style={{ background: `linear-gradient(135deg, ${color}2b, ${color}0d)` }}
          >
            <span className="h-3 w-2/3 rounded-full" style={{ background: `${color}66` }} />
            <span className="h-2 w-1/2 rounded-full" style={{ background: `${color}33` }} />
            <span className="mt-1 h-5 w-20 rounded-md" style={{ background: color }} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="rounded-lg border p-2.5"
                style={{ borderColor: `${color}26` }}
                animate={
                  reduce
                    ? undefined
                    : { y: [0, -4, 0], backgroundColor: ["#ffffff", `${color}12`, "#ffffff"] }
                }
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              >
                <span
                  className="block h-8 rounded-md"
                  style={{ background: `${color}26` }}
                />
                <span className="mt-2 block h-1.5 w-4/5 rounded-full bg-slate-200" />
                <span className="mt-1.5 block h-1.5 w-3/5 rounded-full bg-slate-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* cursor */}
      {!reduce && (
        <motion.div
          className="absolute"
          style={{ color }}
          animate={{
            left: ["18%", "62%", "44%", "18%"],
            top: ["42%", "66%", "82%", "42%"],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <MousePointer2
            size={22}
            strokeWidth={1.8}
            fill="currentColor"
            className="drop-shadow-md"
          />
        </motion.div>
      )}
    </div>
  );
}