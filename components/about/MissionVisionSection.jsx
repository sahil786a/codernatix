"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Compass, Target } from "lucide-react";
import { WRAP, SectionHead, Reveal } from "./AboutShared";

const ITEMS = [
  {
    id: "mission",
    label: "Our Mission",
    Icon: Target,
    text: "To understand real needs and build useful, reliable and maintainable digital solutions.",
    points: ["Useful", "Reliable", "Maintainable"],
    dark: false,
  },
  {
    id: "vision",
    label: "Our Vision",
    Icon: Compass,
    text: "To grow into a trusted technology brand that creates long-term value through thoughtful engineering and practical innovation.",
    points: ["Long-term value", "Thoughtful engineering", "Practical innovation"],
    dark: true,
  },
];

export default function MissionVisionSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="mission-vision"
      aria-labelledby="mission-heading"
      className="relative overflow-hidden bg-brand-gray-50 py-16 sm:py-20 lg:py-24"
    >
      <div className={WRAP}>
        <SectionHead
          id="mission-heading"
          label="Purpose & Direction"
          title="Where We Are Today,"
          highlight="And Where We're Headed"
        />

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
          {ITEMS.map(({ id, label, Icon, text, points, dark }, i) => (
            <Reveal key={id} as="article" delay={i * 0.15} y={40}>
              <div
                className={`group relative h-full overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1.5 sm:p-9 ${
                  dark
                    ? "border-brand-black bg-brand-black text-white shadow-xl shadow-slate-900/20"
                    : "border-brand-gray-200 bg-white text-brand-black hover:border-brand-blue/30 hover:shadow-xl hover:shadow-slate-900/[0.06]"
                }`}
              >
                {/* watermark icon */}
                <Icon
                  aria-hidden="true"
                  size={220}
                  strokeWidth={1}
                  className={`pointer-events-none absolute -bottom-10 -right-10 ${
                    dark ? "text-white/[0.05]" : "text-brand-blue/[0.06]"
                  }`}
                />
                {dark && (
                  <motion.div
                    aria-hidden="true"
                    animate={reduce ? undefined : { opacity: [0.35, 0.8, 0.35], scale: [1, 1.1, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-brand-blue/30 blur-3xl"
                  />
                )}

                <div className="relative">
                  <div className="flex items-center gap-3">
                    <motion.span
                      animate={reduce ? undefined : { y: [0, -4, 0] }}
                      transition={{ duration: 3.6, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
                      className={`flex size-12 items-center justify-center rounded-xl ring-1 ${
                        dark
                          ? "bg-white/10 text-blue-300 ring-white/15"
                          : "bg-brand-blue/10 text-brand-blue ring-brand-blue/20"
                      }`}
                    >
                      <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
                    </motion.span>
                    <h3
                      className={`text-xs font-bold uppercase tracking-[0.2em] ${
                        dark ? "text-blue-300" : "text-brand-blue"
                      }`}
                    >
                      {label}
                    </h3>
                  </div>

                  <p className="mt-7 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                    {text}
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-2">
                    {points.map((p) => (
                      <li
                        key={p}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                          dark
                            ? "border-white/15 bg-white/5 text-white/80"
                            : "border-brand-gray-200 bg-brand-gray-50 text-brand-gray-600"
                        }`}
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}