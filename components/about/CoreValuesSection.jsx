"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eye, GraduationCap, Handshake, Lightbulb, ShieldCheck } from "lucide-react";
import { WRAP, SectionHead, Reveal } from "./AboutShared";

const TONES = {
  blue: { tile: "bg-blue-50 text-blue-600 ring-blue-100", hover: "group-hover:bg-blue-600 group-hover:text-white", num: "text-blue-600", bar: "bg-blue-600", border: "hover:border-blue-200" },
  violet: { tile: "bg-violet-50 text-violet-600 ring-violet-100", hover: "group-hover:bg-violet-600 group-hover:text-white", num: "text-violet-600", bar: "bg-violet-600", border: "hover:border-violet-200" },
  cyan: { tile: "bg-cyan-50 text-cyan-700 ring-cyan-100", hover: "group-hover:bg-cyan-600 group-hover:text-white", num: "text-cyan-700", bar: "bg-cyan-600", border: "hover:border-cyan-200" },
  amber: { tile: "bg-amber-50 text-amber-600 ring-amber-100", hover: "group-hover:bg-amber-500 group-hover:text-white", num: "text-amber-600", bar: "bg-amber-500", border: "hover:border-amber-200" },
  emerald: { tile: "bg-emerald-50 text-emerald-600 ring-emerald-100", hover: "group-hover:bg-emerald-600 group-hover:text-white", num: "text-emerald-600", bar: "bg-emerald-600", border: "hover:border-emerald-200" },
};

const VALUES = [
  { title: "Collaboration", text: "Working together on requirements and feedback, so the solution reflects what you actually need.", Icon: Handshake, tone: "blue", span: "lg:col-span-3", big: true },
  { title: "Quality & Reliability", text: "Testing, usability and maintainability are part of the build, not an afterthought.", Icon: ShieldCheck, tone: "violet", span: "lg:col-span-3", big: true },
  { title: "Practical Innovation", text: "Choosing technology that fits the problem, rather than following trends.", Icon: Lightbulb, tone: "cyan", span: "lg:col-span-2" },
  { title: "Transparency", text: "Keeping scope, estimates and changes clear throughout the project.", Icon: Eye, tone: "amber", span: "lg:col-span-2" },
  { title: "Continuous Learning", text: "Improving our skills and practices as technology and needs evolve.", Icon: GraduationCap, tone: "emerald", span: "sm:col-span-2 lg:col-span-2" },
];

export default function CoreValuesSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="core-values"
      aria-labelledby="values-heading"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className={WRAP}>
        <SectionHead
          id="values-heading"
          label="What We Believe"
          title="The Principles Behind"
          highlight="Our Work"
          description="These are the working principles we aim to bring to every project."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-6">
          {VALUES.map(({ title, text, Icon, tone, span, big }, i) => {
            const t = TONES[tone];
            return (
              <Reveal key={title} as="article" delay={i * 0.08} className={span}>
                <div
                  className={`group relative h-full overflow-hidden rounded-2xl border border-brand-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/[0.06] ${t.border} ${
                    big ? "p-7 sm:p-8" : "p-6 sm:p-7"
                  }`}
                >
                  {big && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-2 -top-4 select-none text-[7rem] font-bold leading-none"
                      style={{ color: "transparent", WebkitTextStroke: "1px rgba(15,23,42,0.07)" }}
                    >
                      0{i + 1}
                    </span>
                  )}

                  <div className="relative flex items-start justify-between gap-4">
                    <motion.span
                      animate={reduce ? undefined : { y: [0, -4, 0] }}
                      transition={{ duration: 3.6, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                      className={`flex size-12 items-center justify-center rounded-xl ring-1 transition-colors duration-300 ${t.tile} ${t.hover}`}
                    >
                      <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
                    </motion.span>
                    {!big && (
                      <span className={`text-sm font-bold tracking-widest ${t.num}`}>
                        0{i + 1}
                      </span>
                    )}
                  </div>

                  <h3 className={`relative mt-6 font-bold tracking-tight text-brand-black ${big ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`}>
                    {title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-7 text-brand-gray-500">{text}</p>

                  <span
                    aria-hidden="true"
                    className={`relative mt-6 block h-1 w-10 rounded-full opacity-40 transition-all duration-300 group-hover:w-20 group-hover:opacity-100 ${t.bar}`}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}