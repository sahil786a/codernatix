"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ClipboardList, Code2, Palette, Search, ShieldCheck, TrendingUp } from "lucide-react";
import { EASE, WRAP, SectionHead, Reveal } from "./AboutShared";

const STEPS = [
  { title: "Understand", text: "Learning the goals, users and problem before proposing anything.", Icon: Search },
  { title: "Plan", text: "Defining scope, requirements and the technology that fits.", Icon: ClipboardList },
  { title: "Design", text: "Shaping user flows and the interface direction.", Icon: Palette },
  { title: "Develop", text: "Building the agreed features step by step.", Icon: Code2 },
  { title: "Test", text: "Verifying functionality and usability before release.", Icon: ShieldCheck },
  { title: "Improve", text: "Refining the product based on feedback.", Icon: TrendingUp },
];

export default function OurApproachSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="our-approach"
      aria-labelledby="approach-heading"
      className="relative overflow-hidden bg-brand-gray-50 py-16 sm:py-20 lg:py-24"
    >
      <div className={WRAP}>
        <SectionHead
          id="approach-heading"
          label="What We Do"
          title="We Start With the Problem,"
          highlight="Not a Service List"
          description="Every project follows a practical, step-by-step approach, from understanding the need to improving the result."
        />

        <div className="relative mt-14 lg:mt-20">
          {/* mobile: vertical line */}
          <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-px bg-brand-gray-200 lg:hidden" />

          {/* desktop: horizontal line (draw + travelling dot) */}
          <span aria-hidden="true" className="absolute left-[8.33%] right-[8.33%] top-6 hidden h-px lg:block">
            <motion.span
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 1.4, ease: EASE }}
              className="absolute inset-0 origin-left bg-gradient-to-r from-brand-blue/20 via-brand-blue to-brand-blue/20"
            />
            {!reduce && (
              <motion.span
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue shadow-[0_0_12px_3px_rgba(37,99,235,0.5)]"
              />
            )}
          </span>

          <ol className="space-y-9 lg:grid lg:grid-cols-6 lg:gap-4 lg:space-y-0">
            {STEPS.map(({ title, text, Icon }, i) => (
              <Reveal key={title} as="li" delay={i * 0.1} className="relative pl-16 lg:pl-0 lg:pt-16 lg:text-center">
                <span className="absolute left-0 top-0 z-10 flex size-12 items-center justify-center rounded-full border border-brand-blue/30 bg-white text-brand-blue shadow-sm lg:left-1/2 lg:-translate-x-1/2">
                  {!reduce && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border-2 border-brand-blue/40"
                      animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                      transition={{ duration: 2.6, delay: i * 0.45, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <Icon size={20} strokeWidth={1.9} aria-hidden="true" className="relative" />
                  <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-brand-blue text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                </span>

                <h3 className="text-lg font-bold tracking-tight text-brand-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-gray-500">{text}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-14 flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-black transition-colors hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
          >
            See what we build in detail
            <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}