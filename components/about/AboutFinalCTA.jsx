"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WRAP, SectionLabel, Reveal } from "./AboutShared";

export default function AboutFinalCTA() {
  const reduce = useReducedMotion();

  return (
    <section
      id="about-cta"
      aria-labelledby="about-cta-heading"
      className="relative overflow-hidden bg-brand-gray-50 py-16 sm:py-20 lg:py-24"
    >
      <div className={WRAP}>
        <Reveal y={40}>
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-black px-6 py-14 text-center text-white sm:px-12 sm:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 tech-grid opacity-20" />
            <motion.div
              aria-hidden="true"
              animate={reduce ? undefined : { x: [0, 40, -20, 0], y: [0, 24, -12, 0], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand-blue/30 blur-3xl"
            />
            <motion.div
              aria-hidden="true"
              animate={reduce ? undefined : { x: [0, -34, 16, 0], y: [0, -20, 12, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"
            />

            <div className="relative mx-auto max-w-2xl">
              <div className="flex justify-center">
                <SectionLabel dark center>
                  Let&apos;s Talk
                </SectionLabel>
              </div>

              <h2
                id="about-cta-heading"
                className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
              >
                Have an Idea in{" "}
                <span className="bg-gradient-to-r from-blue-400 via-sky-200 to-blue-400 bg-clip-text text-transparent">
                  Mind?
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                Let&apos;s discuss your goals and explore how the right digital
                solution could help bring your idea to life.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="group relative inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold !text-white shadow-lg shadow-brand-blue/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-blue-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300 sm:w-auto"
                >
                  {!reduce && (
                    <motion.span
                      aria-hidden="true"
                      initial={{ x: "-150%" }}
                      animate={{ x: "450%" }}
                      transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
                      className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  )}
                  <MessageCircle size={18} aria-hidden="true" className="relative" />
                  <span className="relative">Discuss Your Project</span>
                  <motion.span
                    aria-hidden="true"
                    animate={reduce ? undefined : { x: [0, 4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
                    className="relative inline-flex"
                  >
                    <ArrowRight size={17} />
                  </motion.span>
                </Link>

                <Link
                  href="/services"
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300 sm:w-auto"
                >
                  Explore Services
                  <ArrowRight size={17} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}