"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bell, Heart, Home, Search, User } from "lucide-react";

/*
 * Phone mockup for Mobile App Development.
 * Decorative only (parent wrapper is aria-hidden). Tinted by `color`.
 * Animations: phone floats, notification pops in and out, tab dot moves.
 * All of them stop under prefers-reduced-motion. Bars only, no text claims.
 */
const TABS = [Home, Search, Heart, User];

export default function PhoneVisual({ color = "#2563eb" }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px]">
      <motion.div
        className="absolute left-1/2 top-0 h-full w-[46%] -translate-x-1/2 overflow-hidden rounded-[28px] border-[3px] bg-white"
        style={{ borderColor: `${color}66`, boxShadow: `0 24px 60px ${color}40` }}
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* notch */}
        <span
          className="absolute left-1/2 top-1.5 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full"
          style={{ background: `${color}55` }}
        />

        <div className="flex h-full flex-col px-3 pb-2 pt-6">
          {/* header */}
          <div className="flex items-center justify-between">
            <span className="h-2 w-12 rounded-full" style={{ background: `${color}66` }} />
            <span className="h-5 w-5 rounded-full" style={{ background: `${color}2b` }} />
          </div>

          {/* hero card */}
          <div
            className="mt-3 h-[22%] rounded-xl"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}
          />

          {/* list rows */}
          <div className="mt-3 flex-1 space-y-2.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2"
                animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
              >
                <span className="h-7 w-7 shrink-0 rounded-lg" style={{ background: `${color}26` }} />
                <span className="flex-1 space-y-1">
                  <span className="block h-1.5 w-4/5 rounded-full bg-slate-200" />
                  <span className="block h-1.5 w-1/2 rounded-full bg-slate-100" />
                </span>
              </motion.div>
            ))}
          </div>

          {/* tab bar */}
          <div
            className="flex items-center justify-around rounded-xl border py-1.5"
            style={{ borderColor: `${color}22`, background: `${color}0d` }}
          >
            {TABS.map((Icon, i) => (
              <Icon
                key={i}
                size={14}
                strokeWidth={2}
                style={{ color: i === 0 ? color : `${color}66` }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* notification */}
      <motion.div
        className="absolute left-0 top-[18%] flex items-center gap-2 rounded-xl border bg-white px-3 py-2 sm:-left-3"
        style={{ borderColor: `${color}40`, boxShadow: `0 10px 30px ${color}33` }}
        animate={
          reduce
            ? undefined
            : { opacity: [0, 1, 1, 0], x: [-16, 0, 0, -16], y: [0, 0, 0, 0] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.8, 1] }}
      >
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg text-white"
          style={{ background: color }}
        >
          <Bell size={14} strokeWidth={2.2} />
        </span>
        <span className="space-y-1">
          <span className="block h-1.5 w-14 rounded-full" style={{ background: `${color}66` }} />
          <span className="block h-1.5 w-9 rounded-full bg-slate-200" />
        </span>
      </motion.div>

      {/* floating heart */}
      <motion.div
        className="absolute bottom-[14%] right-0 flex h-11 w-11 items-center justify-center rounded-full text-white sm:-right-3"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, boxShadow: `0 10px 30px ${color}66` }}
        animate={reduce ? undefined : { y: [0, 8, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <Heart size={20} strokeWidth={2} fill="currentColor" />
      </motion.div>
    </div>
  );
}