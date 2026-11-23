"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Check,
  CreditCard,
  Layers,
  LayoutDashboard,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";

/*
 * SaaS story animation: sign up > pick a plan > subscribe > dashboard.
 * Decorative only (parent wrapper is aria-hidden). Tinted by `color`.
 * Loops on a timer. Under prefers-reduced-motion it shows the final
 * dashboard scene, static. Bars and icons only: no numbers or claims.
 */
const SCENES = [
  { id: "signup", label: "Sign up", Icon: UserPlus },
  { id: "plan", label: "Pick a plan", Icon: Layers },
  { id: "pay", label: "Subscribe", Icon: CreditCard },
  { id: "dash", label: "Dashboard", Icon: LayoutDashboard },
];
const SCENE_MS = 3600;
const BARS = [38, 62, 48, 80, 56, 90, 70];

/* ---------- scenes ---------- */

function SignUp({ color, reduce }) {
  const d = reduce ? 0 : 1;
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6">
      <motion.span
        initial={reduce ? false : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
        className="flex h-12 w-12 items-center justify-center rounded-full text-white"
        style={{ background: color }}
      >
        <UserPlus size={22} strokeWidth={2} />
      </motion.span>

      {[0, 1].map((i) => (
        <div
          key={i}
          className="h-9 w-full max-w-[220px] overflow-hidden rounded-lg border px-3 py-3"
          style={{ borderColor: `${color}40` }}
        >
          <motion.span
            className="block h-1.5 rounded-full"
            style={{ background: `${color}77` }}
            initial={reduce ? false : { width: "0%" }}
            animate={{ width: i === 0 ? "62%" : "40%" }}
            transition={{ duration: 0.9 * d, delay: (0.5 + i * 0.9) * d, ease: "easeOut" }}
          />
        </div>
      ))}

      <motion.div
        className="relative flex h-9 w-full max-w-[220px] items-center justify-center rounded-lg text-white"
        style={{ background: color }}
        initial={reduce ? false : { opacity: 0.5 }}
        animate={{ opacity: 1, scale: reduce ? 1 : [1, 1, 0.94, 1] }}
        transition={{ duration: 0.8 * d, delay: 2.3 * d, times: [0, 0.3, 0.6, 1] }}
      >
        <motion.span
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.9 * d, type: "spring", stiffness: 300, damping: 14 }}
        >
          <Check size={18} strokeWidth={3} />
        </motion.span>
      </motion.div>
    </div>
  );
}

function PickPlan({ color, reduce }) {
  const d = reduce ? 0 : 1;
  return (
    <div className="flex h-full items-center justify-center px-4">
      <div className="grid w-full max-w-[320px] grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => {
          const picked = i === 1;
          return (
            <motion.div
              key={i}
              className="relative rounded-xl border p-2.5"
              style={{ borderColor: `${color}30` }}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: picked ? 1.08 : 1,
                borderColor: picked ? color : `${color}30`,
                boxShadow: picked ? `0 12px 30px ${color}40` : "0 0 0 0 transparent",
              }}
              transition={{
                opacity: { duration: 0.5 * d, delay: i * 0.15 * d },
                y: { duration: 0.5 * d, delay: i * 0.15 * d },
                scale: { delay: 1.4 * d, duration: 0.4 * d },
                borderColor: { delay: 1.4 * d, duration: 0.4 * d },
                boxShadow: { delay: 1.4 * d, duration: 0.4 * d },
              }}
            >
              <span className="block h-1.5 w-1/2 rounded-full" style={{ background: `${color}66` }} />
              <span className="mt-3 block h-3 w-2/3 rounded-full" style={{ background: `${color}33` }} />
              <span className="mt-3 block space-y-1.5">
                {[0, 1, 2].map((r) => (
                  <span key={r} className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
                    <span className="h-1 flex-1 rounded-full bg-slate-200" />
                  </span>
                ))}
              </span>
              {picked && (
                <motion.span
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full text-white"
                  style={{ background: color }}
                  initial={reduce ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.8 * d, type: "spring", stiffness: 300, damping: 14 }}
                >
                  <Check size={13} strokeWidth={3} />
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function Subscribe({ color, reduce }) {
  const d = reduce ? 0 : 1;
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-6">
      <motion.div
        className="relative h-24 w-full max-w-[220px] rounded-xl p-3 text-white"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
        initial={reduce ? false : { rotateX: 60, opacity: 0, y: 20 }}
        animate={{ rotateX: 0, opacity: 1, y: 0 }}
        transition={{ duration: 0.7 * d, ease: "easeOut" }}
      >
        <CreditCard size={22} strokeWidth={1.8} />
        <span className="mt-5 block h-1.5 w-3/4 rounded-full bg-white/60" />
        <span className="mt-2 block h-1.5 w-1/3 rounded-full bg-white/40" />
      </motion.div>

      <div className="h-1.5 w-full max-w-[220px] overflow-hidden rounded-full" style={{ background: `${color}22` }}>
        <motion.span
          className="block h-full rounded-full"
          style={{ background: color }}
          initial={reduce ? false : { width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.6 * d, delay: 0.8 * d, ease: "easeInOut" }}
        />
      </div>

      <motion.span
        className="flex h-9 w-9 items-center justify-center rounded-full text-white"
        style={{ background: color }}
        initial={reduce ? false : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.5 * d, type: "spring", stiffness: 280, damping: 13 }}
      >
        <Check size={18} strokeWidth={3} />
      </motion.span>
    </div>
  );
}

function Dash({ color, reduce }) {
  const d = reduce ? 0 : 1;
  return (
    <div className="relative flex h-full">
      <div
        className="flex w-[14%] flex-col items-center gap-3 border-r py-3"
        style={{ borderColor: `${color}22`, background: `${color}0d` }}
      >
        <span className="h-5 w-5 rounded-md" style={{ background: color }} />
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-3.5 w-3.5 rounded"
            style={{ background: i === 0 ? `${color}88` : `${color}33` }}
          />
        ))}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-3">
        <div className="grid grid-cols-2 gap-2.5">
          {[TrendingUp, Users].map((Icon, i) => (
            <motion.div
              key={i}
              className="rounded-lg border p-2"
              style={{ borderColor: `${color}26` }}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (0.2 + i * 0.15) * d, duration: 0.5 * d }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-md"
                  style={{ background: `${color}1a`, color }}
                >
                  <Icon size={12} strokeWidth={2.2} />
                </span>
                <span className="h-1.5 w-8 rounded-full bg-slate-200" />
              </span>
              <span className="mt-1.5 block h-2 w-2/3 rounded-full" style={{ background: `${color}66` }} />
            </motion.div>
          ))}
        </div>

        <div className="relative flex-1 rounded-lg border p-2.5" style={{ borderColor: `${color}26` }}>
          <div className="flex h-full items-end gap-1.5">
            {BARS.map((h, i) => (
              <motion.span
                key={i}
                className="flex-1 origin-bottom rounded-t-md"
                style={{ height: `${h}%`, background: `linear-gradient(to top, ${color}, ${color}66)` }}
                initial={reduce ? false : { scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6 * d, delay: (0.5 + i * 0.12) * d, ease: "easeOut" }}
              />
            ))}
          </div>
          <svg
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-2.5 h-[calc(100%-1.25rem)] w-[calc(100%-1.25rem)]"
          >
            <motion.path
              d="M0 30 L16 22 L32 26 L50 12 L68 18 L84 6 L100 10"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4 * d, delay: 1.1 * d, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>

      {/* new-user toast */}
      <motion.div
        className="absolute right-3 top-3 flex items-center gap-2 rounded-lg border bg-white px-2.5 py-1.5"
        style={{ borderColor: `${color}40`, boxShadow: `0 8px 24px ${color}33` }}
        initial={reduce ? false : { opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.2 * d, type: "spring", stiffness: 220, damping: 16 }}
      >
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full text-white"
          style={{ background: color }}
        >
          <UserPlus size={12} strokeWidth={2.4} />
        </span>
        <span className="space-y-1">
          <span className="block h-1.5 w-10 rounded-full" style={{ background: `${color}66` }} />
          <span className="block h-1 w-6 rounded-full bg-slate-200" />
        </span>
      </motion.div>
    </div>
  );
}

const VIEWS = [SignUp, PickPlan, Subscribe, Dash];

/* ---------- main ---------- */

export default function DashboardVisual({ color = "#2563eb" }) {
  const reduce = useReducedMotion();
  const [scene, setScene] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setScene((s) => (s + 1) % SCENES.length), SCENE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  const active = reduce ? SCENES.length - 1 : scene;
  const View = VIEWS[active];

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px]">
      <div
        className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border bg-white"
        style={{ borderColor: `${color}40`, boxShadow: `0 24px 60px ${color}33` }}
      >
        {/* top bar */}
        <div
          className="flex items-center justify-between border-b px-4 py-2.5"
          style={{ borderColor: `${color}22`, background: `${color}0d` }}
        >
          <div className="flex gap-1.5">
            {["99", "66", "40"].map((a) => (
              <span key={a} className="h-2.5 w-2.5 rounded-full" style={{ background: `${color}${a}` }} />
            ))}
          </div>
          <span className="text-[11px] font-semibold" style={{ color }}>
            {SCENES[active].label}
          </span>
        </div>

        {/* stage */}
        <div className="relative min-h-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <View color={color} reduce={reduce} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* step indicator */}
        <div
          className="flex items-center justify-center gap-2 border-t py-2"
          style={{ borderColor: `${color}22` }}
        >
          {SCENES.map(({ id, Icon }, i) => {
            const on = i === active;
            return (
              <motion.span
                key={id}
                className="flex h-6 items-center justify-center rounded-full"
                animate={{
                  width: on ? 40 : 24,
                  backgroundColor: on ? color : `${color}1a`,
                  color: on ? "#ffffff" : color,
                }}
                transition={{ duration: reduce ? 0 : 0.35 }}
              >
                <Icon size={13} strokeWidth={2.2} />
              </motion.span>
            );
          })}
        </div>
      </div>
    </div>
  );
}