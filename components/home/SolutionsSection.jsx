"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Rocket,
  Building2,
  Network,
  GraduationCap,
  ShoppingBag,
  BriefcaseBusiness,
} from "lucide-react";

import { solutions } from "@/data/solutions";
import {
  SectionReveal,
  FloatingGlow,
  CarouselGlow,
  Eyebrow,
  AnimatedWords,
  FadeBlur,
  CarouselReveal,
  ShineLink,
} from "./SolutionAnimation";

const ICONS = {
  rocket: Rocket,
  building: Building2,
  network: Network,
  graduation: GraduationCap,
  shopping: ShoppingBag,
  briefcase: BriefcaseBusiness,
};

const CARD_WIDTH = 154;
const CARD_GAP = 24;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const SPEED = 38;

function SolutionCard({ solution, index, offset, totalWidth, viewportWidth }) {
  const Icon = ICONS[solution.icon];

  const position = useTransform(offset, (value) => {
    const raw = index * CARD_STEP - value;
    const wrapped = ((raw + totalWidth / 2) % totalWidth + totalWidth) % totalWidth;
    return wrapped - totalWidth / 2;
  });

  const x = useTransform(position, (value) => viewportWidth / 2 + value - CARD_WIDTH / 2);

  const normalized = useTransform(position, (value) => {
    const maxDistance = Math.max(viewportWidth / 2, 1);
    return Math.max(-1, Math.min(1, value / maxDistance));
  });

  const y = useTransform(normalized, (value) => Math.pow(Math.abs(value), 1.7) * 100);
  const rotate = useTransform(normalized, (value) => value * 19);
  const scale = useTransform(normalized, (value) => 1 - Math.abs(value) * 0.23);
  const opacity = useTransform(normalized, (value) => 1 - Math.abs(value) * 0.2);
  const zIndex = useTransform(normalized, (value) => Math.round(100 - Math.abs(value) * 50));

  return (
    <motion.article
      style={{ x, y, rotate, scale, opacity, zIndex, width: CARD_WIDTH }}
      className="absolute left-0 top-1/2 -mt-[112px] will-change-transform"
    >
      <Link
        href={solution.href}
        aria-label={`${solution.title}: ${solution.description}`}
        className="group flex h-[224px] flex-col rounded-2xl border border-white/10 bg-[#15191d] p-5 text-white shadow-[0_20px_55px_rgba(0,0,0,0.3)] transition-colors duration-300 hover:border-blue-400/60 hover:bg-[#1c2229] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
      >
        <div className="flex items-center justify-between gap-3">
          {/* icon: infinite ping ring (NEW) */}
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-xl border border-blue-400/40 opacity-0 motion-safe:animate-[ping_3.2s_cubic-bezier(0,0,0.2,1)_infinite]"
              style={{ animationDelay: `${(index % 6) * 0.5}s` }}
            />
            {Icon && <Icon size={22} strokeWidth={1.7} aria-hidden="true" />}
          </span>

          <ArrowUpRight
            size={19}
            className="text-white/50 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-300"
            aria-hidden="true"
          />
        </div>

        <h3 className="mt-6 text-base font-semibold leading-6">{solution.title}</h3>

        <p className="mt-2 line-clamp-3 text-xs leading-5 text-white/60">
          {solution.description}
        </p>

        <span className="mt-auto pt-3 text-xs font-semibold text-blue-300">
          Explore solution
        </span>
      </Link>
    </motion.article>
  );
}

export default function SolutionsSection() {
  const viewportRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(1200);
  const [paused, setPaused] = useState(false);
  const offset = useMotionValue(0);

  // FIX: loop ki lambai screen ke hisab se. Ab beech me khali jagah nahi aayegi.
  const count = solutions.length;
  const setWidth = count * CARD_STEP;
  const repeats = setWidth
    ? Math.max(1, Math.ceil((viewportWidth + CARD_STEP * 4) / setWidth))
    : 1;
  const loopWidth = setWidth * repeats;

  const repeatedSolutions = useMemo(
    () =>
      Array.from({ length: repeats }, (_, r) =>
        solutions.map((solution, i) => ({
          ...solution,
          sliderKey: `${solution.id}-${r}-${i}`,
        }))
      ).flat(),
    [repeats]
  );

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setViewportWidth(entry.contentRect.width);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (paused || count === 0) return;
    const distance = (SPEED * Math.min(delta, 50)) / 1000;
    offset.set((offset.get() + distance) % loopWidth);
  });

  return (
    <section
      id="solutions"
      aria-labelledby="solutions-heading"
      className="relative overflow-hidden bg-[#090b0e] text-white"
    >
      <SectionReveal className="py-20 sm:py-24 lg:py-28">
        <FloatingGlow />

        <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* old: <span className="inline-flex ...">Who We Serve</span> */}
            <Eyebrow>Who We Serve</Eyebrow>

            <h2
              id="solutions-heading"
              className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              <AnimatedWords text="Digital Solutions for" delay={0.25} />{" "}
              <AnimatedWords
                text="Every Stage of Growth"
                delay={0.7}
                shimmer
                className="bg-gradient-to-r from-blue-500 via-sky-300 to-blue-500 bg-clip-text text-transparent"
              />
            </h2>

            <FadeBlur
              as="p"
              delay={1.1}
              className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/60"
            >
              Different businesses have different challenges. We help you
              identify the right technology approach for your needs and goals.
            </FadeBlur>
          </div>
        </div>

        <CarouselReveal className="relative mt-14 sm:mt-16">
          <div
            ref={viewportRef}
            className="relative h-[340px] w-full overflow-hidden sm:h-[370px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setPaused(false);
              }
            }}
          >
            <CarouselGlow />

            <div className="pointer-events-none absolute inset-y-0 left-0 z-[110] w-[15%] bg-gradient-to-r from-[#090b0e] via-[#090b0e]/80 to-transparent backdrop-blur-[2px]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-[110] w-[15%] bg-gradient-to-l from-[#090b0e] via-[#090b0e]/80 to-transparent backdrop-blur-[2px]" />

            {repeatedSolutions.map((solution, index) => (
              <SolutionCard
                key={solution.sliderKey}
                solution={solution}
                index={index}
                offset={offset}
                totalWidth={loopWidth}
                viewportWidth={viewportWidth}
              />
            ))}
          </div>
        </CarouselReveal>

        <div className="relative mt-3 text-center">
          <FadeBlur as="p" className="text-xs text-white/40">
            Hover over the cards to pause the slider
          </FadeBlur>

          <div className="mt-6">
            <ShineLink href="/contact">Discuss Your Requirements</ShineLink>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}