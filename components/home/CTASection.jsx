"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";

import {
  SectionReveal,
  Eyebrow,
  AnimatedWords,
  FadeBlur,
} from "./SolutionAnimation";

const EASE = [0.22, 1, 0.36, 1];

/* ---------------------------------------------------------------- */
/* Chat script (apni language/text yahan badal sakte ho)             */
/* ---------------------------------------------------------------- */

const EVENTS = [
  { type: "msg", from: "user", text: "Hi! I have an idea for a mobile app." },
  { type: "typing" },
  {
    type: "msg",
    from: "team",
    text: "Great! Tell us your goals and we'll shape the right solution.",
  },
  { type: "msg", from: "user", text: "Can we discuss scope and timeline?" },
  { type: "typing" },
  {
    type: "msg",
    from: "team",
    text: "Absolutely. Let's set up your free consultation.",
  },
  { type: "done" },
];

// har event dikhne ke baad kitni der ruke (ms)
const HOLD = [1100, 1500, 2200, 1500, 1500, 1800, 4200];

const TRUST = [
  "Free, no-obligation consultation",
  "Tailored to your business goals",
  "Clear scope, timeline and next steps",
];

/* ---------------------------------------------------------------- */
/* Small pieces                                                      */
/* ---------------------------------------------------------------- */

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-white/70"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.9,
            delay: i * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function ChatEvent({ ev }) {
  if (ev.type === "done") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3">
        <motion.span
          initial={{ scale: 0, rotate: -40 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 14, delay: 0.15 }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-emerald-950"
        >
          <CalendarCheck size={18} strokeWidth={2.2} />
        </motion.span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">
            Free consultation booked
          </p>
          <p className="text-xs text-white/60">We&apos;ll reach out to confirm.</p>
        </div>
      </div>
    );
  }

  if (ev.type === "typing") {
    return (
      <div className="w-fit rounded-2xl rounded-bl-md border border-white/10 bg-white/10 px-3 py-2">
        <TypingDots />
      </div>
    );
  }

  const isUser = ev.from === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <p
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-5 ${
          isUser
            ? "rounded-br-md bg-gradient-to-br from-brand-blue to-brand-blue-light text-white shadow-lg shadow-brand-blue/20"
            : "rounded-bl-md border border-white/10 bg-white/10 text-white/85"
        }`}
      >
        {ev.text}
      </p>
    </div>
  );
}

function ChatMock({ reduce }) {
  // n = ab tak kitne events dikh rahe hain
  const [n, setN] = useState(reduce ? EVENTS.length : 0);

  useEffect(() => {
    if (reduce) {
      setN(EVENTS.length);
      return;
    }
    const delay = n === 0 ? 700 : HOLD[n - 1];
    const t = setTimeout(
      () => setN((cur) => (cur >= EVENTS.length ? 0 : cur + 1)),
      delay
    );
    return () => clearTimeout(t);
  }, [n, reduce]);

  // typing sirf tab dikhe jab wo latest ho (reply aate hi gayab)
  const visible = EVENTS.slice(0, n)
    .map((ev, i) => ({ ev, i }))
    .filter(({ ev, i }) => !(ev.type === "typing" && i !== n - 1));

  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      {/* rotating rings (peeche) */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite] rounded-full border border-white/10 motion-reduce:animate-none">
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-blue-light shadow-[0_0_14px_3px_rgba(96,165,250,0.7)]" />
        </div>
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 animate-[spin_34s_linear_infinite_reverse] rounded-full border border-dashed border-white/10 motion-reduce:animate-none">
          <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-violet-300 shadow-[0_0_12px_3px_rgba(196,181,253,0.6)]" />
        </div>
      </div>

      {/* floating chips */}
      <motion.span
        aria-hidden="true"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-3 top-10 z-20 hidden items-center gap-1.5 rounded-xl border border-white/15 bg-brand-black/70 px-3 py-2 text-[11px] font-semibold text-white shadow-xl backdrop-blur sm:inline-flex lg:-left-10"
      >
        <Sparkles size={13} className="text-brand-blue-light" />
        100% Free
      </motion.span>
      <motion.span
        aria-hidden="true"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 5.2, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-3 bottom-24 z-20 hidden items-center gap-1.5 rounded-xl border border-white/15 bg-brand-black/70 px-3 py-2 text-[11px] font-semibold text-white shadow-xl backdrop-blur sm:inline-flex lg:-right-8"
      >
        <Check size={13} className="text-emerald-300" />
        No obligation
      </motion.span>

      {/* chat card with rotating conic border */}
      <div className="relative z-10 overflow-hidden rounded-[1.6rem] p-[1.5px] shadow-2xl shadow-black/50">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 aspect-square w-[220%] -translate-x-1/2 -translate-y-1/2 animate-[spin_9s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,#2563eb_330deg,#93c5fd_360deg)] motion-reduce:animate-none"
        />

        <div className="relative overflow-hidden rounded-3xl bg-[#0b0f1a]">
          {/* header */}
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1">
              <Image
                src="/images/logo/codernatix-logo.png"
                alt=""
                width={32}
                height={32}
                style={{ height: 28, width: "auto", maxWidth: 34 }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-[#0b0f1a] bg-emerald-400" />
              </span>
            </span>
            <div className="min-w-0">
              <p className="font-brand text-sm font-bold uppercase tracking-[0.06em] text-white">
                Codernatix
              </p>
              <p className="text-[11px] text-emerald-300">Online now</p>
            </div>
            <MessageCircle size={18} className="ml-auto text-white/40" aria-hidden="true" />
          </div>

          {/* messages */}
          <div
            className="flex h-[330px] flex-col justify-end gap-3 overflow-hidden px-4 py-4 [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_16%)] [mask-image:linear-gradient(to_bottom,transparent,black_16%)]"
            aria-live="polite"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map(({ ev, i }) => (
                <motion.div
                  key={i}
                  layout="position"
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <ChatEvent ev={ev} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* fake input */}
          <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
            <div className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-[13px] text-white/35">
              Tell us about your idea…
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue text-white">
              <Send size={16} aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Section                                                           */
/* ---------------------------------------------------------------- */

export default function FreeConsultationCTA() {
  const reduce = useReducedMotion();

  return (
    <section
      id="free-consultation"
      aria-labelledby="consultation-heading"
      className="relative overflow-hidden bg-brand-black text-brand-white"
    >
      {/* background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 tech-grid opacity-20"
      />
      <div aria-hidden="true" className="ambient-blue -right-40 -top-40 opacity-80" />
      <div aria-hidden="true" className="ambient-blue -bottom-64 -left-40 opacity-40" />
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, 40, -20, 0], y: [0, 24, -12, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[8%] top-10 h-72 w-72 rounded-full bg-brand-blue/15 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, -34, 16, 0], y: [0, -20, 12, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-0 right-[6%] h-72 w-72 rounded-full bg-violet-500/10 blur-3xl"
      />

      <SectionReveal className="py-16 sm:py-20 lg:py-28">
        <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12 xl:px-16">
           <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
     {/* LEFT */}
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <Eyebrow>Let&apos;s Build Something Great</Eyebrow>
              </div>

              <h2
                id="consultation-heading"
                className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
              >
                <AnimatedWords text="Have an Idea?" delay={0.25} />
                <br />
                <AnimatedWords
                  text="Let's Build It Together."
                  delay={0.6}
                  shimmer
                  className="bg-gradient-to-r from-brand-blue-light via-white to-brand-blue bg-clip-text text-transparent"
                />
              </h2>

              <FadeBlur
                as="p"
                delay={1.0}
                className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8 lg:mx-0"
              >
                Your next digital product starts with a conversation. Tell us
                about your goals, and let&apos;s explore the right solution for
                your business.
              </FadeBlur>

              {/* trust points */}
              <ul className="mx-auto mt-7 max-w-md space-y-3 text-left lg:mx-0">
                {TRUST.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={reduce ? false : { opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.8 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: EASE }}
                    className="flex items-center gap-3 text-sm text-white/80"
                  >
                    <motion.span
                      initial={reduce ? false : { scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: false, amount: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 14,
                        delay: 0.35 + i * 0.12,
                      }}
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/20 text-brand-blue-light ring-1 ring-brand-blue/40"
                    >
                      <Check size={14} strokeWidth={3} aria-hidden="true" />
                    </motion.span>
                    {item}
                  </motion.li>
                ))}
              </ul>

              {/* buttons */}
              <FadeBlur
                delay={0.2}
                className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
              >
                <Link
                  href="/contact"
                  className="group relative inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold !text-white shadow-lg shadow-brand-blue/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-blue-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-light sm:w-auto"
                >
                  {!reduce && (
                    <motion.span
                      aria-hidden="true"
                      initial={{ x: "-150%" }}
                      animate={{ x: "450%" }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        repeatDelay: 3.5,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  )}
                  <MessageCircle size={18} className="relative" aria-hidden="true" />
                  <span className="relative">Book a Free Consultation</span>
                  <motion.span
                    aria-hidden="true"
                    animate={reduce ? undefined : { x: [0, 4, 0] }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      repeatDelay: 1.2,
                      ease: "easeInOut",
                    }}
                    className="relative inline-flex"
                  >
                    <ArrowRight size={17} />
                  </motion.span>
                </Link>

                <Link
                  href="/services"
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-light sm:w-auto"
                >
                  Explore Our Services
                  <ArrowRight
                    size={17}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </FadeBlur>

              <FadeBlur
                as="p"
                delay={0.3}
                className="mt-6 text-xs leading-6 text-white/50 sm:text-sm"
              >
                Let&apos;s discuss your goals, requirements, and next steps.
              </FadeBlur>
            </div>

            {/* RIGHT */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 50, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
            >
              <ChatMock reduce={reduce} />
            </motion.div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}