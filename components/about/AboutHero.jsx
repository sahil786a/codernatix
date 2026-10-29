"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { AnimatedWords, FadeBlur } from "@/components/home/SolutionAnimation";
import { EASE, WRAP, SectionLabel } from "./AboutShared";

const STEPS = ["Idea", "Plan", "Build", "Launch"];

function HeroVisual({ reduce }) {
  const [active, setActive] = useState(reduce ? STEPS.length - 1 : 0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 1800);
    return () => clearInterval(t);
  }, [reduce]);

  const chip =
    "absolute z-20 hidden items-center gap-1.5 rounded-xl border border-brand-gray-200 bg-white px-3 py-2 text-[11px] font-semibold text-brand-gray-700 shadow-lg sm:inline-flex";

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: EASE }}
      className="relative mx-auto w-full max-w-[460px] py-10"
    >
      {/* rings */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite] rounded-full border border-brand-blue/15 motion-reduce:animate-none">
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-blue shadow-[0_0_12px_3px_rgba(37,99,235,0.45)]" />
        </div>
        <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 animate-[spin_34s_linear_infinite_reverse] rounded-full border border-dashed border-brand-blue/20 motion-reduce:animate-none">
          <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-violet-400" />
        </div>
      </div>

      {/* floating chips */}
      <motion.span
        aria-hidden="true"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
        className={`${chip} -left-2 top-6 lg:-left-6`}
      >
        <span className="size-1.5 rounded-full bg-brand-blue" /> Practical
      </motion.span>
      <motion.span
        aria-hidden="true"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 5.2, delay: 0.7, repeat: Infinity, ease: "easeInOut" }}
        className={`${chip} -right-2 top-1/3 lg:-right-6`}
      >
        <span className="size-1.5 rounded-full bg-emerald-500" /> Reliable
      </motion.span>
      <motion.span
        aria-hidden="true"
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 4.8, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
        className={`${chip} -left-2 bottom-8 lg:-left-4`}
      >
        <span className="size-1.5 rounded-full bg-violet-500" /> Maintainable
      </motion.span>

      {/* main card */}
      <div className="relative z-10 rounded-3xl border border-brand-gray-200 bg-white p-6 shadow-2xl shadow-slate-900/10">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-xl bg-brand-gray-50 p-1.5 ring-1 ring-brand-gray-200">
            <Image
              src="/images/logo/codernatix-logo.png"
              alt=""
              width={40}
              height={40}
              style={{ height: 34, width: "auto", maxWidth: 40 }}
            />
          </span>
          <div>
            <p className="font-brand text-sm font-bold uppercase tracking-[0.06em] text-brand-black">
              Codernatix
            </p>
            <p className="text-xs text-brand-gray-500">From idea to useful product</p>
          </div>
        </div>

        <div className="mt-6 space-y-2.5" aria-hidden="true">
          {[88, 64, 76].map((w, i) => (
            <div key={i} className="h-2 overflow-hidden rounded-full bg-brand-gray-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-blue-light"
                animate={reduce ? { width: `${w}%` } : { width: ["0%", `${w}%`, `${w}%`, "0%"] }}
                transition={{ duration: 7, delay: i * 0.4, repeat: Infinity, times: [0, 0.3, 0.85, 1], ease: "easeInOut" }}
              />
            </div>
          ))}
        </div>

        <ol className="mt-7 grid grid-cols-4 gap-2" aria-label="How an idea becomes a product">
          {STEPS.map((s, i) => (
            <li key={s} className="flex flex-col items-center gap-2">
              <motion.span
                animate={{ scale: i === active ? 1.14 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className={`flex size-9 items-center justify-center rounded-full border text-xs font-bold transition-colors duration-500 ${
                  i <= active
                    ? "border-brand-blue bg-brand-blue text-white"
                    : "border-brand-gray-200 bg-white text-brand-gray-400"
                }`}
              >
                {i < active ? <Check size={14} strokeWidth={3} /> : i + 1}
              </motion.span>
              <span
                className={`text-[11px] font-semibold transition-colors duration-500 ${
                  i <= active ? "text-brand-black" : "text-brand-gray-400"
                }`}
              >
                {s}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-5 h-1 overflow-hidden rounded-full bg-brand-gray-100" aria-hidden="true">
          <motion.div
            className="h-full rounded-full bg-brand-blue"
            animate={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.7, ease: EASE }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutHero() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="about-heading" className="relative overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(0,0,0,0.10)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]"
      />
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, 30, -10, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, -24, 12, 0], y: [0, -16, 10, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-24 -left-32 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl"
      />

      <div
        className={`${WRAP} grid min-h-[calc(100svh-76px)] items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-20`}
      >
        <div className="text-center lg:text-left">
          <SectionLabel>About Codernatix</SectionLabel>

          <h1
            id="about-heading"
            className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-brand-black sm:text-5xl lg:text-6xl"
          >
            <AnimatedWords text="Turning Ideas Into" delay={0.25} />
            <br className="hidden sm:block" />{" "}
            <AnimatedWords
              text="Meaningful Digital Solutions"
              delay={0.6}
              shimmer
              className="bg-gradient-to-r from-brand-blue via-brand-blue-light to-brand-blue bg-clip-text text-transparent"
            />
          </h1>

          <FadeBlur
            as="p"
            delay={1.0}
            className="mx-auto mt-6 max-w-xl text-base leading-8 text-brand-gray-600 lg:mx-0"
          >
            Codernatix is a technology-focused brand dedicated to building
            practical digital solutions that help businesses turn ideas into
            useful products. Our focus is on understanding real problems and
            developing solutions with clarity, usability and long-term value in
            mind.
          </FadeBlur>

          <FadeBlur
            delay={1.2}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <Link
              href="/services"
              className="group relative inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-black px-6 py-3 text-sm font-semibold !text-white shadow-lg shadow-brand-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue sm:w-auto"
            >
              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  initial={{ x: "-150%" }}
                  animate={{ x: "450%" }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
                  className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                />
              )}
              <span className="relative">Explore Our Services</span>
              <ArrowRight size={17} aria-hidden="true" className="relative transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-brand-gray-200 bg-white px-6 py-3 text-sm font-semibold text-brand-black transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/40 hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue sm:w-auto"
            >
              Let&apos;s Talk
            </Link>
          </FadeBlur>
        </div>

        <HeroVisual reduce={reduce} />
      </div>
    </section>
  );
}