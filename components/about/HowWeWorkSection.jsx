"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Blocks, Rocket, ShieldCheck, Target } from "lucide-react";
import { WRAP, SectionHead, Reveal } from "./AboutShared";

const PRINCIPLES = [
  { title: "Requirement-first thinking", text: "We start by understanding what you need, who it's for and what constraints apply, before choosing tools or writing code.", Icon: Target, chips: ["Goals", "Users", "Constraints"] },
  { title: "Plan before building", text: "A clear scope and technical direction keep the project focused and make changes easier to discuss.", Icon: Blocks, chips: ["Scope", "Technology", "Priorities"] },
  { title: "Build and validate", text: "Features are built and checked along the way, so issues surface early instead of at the end.", Icon: ShieldCheck, chips: ["Build", "Review", "Test"] },
  { title: "Think beyond launch", text: "We consider documentation and maintenance, so the product can keep evolving after it goes live.", Icon: Rocket, chips: ["Documentation", "Maintenance", "Growth"] },
];

function PrincipleVisual({ Icon, index, chips, reduce }) {
  const pos = ["left-4 top-5", "right-4 top-1/2", "left-6 bottom-5"];
  return (
    <div className="relative aspect-[5/3] overflow-hidden rounded-3xl border border-brand-gray-200 bg-gradient-to-br from-blue-50 via-white to-violet-50">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 right-4 select-none text-[9rem] font-bold leading-none"
        style={{ color: "transparent", WebkitTextStroke: "1px rgba(37,99,235,0.18)" }}
      >
        0{index + 1}
      </span>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex size-24 items-center justify-center">
          <span className="absolute inset-[-14px] animate-[spin_16s_linear_infinite] rounded-full border border-dashed border-brand-blue/30 motion-reduce:animate-none" />
          <span className="flex size-20 items-center justify-center rounded-2xl bg-white text-brand-blue shadow-lg ring-1 ring-brand-gray-200">
            <Icon size={34} strokeWidth={1.6} aria-hidden="true" />
          </span>
        </div>
      </div>

      {chips.map((c, i) => (
        <motion.span
          key={c}
          aria-hidden="true"
          animate={reduce ? undefined : { y: [0, i % 2 ? 6 : -6, 0] }}
          transition={{ duration: 4 + i * 0.6, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute ${pos[i]} rounded-lg border border-brand-gray-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-brand-gray-600 shadow-sm`}
        >
          {c}
        </motion.span>
      ))}
    </div>
  );
}

export default function HowWeWorkSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="how-we-work"
      aria-labelledby="how-heading"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className={WRAP}>
        <SectionHead
          id="how-heading"
          label="How We Work"
          title="Our Development"
          highlight="Philosophy"
          description="Four ideas that shape how we collaborate on every project."
        />

        <div className="mt-14 space-y-14 lg:mt-20 lg:space-y-20">
          {PRINCIPLES.map(({ title, text, Icon, chips }, i) => (
            <div key={title} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
              <Reveal x={i % 2 ? 40 : -40} y={0} className={i % 2 ? "md:order-2" : ""}>
                <PrincipleVisual Icon={Icon} index={i} chips={chips} reduce={reduce} />
              </Reveal>
              <Reveal x={i % 2 ? -40 : 40} y={0} delay={0.1}>
                <p className="text-sm font-bold tracking-widest text-brand-blue">0{i + 1}</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-brand-black sm:text-3xl">
                  {title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-8 text-brand-gray-600">{text}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}