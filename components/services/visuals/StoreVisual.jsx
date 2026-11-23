"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";

/*
 * Storefront mockup for E-commerce Development.
 * Decorative only (parent wrapper is aria-hidden). Tinted by `color`.
 * Animations: cart count ticks up, product cards lift in turn, checkout
 * button pulses. All of them stop under prefers-reduced-motion.
 * No prices or product text: bars only, so no content claims.
 */
export default function StoreVisual({ color = "#2563eb" }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(2);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setCount((c) => (c >= 5 ? 1 : c + 1)), 1600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px]">
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl border bg-white"
        style={{ borderColor: `${color}40`, boxShadow: `0 24px 60px ${color}33` }}
      >
        {/* header */}
        <div
          className="flex items-center justify-between border-b px-4 py-3"
          style={{ borderColor: `${color}22`, background: `${color}0d` }}
        >
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded-md" style={{ background: color }} />
            <span className="h-2 w-16 rounded-full" style={{ background: `${color}55` }} />
          </div>
          <div className="relative">
            <ShoppingCart size={20} strokeWidth={1.9} style={{ color }} />
            <motion.span
              key={count}
              initial={reduce ? false : { scale: 0.4 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 14 }}
              className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold text-white"
              style={{ background: color }}
            >
              {count}
            </motion.span>
          </div>
        </div>

        {/* products */}
        <div className="grid grid-cols-3 gap-3 p-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="rounded-lg border p-2"
              style={{ borderColor: `${color}26` }}
              animate={reduce ? undefined : { y: [0, -5, 0] }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.6,
              }}
            >
              <span
                className="block aspect-square rounded-md"
                style={{
                  background: `linear-gradient(135deg, ${color}33, ${color}0f)`,
                }}
              />
              <span className="mt-2 block h-1.5 w-4/5 rounded-full bg-slate-200" />
              <span
                className="mt-1.5 block h-1.5 w-2/5 rounded-full"
                style={{ background: `${color}66` }}
              />
            </motion.div>
          ))}
        </div>

        {/* checkout */}
        <div className="flex items-center justify-between gap-3 px-4 pb-4">
          <div className="flex items-center gap-2">
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-white"
              style={{ background: color }}
            >
              <Check size={14} strokeWidth={2.8} />
            </span>
            <span className="h-2 w-20 rounded-full bg-slate-200" />
          </div>
          <motion.span
            className="block h-8 w-24 rounded-lg"
            style={{ background: color }}
            animate={
              reduce
                ? undefined
                : {
                    scale: [1, 1.06, 1],
                    boxShadow: [
                      `0 0 0 0 ${color}00`,
                      `0 0 0 8px ${color}33`,
                      `0 0 0 0 ${color}00`,
                    ],
                  }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}