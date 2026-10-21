"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Search,
  ClipboardList,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
  ArrowRight,
} from "lucide-react";

import { processSteps } from "@/data/process";

const ICONS = {
  search: Search,
  "clipboard-list": ClipboardList,
  palette: Palette,
  code: Code2,
  "shield-check": ShieldCheck,
  rocket: Rocket,
};

const EASE = [0.22, 1, 0.36, 1];

/* ---------------------------------------------------------------- */
/* Layout numbers (desktop zigzag)                                   */
/* ---------------------------------------------------------------- */

const W = 1000; // design width (px)
const CARD_H = 310; // card height (lg)
const STEP = 190; // har agle card ka vertical offset
const LEFT_CX = 290; // left card ka centre-x (design units)
const RIGHT_CX = 710; // right card ka centre-x

/* Card colours (poore class names, taaki Tailwind pakad sake) */
const THEMES = [
  { panel: "bg-orange-50 border-orange-100", text: "text-orange-500", ring: "border-orange-300" },
  { panel: "bg-blue-50 border-blue-100", text: "text-blue-600", ring: "border-blue-300" },
  { panel: "bg-purple-50 border-purple-100", text: "text-purple-600", ring: "border-purple-300" },
  { panel: "bg-emerald-50 border-emerald-100", text: "text-emerald-600", ring: "border-emerald-300" },
  { panel: "bg-rose-50 border-rose-100", text: "text-rose-500", ring: "border-rose-300" },
  { panel: "bg-cyan-50 border-cyan-100", text: "text-cyan-600", ring: "border-cyan-300" },
];

/* Cards ke beech ka dashed path steps ki sankhya se banta hai */
function buildPath(n) {
  const pts = Array.from({ length: n }, (_, i) => ({
    x: i % 2 === 0 ? LEFT_CX : RIGHT_CX,
    y: i * STEP + CARD_H / 2,
  }));

  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < n; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const dir = b.x > a.x ? 1 : -1;
    d += ` C ${a.x + dir * 230} ${a.y}, ${b.x - dir * 230} ${b.y}, ${b.x} ${b.y}`;
  }
  return d;
}

/* ---------------------------------------------------------------- */
/* Pin                                                               */
/* ---------------------------------------------------------------- */

function Pin({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Step card                                                         */
/* ---------------------------------------------------------------- */

function StepCard({ step, index, top, side, theme, reduce }) {
  const Icon = ICONS[step.icon];
  const tiltLg = side === "left" ? 6 : -6;
  const tiltSm = index % 2 === 0 ? 1.5 : -1.5;
  const fromX = side === "left" ? -40 : 40;

  return (
    <div
      className={`relative z-10 w-full hover:z-30 lg:absolute lg:top-[var(--t)] lg:h-[310px] lg:w-[280px] [transform:rotate(var(--rs))] lg:[transform:rotate(var(--rl))] ${
        side === "left" ? "lg:left-[15%]" : "lg:right-[15%]"
      }`}
      style={{
        "--t": `${top}px`,
        "--rs": `${tiltSm}deg`,
        "--rl": `${tiltLg}deg`,
      }}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 50, x: fromX, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.8, ease: EASE }}
        whileHover={reduce ? undefined : { scale: 1.05 }}
        className="flex h-full flex-col rounded-[25px] border border-neutral-100 bg-white p-2 shadow-[0px_10px_20px_0px_#D3D3D3]"
      >
        {/* pin: halka wobble (infinite) */}
        <motion.span
          className={`mx-auto mb-6 mt-1 inline-flex ${theme.text}`}
        >
          <Pin className="h-8 w-8" />
        </motion.span>

        <div
          className={`relative flex flex-1 flex-col overflow-hidden rounded-[15px] border p-[15px] ${theme.panel}`}
        >
          <div className="flex items-start justify-between gap-3">
            <span
              className={`font-brand text-4xl font-bold leading-none tracking-tight ${theme.text}`}
            >
              {step.number}
            </span>

            {/* icon chip + ping ring (infinite) */}
            <span
              className={`relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ${theme.text}`}
            >
              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-xl border-2 ${theme.ring}`}
                  animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                  transition={{
                    duration: 2.6,
                    delay: index * 0.4,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              )}
              {Icon && <Icon size={20} strokeWidth={1.9} className="relative" />}
            </span>
          </div>

          <h3 className="mt-5 text-2xl font-semibold leading-none text-neutral-800">
            {step.title}
          </h3>

          <p className="mt-2.5 text-sm/5 tracking-tight text-neutral-500">
            {step.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Section                                                           */
/* ---------------------------------------------------------------- */

export default function ProcessSection() {
  const reduce = useReducedMotion();
  const n = processSteps.length;
  const height = (n - 1) * STEP + CARD_H + 20;
  const pathD = n > 1 ? buildPath(n) : null;

  return (
    <section
      id="our-process"
      aria-labelledby="process-heading"
      className="relative overflow-hidden bg-brand-white py-16 sm:py-20 lg:py-24"
    >
      {/* Ruled-paper lines (kinaaron par fade) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.09] [mask-image:linear-gradient(to_right,transparent,black_22%,black_78%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_22%,black_78%,transparent)]"
        style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px)",
          backgroundSize: "100% 32px",
          marginTop: "4px",
        }}
      />

      <div
        aria-hidden="true"
        className="ambient-blue -right-40 top-10 opacity-70"
      />

      <div className="site-container relative">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue"
          >
            <span aria-hidden="true" className="h-px w-7 bg-brand-blue" />
            Our Process
            <span aria-hidden="true" className="h-px w-7 bg-brand-blue" />
          </motion.span>

          <motion.h2
            id="process-heading"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mt-5 text-3xl font-bold leading-tight tracking-tight text-brand-black sm:text-4xl lg:text-5xl"
          >
            From Idea to{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-blue-light bg-clip-text text-transparent">
              Impact.
            </span>
          </motion.h2>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-brand-gray-500 sm:text-base sm:leading-8"
          >
            A clear, collaborative process helps turn your business goals into
            reliable digital solutions, from the first conversation to launch.
          </motion.p>
        </div>

        {/* Zigzag cards + dashed path */}
        <div
          className="relative mx-auto mt-12 grid max-w-[1000px] grid-cols-1 gap-8 px-1 sm:grid-cols-2 lg:mt-16 lg:block lg:h-[var(--h)] lg:px-0"
          style={{ "--h": `${height}px` }}
        >
          {pathD && (
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-0 hidden h-full w-full lg:block"
              viewBox={`0 0 ${W} ${height}`}
              preserveAspectRatio="none"
            >
              <motion.path
                d={pathD}
                stroke="currentColor"
                className="text-neutral-300"
                strokeWidth="2"
                strokeDasharray="8 6"
                strokeLinecap="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
                initial={{ strokeDashoffset: 0 }}
                animate={reduce ? undefined : { strokeDashoffset: -140 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          )}

          {processSteps.map((step, index) => {
            const side = index % 2 === 0 ? "left" : "right";
            return (
              <StepCard
                key={step.id}
                step={step}
                index={index}
                top={index * STEP}
                side={side}
                theme={THEMES[index % THEMES.length]}
                reduce={reduce}
              />
            );
          })}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-14 flex flex-col items-center justify-center gap-4 text-center sm:flex-row lg:mt-16"
        >
          <p className="text-sm leading-7 text-brand-gray-600 sm:text-base">
            Have a project in mind? Let&apos;s discuss your goals.
          </p>

          <a
            href="/contact"
            className="group inline-flex items-center gap-2 font-semibold text-brand-blue transition-colors hover:text-brand-blue-dark"
          >
            Let&apos;s Talk
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}