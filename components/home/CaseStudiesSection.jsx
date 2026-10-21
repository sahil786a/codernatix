"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  ShoppingCart,
  ChartNoAxesCombined,
  ClipboardCheck,
  Code2,
  ExternalLink,
  Check,
} from "lucide-react";

import { projects } from "@/data/projects";
import { SectionReveal, AnimatedWords, FadeBlur } from "./SolutionAnimation";

const EASE = [0.22, 1, 0.36, 1];

const ICONS = {
  shopping: ShoppingCart,
  crm: ChartNoAxesCombined,
  quiz: ClipboardCheck,
};

const PALETTES = [
  {
    key: "orange",
    bg: "linear-gradient(145deg, #fb923c 0%, #ea580c 55%, #9a3412 100%)",
    accent: "#fb923c",
    soft: "#fed7aa",
    ink: "#ea580c",
  },
  {
    key: "violet",
    bg: "linear-gradient(145deg, #a78bfa 0%, #7c3aed 55%, #4c1d95 100%)",
    accent: "#a78bfa",
    soft: "#ddd6fe",
    ink: "#7c3aed",
  },
  {
    key: "emerald",
    bg: "linear-gradient(145deg, #34d399 0%, #059669 55%, #064e3b 100%)",
    accent: "#34d399",
    soft: "#a7f3d0",
    ink: "#059669",
  },
  {
    key: "rose",
    bg: "linear-gradient(145deg, #fb7185 0%, #e11d48 55%, #881337 100%)",
    accent: "#fb7185",
    soft: "#fecdd3",
    ink: "#e11d48",
  },
  {
    key: "sky",
    bg: "linear-gradient(145deg, #38bdf8 0%, #0284c7 55%, #0c4a6e 100%)",
    accent: "#38bdf8",
    soft: "#bae6fd",
    ink: "#0284c7",
  },
];

const pad = (n) => String(n + 1).padStart(2, "0");

/* ---------------------------------------------------------------- */
/* Stack math                                                        */
/* ---------------------------------------------------------------- */

const LO = 0.08;
const HI = 0.92;
const clamp01 = (x) => Math.min(1, Math.max(0, x));

function rangeOf(t, n) {
  const w = (HI - LO) / Math.max(n - 1, 1);
  const a = LO + (t - 1) * w;
  return [a, a + 0.7 * w];
}

function enterOf(p, t, n) {
  if (t <= 0) return 1;
  const [a, b] = rangeOf(t, n);
  return clamp01((p - a) / (b - a));
}

function buriedOf(p, i, n) {
  let sum = 0;
  for (let j = i + 1; j < n; j++) sum += enterOf(p, j, n);
  return sum;
}

function useIsDesktop() {
  const [value, setValue] = useState(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setValue(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return value;
}

/* ---------------------------------------------------------------- */
/* Mockups                                                           */
/* ---------------------------------------------------------------- */

function ShopMock({ theme }) {
  const tints = ["66", "33", "4d", "26"];
  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {tints.map((tint, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.08, duration: 0.5, ease: EASE }}
          >
            <div
              className="aspect-square rounded-lg border border-white/10"
              style={{ background: `linear-gradient(135deg, ${theme.accent}${tint}, transparent)` }}
            />
            <div className="mt-2 h-1.5 w-4/5 rounded-full bg-white/30" />
            <div className="mt-1.5 h-1.5 w-1/2 rounded-full" style={{ background: theme.accent }} />
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-2">
        <div className="space-y-1.5">
          <div className="h-1.5 w-20 rounded-full bg-white/40" />
          <div className="h-1.5 w-12 rounded-full bg-white/15" />
        </div>
        <motion.span
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[10px] font-semibold text-white"
          style={{ background: theme.accent }}
        >
          <ShoppingCart size={11} /> Checkout
        </motion.span>
      </div>
    </div>
  );
}

function CrmMock({ theme }) {
  const areaId = `area-${theme.key}`;
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: EASE }}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-2"
          >
            <div className="h-1.5 w-6 rounded-full" style={{ background: theme.accent }} />
            <div className="mt-2 h-3 w-10 rounded bg-white/25" />
          </motion.div>
        ))}
      </div>
      <div className="mt-2.5 rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
        <svg viewBox="0 0 240 90" className="h-20 w-full">
          <defs>
            <linearGradient id={areaId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={theme.accent} stopOpacity="0.35" />
              <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 70 C 30 60, 50 80, 80 50 S 130 30, 160 36 S 210 10, 240 14 L240 90 L0 90 Z"
            fill={`url(#${areaId})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          />
          <motion.path
            d="M0 70 C 30 60, 50 80, 80 50 S 130 30, 160 36 S 210 10, 240 14"
            fill="none"
            stroke={theme.soft}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 1.4, ease: EASE }}
          />
        </svg>
      </div>
      <div className="mt-2.5 space-y-2">
        {[78, 54, 36].map((w, i) => (
          <div key={i} className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: theme.accent }}
              initial={{ width: 0 }}
              animate={{ width: `${w}%` }}
              transition={{ delay: 0.7 + i * 0.12, duration: 0.9, ease: EASE }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizMock({ theme }) {
  return (
    <div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: theme.accent }}
          initial={{ width: 0 }}
          animate={{ width: "65%" }}
          transition={{ delay: 0.3, duration: 1.1, ease: EASE }}
        />
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-2.5 w-4/5 rounded-full bg-white/70" />
        <div className="h-2 w-3/5 rounded-full bg-white/25" />
      </div>
      <div className="mt-3 space-y-1.5">
        {[0, 1, 2, 3].map((i) => {
          const picked = i === 1;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.09, duration: 0.5, ease: EASE }}
              className="flex items-center gap-2.5 rounded-lg border bg-white/[0.03] p-2"
              style={{ borderColor: picked ? `${theme.accent}99` : "rgba(255,255,255,0.1)" }}
            >
              <span
                className="flex h-4 w-4 items-center justify-center rounded-full border border-white/20"
                style={picked ? { background: theme.accent, borderColor: theme.accent } : undefined}
              >
                {picked && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.3, type: "spring", stiffness: 300, damping: 14 }}
                    className="flex"
                  >
                    <Check size={10} className="text-white" strokeWidth={3} />
                  </motion.span>
                )}
              </span>
              <div className="h-1.5 flex-1 rounded-full bg-white/25" style={{ maxWidth: `${60 + i * 8}%` }} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function Mockup({ project, theme }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0b0e13]/90 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur">
      <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/20" />
          ))}
        </div>
        <div className="flex-1 truncate rounded-md bg-white/5 px-2.5 py-0.5 text-[10px] text-white/40">
          {project.slug}.app
        </div>
      </div>
      <div className="p-3.5">
        {project.icon === "shopping" && <ShopMock theme={theme} />}
        {project.icon === "quiz" && <QuizMock theme={theme} />}
        {project.icon !== "shopping" && project.icon !== "quiz" && <CrmMock theme={theme} />}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Card surface                                                      */
/* ---------------------------------------------------------------- */

function CardSurface({ project, index, palette, reduce, play }) {
  const Icon = ICONS[project.icon] || Code2;
  const float = (duration, delay = 0, dist = 6) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -dist, 0] },
          transition: { duration, delay, repeat: Infinity, ease: "easeInOut" },
        };

  return (
    <div
      className="absolute inset-0 isolate transform-gpu overflow-hidden rounded-3xl"
      style={{ background: palette.bg }}
    >
      {/* subtle dots */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />
      {/* soft glow blobs (kept inside the card) */}
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, 24, -8, 0], y: [0, 16, -8, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, -20, 10, 0], y: [0, -12, 8, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-black/20 blur-3xl"
      />

      {/* outlined index number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 left-4 select-none text-[4.5rem] font-bold leading-none sm:text-[6.5rem]"
        style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.28)" }}
      >
        {pad(index)}
      </span>

      {/* top chips */}
      <div className="absolute inset-x-4 top-4 z-20 flex items-center justify-between sm:inset-x-6 sm:top-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur sm:text-[11px]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70 motion-reduce:animate-none" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          {project.category}
        </span>
        <span className="rounded-full border border-white/25 bg-black/20 px-2.5 py-1 text-[10px] font-medium text-white/85 backdrop-blur sm:text-[11px]">
          {project.type}
        </span>
      </div>

      {/* mockup */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pt-14 sm:p-8 sm:pt-16">
        <div className="relative z-10 w-full max-w-[400px] [@media(max-height:760px)]:max-w-[330px]">
          <motion.div {...float(5.5, 0, 6)}>
            <Mockup key={String(play)} project={project} theme={palette} />
          </motion.div>
        </div>
      </div>

      {/* floating tech tags */}
      {project.technologies?.[0] && (
        <motion.span
          {...float(4.5, 0.4, 5)}
          className="absolute left-4 top-[32%] z-20 hidden rounded-lg border border-white/25 bg-black/35 px-2.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur sm:inline-flex"
        >
          {project.technologies[0]}
        </motion.span>
      )}
      {project.technologies?.[1] && (
        <motion.span
          {...float(5.2, 1.2, 6)}
          className="absolute bottom-[18%] right-4 z-20 hidden items-center gap-1.5 rounded-lg border border-white/25 bg-black/35 px-2.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur sm:inline-flex"
        >
          <Icon size={12} style={{ color: palette.soft }} />
          {project.technologies[1]}
        </motion.span>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Stacking card (no rotate, no square shadow, clipped & rounded)    */
/* ---------------------------------------------------------------- */

function StackCard({ project, index, n, progress, palette, reduce, play }) {
  const y = useTransform(progress, (p) => `${((1 - enterOf(p, index, n)) * 100).toFixed(3)}%`);
  const scale = useTransform(progress, (p) => 1 - Math.min(buriedOf(p, index, n), 3) * 0.035);
  const shade = useTransform(progress, (p) => Math.min(buriedOf(p, index, n) * 0.25, 0.55));

  return (
    <motion.div
      style={{ y, scale, zIndex: index + 1 }}
      className="absolute inset-0 transform-gpu overflow-hidden rounded-3xl will-change-transform"
    >
      <CardSurface project={project} index={index} palette={palette} reduce={reduce} play={play} />
      <motion.div
        aria-hidden="true"
        style={{ opacity: shade }}
        className="pointer-events-none absolute inset-0 bg-black"
      />
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Main section                                                      */
/* ---------------------------------------------------------------- */

/* ---------------------------------------------------------------- */
/* Desktop: sticky + scroll-driven stack                             */
/* ---------------------------------------------------------------- */

function DesktopShowcase({ featured, reduce }) {
  const count = featured.length;
  const wrapRef = useRef(null);
  const [active, setActive] = useState(0);

  // wrapRef yahan hamesha mount hota hai, isliye scroll sahi track hota hai
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const update = (p) => {
      let idx = 0;
      for (let j = 1; j < count; j++) if (enterOf(p, j, count) >= 0.35) idx = j;
      setActive(idx);
    };
    update(scrollYProgress.get());
    return scrollYProgress.on("change", update);
  }, [count, scrollYProgress]);

  const scrollToCard = (i) => {
    const el = wrapRef.current;
    if (!el) return;
    const pageTop = window.scrollY + el.getBoundingClientRect().top;
    const target = i === 0 ? 0.01 : Math.min(rangeOf(i, count)[1] + 0.04, 0.99);
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: pageTop + target * span, behavior: "smooth" });
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={{ height: `${Math.max(count, 2) * 120}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col px-6 pb-5 pt-24 lg:px-8">
          {/* HEADER */}
          <SectionReveal>
            <div className="flex shrink-0 items-end justify-between gap-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue">
                  <span className="inline-block h-px w-6 bg-brand-blue" />
                  Featured Projects
                </span>
                <h2
                  id="projects-heading"
                  className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-brand-black sm:text-5xl lg:text-6xl"
                >
                  <AnimatedWords text="Ideas Turned Into" delay={0.25} />
                  <br />
                  <AnimatedWords
                    text="Digital Experiences"
                    delay={0.65}
                    shimmer
                    className="bg-gradient-to-r from-brand-blue via-brand-blue-light to-brand-blue bg-clip-text text-transparent"
                  />
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="group inline-flex shrink-0 items-center gap-1.5 pb-0.5 text-[13px] font-semibold text-brand-black transition-colors hover:text-brand-blue"
              >
                Explore Projects
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </SectionReveal>

          {/* SHOWCASE */}
          <div className="mt-5 grid min-h-0 flex-1 items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr] xl:gap-12">
            {/* LEFT: list */}
            <div className="flex min-h-0 flex-col justify-center">
              <ul className="flex flex-col">
                {featured.map((project, i) => {
                  const isActive = i === active;
                  const palette = PALETTES[i % PALETTES.length];
                  return (
                    <li
                      key={project.id}
                      className="relative border-t border-brand-gray-200 last:border-b"
                    >
                      <button
                        type="button"
                        onClick={() => scrollToCard(i)}
                        aria-current={isActive ? "true" : undefined}
                        className="group flex w-full items-start gap-4 py-3.5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
                      >
                        <span
                          className="mt-1 w-7 shrink-0 text-xs font-bold tabular-nums transition-colors duration-300"
                          style={{ color: isActive ? palette.ink : "#9ca3af" }}
                        >
                          {pad(i)}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-3">
                            <span
                              className={`text-base font-semibold leading-snug transition-colors duration-300 xl:text-lg ${
                                isActive
                                  ? "text-brand-black"
                                  : "text-brand-gray-400 group-hover:text-brand-gray-600"
                              }`}
                            >
                              {project.title}
                            </span>
                            <motion.span
                              animate={{ rotate: isActive ? 45 : 0 }}
                              transition={{ duration: 0.4, ease: EASE }}
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-gray-200 text-brand-black transition-colors duration-300"
                              style={
                                isActive
                                  ? { background: palette.ink, borderColor: palette.ink, color: "#fff" }
                                  : undefined
                              }
                            >
                              <ArrowUpRight size={14} aria-hidden="true" />
                            </motion.span>
                          </span>

                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.span
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.5, ease: EASE }}
                                className="block overflow-hidden"
                              >
                                <span className="block pt-2 text-[13px] leading-5 text-brand-gray-500">
                                  {project.description}
                                </span>
                                <span className="mt-2.5 flex flex-wrap gap-1.5">
                                  {project.technologies.map((tech) => (
                                    <span
                                      key={tech}
                                      className="rounded-md bg-brand-gray-50 px-2 py-1 text-[11px] font-medium text-brand-gray-600"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </span>
                                <span className="mt-3 block pb-0.5">
                                  <Link
                                    href={`/case-studies/${project.slug}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-black transition-colors hover:text-brand-blue"
                                  >
                                    View Project Details
                                    <ExternalLink size={13} aria-hidden="true" />
                                  </Link>
                                </span>
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* progress rail */}
              <div
                aria-hidden="true"
                className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-brand-gray-100"
              >
                <motion.div
                  style={{
                    scaleX: scrollYProgress,
                    background: PALETTES[active % PALETTES.length].ink,
                  }}
                  className="h-full w-full origin-left"
                />
              </div>
            </div>

            {/* RIGHT: stacked cards */}
            <div className="relative isolate min-h-0 overflow-hidden rounded-3xl">
              {featured.map((project, i) => (
                <StackCard
                  key={project.id}
                  project={project}
                  index={i}
                  n={count}
                  progress={scrollYProgress}
                  palette={PALETTES[i % PALETTES.length]}
                  reduce={reduce}
                  play={active >= i}
                />
              ))}
            </div>
          </div>

          {/* SLIM CTA */}
          <div className="mt-5 shrink-0 rounded-2xl bg-brand-black px-5 py-3.5">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white sm:text-base">
                  Have a similar idea in mind?
                </p>
                <p className="mt-0.5 hidden text-xs text-white/55 [@media(min-height:760px)]:block">
                  Tell us what you want to build and we will help shape it.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-white px-4 text-[13px] font-semibold !text-brand-black transition-colors hover:bg-brand-blue hover:!text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Let&apos;s Discuss Your Project
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Main section                                                      */
/* ---------------------------------------------------------------- */

export default function CaseStudiesSection() {
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const featured = projects.filter((p) => p.featured);

  if (featured.length === 0) return null;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative bg-white">
      {/* background dots */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-50 [background-image:radial-gradient(rgba(0,0,0,0.12)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
      />

      {isDesktop === null ? (
        <div className="min-h-screen" />
      ) : isDesktop ? (
        <DesktopShowcase featured={featured} reduce={reduce} />
      ) : (
        /* MOBILE / TABLET: normal vertical flow */
        <div className="relative mx-auto max-w-[1200px] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20">
          <SectionReveal>
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue">
                  <span className="inline-block h-px w-6 bg-brand-blue" />
                  Featured Projects
                </span>
                <h2
                  id="projects-heading"
                  className="mt-4 text-2xl font-bold leading-tight tracking-tight text-brand-black sm:text-3xl"
                >
                  <AnimatedWords text="Ideas Turned Into" delay={0.25} />{" "}
                  <AnimatedWords
                    text="Digital Experiences"
                    delay={0.65}
                    shimmer
                    className="bg-gradient-to-r from-brand-blue via-brand-blue-light to-brand-blue bg-clip-text text-transparent"
                  />
                </h2>
                <FadeBlur
                  as="p"
                  delay={1.0}
                  className="mt-4 max-w-2xl text-sm leading-7 text-brand-gray-500 sm:text-base"
                >
                  Explore our featured software concepts, from e-commerce
                  experiences to customer relationship management and learning
                  platforms.
                </FadeBlur>
              </div>
              <FadeBlur delay={0.4}>
                <Link
                  href="/case-studies"
                  className="group inline-flex w-fit shrink-0 items-center gap-1.5 text-[13px] font-semibold text-brand-black transition-colors hover:text-brand-blue"
                >
                  Explore Projects
                  <ArrowUpRight size={15} />
                </Link>
              </FadeBlur>
            </div>
          </SectionReveal>

          <div className="mt-10 space-y-10">
            {featured.map((project, i) => {
              const palette = PALETTES[i % PALETTES.length];
              return (
                <motion.article
                  key={project.id}
                  initial={reduce ? false : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  <div className="relative h-[340px] overflow-hidden rounded-3xl sm:h-[400px]">
                    <CardSurface project={project} index={i} palette={palette} reduce={reduce} play />
                  </div>
                  <div className="px-1 pt-4">
                    <h3 className="text-lg font-semibold text-brand-black">{project.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-6 text-brand-gray-500">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-brand-gray-50 px-2 py-1 text-[11px] font-medium text-brand-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/case-studies/${project.slug}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-black transition-colors hover:text-brand-blue"
                    >
                      View Project Details
                      <ExternalLink size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-12 rounded-2xl bg-brand-black px-5 py-6 sm:px-8 sm:py-7">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-lg font-semibold text-white">Have a similar idea in mind?</p>
                <p className="mt-1 text-[13px] leading-6 text-white/60">
                  Tell us what you want to build and we will help shape it.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-white px-5 text-[13px] font-semibold !text-brand-black transition-colors hover:bg-brand-blue hover:!text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Let&apos;s Discuss Your Project
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}




