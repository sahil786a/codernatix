"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Blocks, ClipboardList, Handshake, Layers3, MessageCircle } from "lucide-react";
import { WRAP, SectionHead, Reveal } from "./AboutShared";

const ITEMS = [
  { title: "Clear project scope", text: "We define what is being built, and what isn't, before work begins.", Icon: ClipboardList },
  { title: "Practical technology choices", text: "Tools are chosen to fit your requirements, not to follow trends.", Icon: Blocks },
  { title: "Direct communication", text: "Straightforward conversations and clear updates throughout the project.", Icon: MessageCircle },
  { title: "Maintainable solutions", text: "Code and structure are organised so the product can be improved and extended later.", Icon: Layers3 },
  { title: "Support in line with scope", text: "Collaboration and ongoing support can be agreed based on what your project needs.", Icon: Handshake },
];

export default function DifferenceSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="why-different"
      aria-labelledby="different-heading"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className={`${WRAP} grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            align="left"
            id="different-heading"
            label="Working With Us"
            title="What Makes Codernatix"
            highlight="Different"
            description="No big promises, just a practical way of working that is easy to understand and easy to hold us to."
          />
          <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-black transition-colors hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
            >
              Our services
              <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-black transition-colors hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
            >
              Talk to us
              <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <ul className="relative">
          <span aria-hidden="true" className="absolute bottom-8 left-6 top-8 w-px bg-brand-gray-200" />
          {ITEMS.map(({ title, text, Icon }, i) => (
            <Reveal key={title} as="li" delay={i * 0.08} x={30} y={0} className="relative pb-6 last:pb-0">
              <div className="group relative flex gap-5 rounded-2xl p-1 transition-colors duration-300">
                <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-brand-blue/20 bg-white text-brand-blue shadow-sm transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white">
                  {!reduce && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border-2 border-brand-blue/30"
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 2.8, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <Icon size={20} strokeWidth={1.9} aria-hidden="true" className="relative" />
                </span>
                <div className="rounded-2xl border border-brand-gray-200 bg-white p-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-brand-blue/30 group-hover:shadow-lg group-hover:shadow-slate-900/[0.05] sm:flex-1">
                  <h3 className="text-base font-bold text-brand-black sm:text-lg">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-brand-gray-500">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}