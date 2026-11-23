"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import {
  AnimatedWords,
  Eyebrow,
  FadeBlur,
  SectionReveal,
} from "@/components/home/SolutionAnimation";
import { WRAP } from "@/lib/ui";

/*
 * Service hero. `children` is the service visual (rendered by the server
 * template), so only the chosen visual ships to the client.
 */
export default function ServiceHero({ service, children }) {
  const reduce = useReducedMotion();
  const accent = service.accent || "#2563eb";
  const tags = service.tags || [];

  return (
    <section
      aria-labelledby="service-hero-heading"
      className="relative overflow-hidden bg-white"
      style={{ "--svc-accent": accent }}
    >
      {/* accent-tinted background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(60% 55% at 85% 15%, ${accent}1f, transparent 70%), radial-gradient(45% 45% at 5% 90%, ${accent}14, transparent 70%)`,
          }}
        />
        <motion.div
          animate={reduce ? undefined : { opacity: [0.35, 0.7, 0.35], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-24 top-10 h-80 w-80 rounded-full blur-3xl"
          style={{ background: `${accent}33` }}
        />
      </div>

      <div className={`${WRAP} grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-24`}>
        {/* TEXT */}
        <div className="min-w-0">
          <FadeBlur as="nav" delay={0.05}>
            <ol
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-[13px] text-brand-gray-500"
            >
              <li>
                <Link href="/" className="transition-colors hover:text-brand-black">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li>
                <Link href="/services" className="transition-colors hover:text-brand-black">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li aria-current="page" className="font-medium text-brand-black">
                {service.title}
              </li>
            </ol>
          </FadeBlur>

          <h1
            id="service-hero-heading"
            className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-brand-black sm:text-5xl lg:text-6xl"
          >
            <AnimatedWords text={service.headline} delay={0.15} />{" "}
            <AnimatedWords
              text={service.highlight}
              delay={0.45}
              shimmer
              className="bg-gradient-to-r from-[var(--svc-accent)] to-brand-blue bg-clip-text text-transparent"
            />
          </h1>

          <FadeBlur
            as="p"
            delay={0.7}
            className="mt-5 max-w-xl text-base leading-7 text-brand-gray-600 sm:text-lg"
          >
            {service.intro}
          </FadeBlur>

          {tags.length > 0 && (
            <FadeBlur as="ul" delay={0.85} className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border px-3 py-1 text-[12px] font-semibold"
                  style={{ borderColor: `${accent}40`, background: `${accent}12`, color: accent }}
                >
                  {tag}
                </li>
              ))}
            </FadeBlur>
          )}

          <FadeBlur delay={1} className="mt-8 flex flex-wrap items-center gap-4">
            <Link
  href="/contact"
  className="inline-flex items-center justify-center rounded-xl border-2 border-brand-blue bg-gradient-to-r from-brand-blue to-brand-blue-light px-6 py-3 text-[15px] font-semibold text-white shadow-lg shadow-brand-blue/25 transition-all duration-300 hover:border-brand-black hover:bg-white hover:bg-none hover:text-brand-black hover:shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
>
  Discuss Your Project
</Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-[15px] font-semibold text-brand-black transition-colors hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
            >
              All Services
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </FadeBlur>
        </div>

        {/* VISUAL (decorative) */}
        <div aria-hidden="true" className="mx-auto w-full max-w-[460px] lg:max-w-none">
          <FadeBlur delay={0.3}>{children}</FadeBlur>
        </div>
      </div>
    </section>
  );
}