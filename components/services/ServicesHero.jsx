"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { AnimatedWords, FadeBlur } from "@/components/home/SolutionAnimation";
import { WRAP } from "@/lib/ui";

/*
 * Listing hero. Count comes from the real services array (passed as a number),
 * so there are no made-up stats. Background: white.
 */
export default function ServicesHero({ count = 0 }) {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="services-hero-heading"
      className="relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 85% 10%, #2563eb1f, transparent 70%), radial-gradient(45% 45% at 5% 95%, #2563eb14, transparent 70%)",
          }}
        />
        <motion.div
          animate={reduce ? undefined : { opacity: [0.35, 0.7, 0.35], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-24 top-6 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl"
        />
      </div>

      <div className={`${WRAP} py-14 sm:py-20 lg:py-24`}>
        <div className="max-w-3xl">
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
              <li aria-current="page" className="font-medium text-brand-black">
                Services
              </li>
            </ol>
          </FadeBlur>

          <h1
            id="services-hero-heading"
            className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-brand-black sm:text-5xl lg:text-6xl"
          >
            <AnimatedWords text="Technology Services for" delay={0.15} />{" "}
            <AnimatedWords
              text="Growing Businesses"
              delay={0.5}
              shimmer
              className="bg-gradient-to-r from-brand-blue to-brand-blue-light bg-clip-text text-transparent"
            />
          </h1>

          <FadeBlur
            as="p"
            delay={0.8}
            className="mt-5 max-w-2xl text-base leading-7 text-brand-gray-600 sm:text-lg"
          >
            From software and websites to cloud, security and marketing,
            explore what we can build and support for your business.
          </FadeBlur>

          {count > 0 && (
            <FadeBlur as="p" delay={0.95} className="mt-6 text-sm font-semibold text-brand-blue">
              {count} services, one team
            </FadeBlur>
          )}
        </div>
      </div>
    </section>
  );
}
