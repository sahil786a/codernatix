"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import NotchedProjectCard from "../ui/NotchedProjectCard";
import { services } from "../../data/services";
import {
  SectionReveal,
  FloatingGlow,
  PulseBadge,
  AnimatedWords,
  ShimmerText,
  AnimatedUnderline,
  FadeBlur,
  NudgeArrow,
} from "./ServicesAnimated";

const EASE = [0.22, 1, 0.36, 1];

// Home par kitni services dikhani hain (4 columns x 2 rows)
const HOME_SERVICES_COUNT = 8;
// Services page ban jaye to bas ye route sahi hona chahiye
const ALL_SERVICES_HREF = "/services";

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardIn = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
};

export default function ServicesSection() {
  const visibleServices = services.slice(0, HOME_SERVICES_COUNT);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-white"
    >
      <SectionReveal className="py-16 lg:py-24">
        <FloatingGlow />

        <div className="relative mx-auto w-full max-w-[1320px] px-5 sm:px-8">
          {/* HEADER */}
          <div className="mx-auto max-w-2xl text-center">
            {/* old: <span className="inline-flex ...">What We Do</span> */}
            <PulseBadge>What We Do</PulseBadge>

            <h2
              id="services-heading"
              className="mt-4 text-3xl font-bold leading-tight tracking-tight text-brand-black sm:text-4xl xl:text-5xl"
            >
              <AnimatedWords text="Services Built Around Your" delay={0.25} />{" "}
              <span className="relative inline-block whitespace-nowrap">
                <ShimmerText className="bg-gradient-to-r from-brand-blue to-brand-blue-light bg-clip-text text-transparent">
                  Business
                </ShimmerText>
                <AnimatedUnderline className="absolute -bottom-2 left-0 h-2.5 w-full text-brand-blue/40" />
              </span>
            </h2>

            <FadeBlur
              as="p"
              delay={0.9}
              className="mt-5 text-base leading-7 text-brand-gray-600"
            >
              From strategy and design to engineering and support, everything you
              need to build, launch and scale.
            </FadeBlur>
          </div>

          {/* CARDS: 1 col mobile, 2 tablet, 4 desktop */}
          <motion.div
            variants={grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
          >
            {visibleServices.map((service, index) => (
              <motion.div
                key={service.id}
                variants={cardIn}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <NotchedProjectCard
                  href={service.href}
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  imageAlt={service.title}
                  badge={String(index + 1).padStart(2, "0")}
                  tags={service.tags}
                  monochrome
                  surface="#ffffff"
                  accent="var(--blue)"
                  accentForeground="#ffffff"
                  idleDelay={index * 0.35}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* SHOW MORE */}
          <FadeBlur delay={0.2} className="mt-14 flex justify-center">
            <Link
              href={ALL_SERVICES_HREF}
              className="group inline-flex items-center gap-2 text-base font-semibold text-brand-black transition-colors hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
            >
              <span className="relative">
                Show more services
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brand-blue transition-transform duration-300 group-hover:scale-x-100"
                />
              </span>
              <NudgeArrow>
                <ArrowRight size={18} />
              </NudgeArrow>
            </Link>
          </FadeBlur>
        </div>
      </SectionReveal>
    </section>
  );
}