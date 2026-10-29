"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WRAP, SectionHead, Reveal } from "./AboutShared";

// TODO: Ye PDF ka starter copy hai. Apni asli story se personalize karo.
const PARAGRAPHS = [
  "Codernatix began with an interest in technology, software development and the possibilities of turning ideas into practical digital products.",
  "We believe technology should do more than look impressive: it should solve real problems, simplify work and create useful experiences.",
  "Our goal is to build Codernatix into a technology partner that approaches each project with thoughtful planning, curiosity and continuous learning.",
];

function StoryVisual({ reduce }) {
  const bars = [78, 92, 60, 84];
  const chip =
    "absolute z-10 rounded-xl border border-brand-gray-200 bg-white px-3 py-2 text-[11px] font-semibold text-brand-gray-700 shadow-lg";

  return (
    <div className="relative mx-auto w-full max-w-[480px] py-8">
      <motion.span
        aria-hidden="true"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
        className={`${chip} -left-2 top-0 lg:-left-6`}
      >
        Idea
      </motion.span>
      <motion.span
        aria-hidden="true"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 5.2, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
        className={`${chip} -right-2 bottom-0 flex items-center gap-1.5 lg:-right-6`}
      >
        Useful product <ArrowRight size={12} className="text-brand-blue" />
      </motion.span>

      <div className="relative overflow-hidden rounded-2xl border border-brand-black bg-brand-black p-5 shadow-2xl shadow-slate-900/20" aria-hidden="true">
        <div className="flex items-center gap-1.5">
          {["bg-rose-400", "bg-amber-400", "bg-emerald-400"].map((c) => (
            <span key={c} className={`size-2.5 rounded-full ${c}`} />
          ))}
          <span className="ml-3 rounded-md bg-white/5 px-3 py-1 text-[10px] text-white/40">
            codernatix.app
          </span>
        </div>

        <div className="mt-6 space-y-3">
          {bars.map((w, i) => (
            <div key={i} className="h-2.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-blue-light"
                animate={reduce ? { width: `${w}%` } : { width: ["0%", `${w}%`, `${w}%`, "0%"] }}
                transition={{ duration: 6.5, delay: i * 0.5, repeat: Infinity, times: [0, 0.3, 0.85, 1], ease: "easeInOut" }}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-16 rounded-lg border border-white/10 bg-white/[0.04]"
            />
          ))}
        </div>

        <motion.span
          className="mt-5 inline-block h-4 w-[2px] bg-brand-blue-light"
          animate={reduce ? undefined : { opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

export default function OurStorySection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="our-story"
      aria-labelledby="story-heading"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className={`${WRAP} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
        <div>
          <SectionHead
            align="left"
            id="story-heading"
            label="Our Story"
            title="Technology That Solves"
            highlight="Real Problems"
          />
          <div className="mt-7 space-y-5">
            {PARAGRAPHS.map((p, i) => (
              <Reveal
                key={i}
                as="p"
                delay={0.1 * i}
                className="text-base leading-8 text-brand-gray-600"
              >
                {p}
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal y={40}>
          <StoryVisual reduce={reduce} />
        </Reveal>
      </div>
    </section>
  );
}