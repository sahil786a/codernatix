"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Target,
  Blocks,
  Rocket,
  Eye,
  TrendingUp,
  Handshake,
  Check,
  User,
} from "lucide-react";

import {
  FoldedCard,
  FoldedCardBadge,
  FoldedCardBorder,
  FoldedCardDescription,
  FoldedCardFold,
  FoldedCardFooter,
  FoldedCardGrid,
  FoldedCardHeading,
  FoldedCardPreview,
  FoldedCardTitle,
} from "@/components/ui/FoldedCard";
import { SectionReveal, AnimatedWords, FadeBlur } from "./SolutionAnimation";

const EASE = [0.22, 1, 0.36, 1];

const COLORS = {
  blue: { accent: "#2563eb", soft: "#dbeafe" },
  violet: { accent: "#7c3aed", soft: "#ede9fe" },
  cyan: { accent: "#0891b2", soft: "#cffafe" },
  amber: { accent: "#d97706", soft: "#fef3c7" },
  emerald: { accent: "#059669", soft: "#d1fae5" },
  rose: { accent: "#e11d48", soft: "#ffe4e6" },
};

const BENEFITS = [
  {
    id: "business-focused",
    number: "01",
    title: "Business-Focused",
    description:
      "We align technology decisions with your business goals, customer needs, and practical requirements.",
    art: "target",
    color: "blue",
  },
  {
    id: "custom-solutions",
    number: "02",
    title: "Custom Solutions",
    description:
      "Every product is planned around your workflows, features, and the problems you want to solve.",
    art: "blocks",
    color: "violet",
  },
  {
    id: "modern-approach",
    number: "03",
    title: "Modern Approach",
    description:
      "We choose suitable technologies and development practices to build maintainable digital products.",
    art: "rocket",
    color: "cyan",
  },
  {
    id: "transparent-process",
    number: "04",
    title: "Transparent Process",
    description:
      "Clear communication, defined milestones, and regular updates help keep your project on track.",
    art: "process",
    color: "amber",
  },
  {
    id: "scalable-products",
    number: "05",
    title: "Scalable Products",
    description:
      "We consider performance, maintainability, and future requirements as your product evolves.",
    art: "scale",
    color: "emerald",
  },
  {
    id: "long-term-partnership",
    number: "06",
    title: "Long-Term Partnership",
    description:
      "We can help with ongoing improvements, maintenance, and technical support based on your needs.",
    art: "partner",
    color: "rose",
  },
];

/* ---------------------------------------------------------------- */
/* Illustrations (preview area ke andar)                             */
/* ---------------------------------------------------------------- */

const pill =
  "absolute rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-600 shadow-sm";

function TargetArt({ c, reduce }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-40 w-40">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full border-2"
            style={{ inset: i * 22, borderColor: c.accent, opacity: 0.2 + i * 0.2 }}
            animate={reduce ? undefined : { scale: [1, 1.07, 1] }}
            transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <span className="absolute inset-[62px] rounded-full" style={{ background: c.accent }} />
        {/* arrow jo target par lagta hai */}
        <motion.span
          className="absolute left-1/2 top-1/2 h-[3px] w-14 origin-right rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${c.accent})`,
            rotate: -35,
            marginLeft: -4,
            marginTop: -2,
          }}
          animate={reduce ? undefined : { x: [30, 0, 0, 30], y: [-22, 0, 0, -22], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut", times: [0, 0.35, 0.8, 1] }}
        />
      </div>
      <motion.span
        className={`${pill} left-5 top-6`}
        animate={reduce ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        Goals
      </motion.span>
      <motion.span
        className={`${pill} bottom-6 right-5`}
        animate={reduce ? undefined : { y: [0, 5, 0] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
      >
        Customers
      </motion.span>
    </div>
  );
}

function BlocksArt({ c, reduce }) {
  const cell = "h-[62px] w-[62px] rounded-xl";
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative grid grid-cols-2 gap-2.5">
        <span className={cell} style={{ background: c.accent }} />
        <span className={cell} style={{ background: c.accent, opacity: 0.45 }} />
        <span className={cell} style={{ background: c.accent, opacity: 0.25 }} />
        {/* ye block aata hai aur jagah le leta hai */}
        <motion.span
          className={cell}
          style={{ background: c.accent, opacity: 0.7 }}
          animate={
            reduce
              ? undefined
              : { x: [70, 0, 0, 70], y: [-26, 0, 0, -26], rotate: [18, 0, 0, 18], opacity: [0, 0.7, 0.7, 0] }
          }
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.35, 0.8, 1] }}
        />
      </div>
      <span className={`${pill} left-5 top-6`}>Workflow</span>
      <span className={`${pill} bottom-6 right-5`}>Features</span>
    </div>
  );
}

function RocketArt({ c, reduce }) {
  const stars = [
    { x: "18%", y: "22%", d: 0 },
    { x: "78%", y: "18%", d: 0.6 },
    { x: "84%", y: "62%", d: 1.2 },
    { x: "14%", y: "68%", d: 1.8 },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{ left: s.x, top: s.y, background: c.accent }}
          animate={reduce ? undefined : { opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 2.4, delay: s.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="relative">
        {/* trail */}
        <div className="absolute left-1/2 top-full -ml-[1px] flex -translate-x-1/2 flex-col items-center gap-1.5 pt-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full"
              style={{ height: 14 - i * 3, background: c.accent }}
              animate={reduce ? undefined : { opacity: [0.8, 0.1, 0.8] }}
              transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </div>
        <motion.div
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg"
          style={{ background: c.accent, boxShadow: `0 14px 30px -10px ${c.accent}` }}
        >
          <Rocket size={34} strokeWidth={1.8} />
        </motion.div>
      </div>
      <span className={`${pill} left-5 top-6`}>Modern</span>
      <span className={`${pill} bottom-6 right-5`}>Maintainable</span>
    </div>
  );
}

function ProcessArt({ c, reduce }) {
  const steps = ["Plan", "Build", "Launch"];
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[230px] space-y-3.5">
        {steps.map((label, i) => {
          const a = 0.1 + i * 0.2;
          return (
            <div key={label} className="flex items-center gap-3">
              <span
                className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white"
                style={{ borderColor: c.accent }}
              >
                <motion.span
                  className="flex"
                  style={{ color: c.accent }}
                  animate={reduce ? { opacity: 1 } : { opacity: [0, 0, 1, 1, 0], scale: [0.5, 0.5, 1, 1, 0.5] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    times: [0, a, a + 0.1, 0.9, 1],
                    ease: "easeOut",
                  }}
                >
                  <Check size={16} strokeWidth={3} />
                </motion.span>
              </span>
              <div className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <p className="text-[11px] font-semibold text-slate-700">{label}</p>
                <div className="mt-1.5 h-1 rounded-full bg-slate-100" />
              </div>
            </div>
          );
        })}
        <div className="ml-11 h-1.5 overflow-hidden rounded-full bg-slate-200/80">
          <motion.div
            className="h-full origin-left rounded-full"
            style={{ background: c.accent }}
            animate={reduce ? { scaleX: 1 } : { scaleX: [0, 1, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.7, 0.9, 1], ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}

function ScaleArt({ c, reduce }) {
  const heights = [34, 52, 72, 96, 124];
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <div className="flex h-[130px] items-end gap-3">
          {heights.map((h, i) => (
            <motion.span
              key={i}
              className="w-7 origin-bottom rounded-t-md"
              style={{ height: h, background: c.accent, opacity: 0.35 + i * 0.16 }}
              animate={reduce ? undefined : { scaleY: [0.35, 1, 0.35] }}
              transition={{ duration: 3.6, delay: i * 0.22, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
        <svg viewBox="0 0 200 130" className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
          <motion.path
            d="M6 110 L50 84 L96 66 L140 34 L192 10"
            stroke={c.accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 6"
            animate={reduce ? undefined : { pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.6, 1] }}
          />
        </svg>
      </div>
      <motion.span
        className={`${pill} right-5 top-6 flex items-center gap-1`}
        animate={reduce ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <TrendingUp size={11} style={{ color: c.accent }} /> Growth
      </motion.span>
      <span className={`${pill} bottom-6 left-5`}>Performance</span>
    </div>
  );
}

function PartnerArt({ c, reduce }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
      <div className="relative flex h-20 w-[180px] items-center justify-center">
        <motion.span
          className="absolute flex h-16 w-16 items-center justify-center rounded-full border-2 bg-white"
          style={{ borderColor: c.accent, color: c.accent }}
          animate={reduce ? { x: -14 } : { x: [-52, -14, -52] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <User size={26} strokeWidth={1.8} />
        </motion.span>
        <motion.span
          className="absolute flex h-16 w-16 items-center justify-center rounded-full text-white"
          style={{ background: c.accent }}
          animate={reduce ? { x: 14 } : { x: [52, 14, 52] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <User size={26} strokeWidth={1.8} />
        </motion.span>
        <motion.span
          className="absolute z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md"
          style={{ color: c.accent }}
          animate={reduce ? undefined : { scale: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Handshake size={18} strokeWidth={2} />
        </motion.span>
      </div>
      <div className="flex gap-2">
        {["Support", "Updates", "Growth"].map((t, i) => (
          <motion.span
            key={t}
            className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-600 shadow-sm"
            animate={reduce ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          >
            {t}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

const ARTS = {
  target: TargetArt,
  blocks: BlocksArt,
  rocket: RocketArt,
  process: ProcessArt,
  scale: ScaleArt,
  partner: PartnerArt,
};

/* ---------------------------------------------------------------- */
/* Section                                                           */
/* ---------------------------------------------------------------- */

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardIn = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
};

export default function WhyChooseUsSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="why-codernatix"
      aria-labelledby="why-codernatix-heading"
      className="relative overflow-hidden bg-brand-gray-50 py-6 sm:py-8 lg:py-8"
    >
      {/* background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(0,0,0,0.10)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
      />
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, 30, -10, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, -24, 12, 0], y: [0, -16, 10, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-24 -left-32 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        {/* HEADER */}
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-3 text-xs font-bold uppercase text-brand-blue">
              <motion.span
                aria-hidden="true"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="inline-block h-px w-7 origin-right"
              >
                <motion.span
                  animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  className="block h-full w-full bg-brand-blue"
                />
              </motion.span>
              <motion.span
                initial={reduce ? false : { opacity: 0, letterSpacing: "0.5em" }}
                whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 1.1, ease: EASE }}
              >
                Why Codernatix
              </motion.span>
              <motion.span
                aria-hidden="true"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="inline-block h-px w-7 origin-left"
              >
                <motion.span
                  animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  className="block h-full w-full bg-brand-blue"
                />
              </motion.span>
            </span>

            <h2
              id="why-codernatix-heading"
              className="mt-5 text-3xl font-bold leading-tight tracking-tight text-brand-black sm:text-4xl lg:text-5xl"
            >
              <AnimatedWords text="More Than Code." delay={0.25} />{" "}
              <AnimatedWords
                text="A Partner in Your Growth."
                delay={0.6}
                shimmer
                className="bg-gradient-to-r from-brand-blue via-brand-blue-light to-brand-blue bg-clip-text text-transparent"
              />
            </h2>

            <FadeBlur
              as="p"
              delay={1.0}
              className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-brand-gray-500 sm:text-base sm:leading-8"
            >
              Great digital products need more than development. They need clear
              thinking, thoughtful execution, and a focus on what matters to your
              business.
            </FadeBlur>
          </div>
        </SectionReveal>

        {/* CARDS */}
                {/* CARDS */}
        <motion.div
  variants={grid}
  initial="hidden"
  whileInView="show"
  viewport={{ once: false, amount: 0.1 }}
  className="mx-auto mt-12 grid grid-cols-1 gap-x-6 gap-y-8 px-6 sm:grid-cols-2 sm:px-10 lg:mt-16 lg:grid-cols-4 lg:px-14 xl:px-20 2xl:px-24"
>
  {BENEFITS.map((benefit) => {
    const c = COLORS[benefit.color];
    const Art = ARTS[benefit.art];

    return (
      <motion.div
        key={benefit.id}
        variants={cardIn}
        className={
          benefit.id === "scalable-products"
            ? "lg:col-start-2"
            : benefit.id === "long-term-partnership"
              ? "lg:col-start-3"
              : ""
        }
      >
        <FoldedCard accent={c.accent}>
          <FoldedCardFold />
          <FoldedCardBorder />

          <FoldedCardPreview>
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 55%, ${c.soft}, transparent 68%)`,
              }}
            />
            <FoldedCardGrid />
            <Art c={c} reduce={reduce} />
          </FoldedCardPreview>

          <FoldedCardFooter>
            <FoldedCardHeading>
              <FoldedCardTitle>{benefit.title}</FoldedCardTitle>
              <FoldedCardBadge>{benefit.number}</FoldedCardBadge>
            </FoldedCardHeading>
            <FoldedCardDescription>
              {benefit.description}
            </FoldedCardDescription>
          </FoldedCardFooter>
        </FoldedCard>
      </motion.div>
    );
  })}
</motion.div>
      </div>
    </section>
  );
}