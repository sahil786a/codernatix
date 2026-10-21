"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Code2, Compass, Layers3, Mail } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const QUICK_LINKS = [
  { label: "Services", desc: "What we build", href: "/services", Icon: Code2 },
  { label: "Projects", desc: "Our featured work", href: "/case-studies", Icon: Layers3 },
  { label: "Contact", desc: "Talk to our team", href: "/contact", Icon: Mail },
];

/* ---------------------------------------------------------------- */
/* Stars (seeded, hydration-safe)                                    */
/* ---------------------------------------------------------------- */

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STARS = (() => {
  const r = mulberry32(11);
  return Array.from({ length: 70 }, () => ({
    x: +(r() * 100).toFixed(2),
    y: +(r() * 100).toFixed(2),
    s: +(0.6 + r() * 1.8).toFixed(2),
    d: +(r() * 5).toFixed(2),
    t: +(2.5 + r() * 4).toFixed(2),
  }));
})();

/* ---------------------------------------------------------------- */
/* Big "4"                                                           */
/* ---------------------------------------------------------------- */

function Digit({ children, delay, reduce }) {
  return (
    <motion.span
      initial={reduce ? false : { opacity: 0, y: -90, rotate: -8, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 110, damping: 13, delay }}
      className="inline-block"
    >
      <motion.span
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 5, delay: delay + 1, repeat: Infinity, ease: "easeInOut" }}
        className="inline-block bg-gradient-to-b from-white via-white/85 to-brand-blue/40 bg-clip-text text-transparent"
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/* ---------------------------------------------------------------- */
/* Planet "0" (em units, isliye font size ke saath scale hota hai)   */
/* ---------------------------------------------------------------- */

function PlanetZero({ reduce }) {
  return (
    <motion.span
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.25 }}
      className="relative mx-[0.03em] inline-block h-[0.74em] w-[0.74em] shrink-0"
    >
      {/* ring */}
      <span className="absolute inset-0 rounded-full border-[0.045em] border-white/20 shadow-[0_0_0.3em_rgba(59,130,246,0.25),inset_0_0_0.3em_rgba(59,130,246,0.15)]" />

      {/* planet (breathing) */}
      <motion.span
        animate={reduce ? undefined : { scale: [1, 1.07, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[22%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #ffffff, #60a5fa 38%, #1d4ed8 72%, #0b1030)",
          boxShadow: "0 0 0.35em rgba(59,130,246,0.55), inset -0.06em -0.08em 0.14em rgba(0,0,30,0.6)",
        }}
      />

      {/* orbit (dashed) with moon */}
      <span className="absolute inset-[-14%] animate-[spin_9s_linear_infinite] rounded-full border border-dashed border-white/20 motion-reduce:animate-none">
        <span className="absolute left-1/2 top-0 h-[0.07em] w-[0.07em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0.2em_0.04em_rgba(255,255,255,0.9)]" />
      </span>
      <span className="absolute inset-[-30%] animate-[spin_16s_linear_infinite_reverse] rounded-full border border-white/10 motion-reduce:animate-none">
        <span className="absolute bottom-0 left-1/2 h-[0.045em] w-[0.045em] -translate-x-1/2 translate-y-1/2 rounded-full bg-violet-300 shadow-[0_0_0.16em_0.03em_rgba(196,181,253,0.8)]" />
      </span>
    </motion.span>
  );
}

/* ---------------------------------------------------------------- */
/* Page                                                              */
/* ---------------------------------------------------------------- */

const rise = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

export default function NotFoundContent() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const router = useRouter();

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/");
  };

  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative flex min-h-[calc(100svh-68px)] items-center overflow-hidden bg-brand-black text-white lg:min-h-[calc(100svh-76px)]"
    >
      <style>{`
        @keyframes nf-twinkle { 0%,100% { opacity: .15; transform: scale(.8); } 50% { opacity: 1; transform: scale(1.25); } }
        @keyframes nf-shoot {
          0% { transform: translate3d(0,0,0) rotate(35deg); opacity: 0; }
          2% { opacity: 1; }
          12% { transform: translate3d(420px,300px,0) rotate(35deg); opacity: 0; }
          100% { transform: translate3d(420px,300px,0) rotate(35deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) { .nf-star, .nf-shoot { animation: none !important; } }
      `}</style>

      {/* ---------- space background ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <motion.div
          animate={reduce ? undefined : { x: [0, 40, -20, 0], y: [0, 24, -12, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl"
        />
        <motion.div
          animate={reduce ? undefined : { x: [0, -34, 16, 0], y: [0, -20, 12, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl"
        />

        {STARS.map((s, i) => (
          <span
            key={i}
            className="nf-star absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.s,
              height: s.s,
              animation: `nf-twinkle ${s.t}s ease-in-out ${s.d}s infinite`,
            }}
          />
        ))}
        <span
          className="nf-shoot absolute left-[10%] top-[8%] h-px w-28 bg-gradient-to-r from-transparent via-white/70 to-white"
          style={{ animation: "nf-shoot 9s linear 2s infinite" }}
        />
        <span
          className="nf-shoot absolute left-[55%] top-[4%] h-px w-24 bg-gradient-to-r from-transparent via-white/60 to-white"
          style={{ animation: "nf-shoot 13s linear 6s infinite" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-5 py-16 text-center sm:px-8 lg:px-12">
        {/* ---------- big 404 ---------- */}
        <div
          aria-hidden="true"
          className="flex items-center justify-center font-brand text-[clamp(6.5rem,22vw,15rem)] font-bold leading-none"
        >
          <Digit delay={0.1} reduce={reduce}>4</Digit>
          <PlanetZero reduce={reduce} />
          <Digit delay={0.4} reduce={reduce}>4</Digit>
        </div>

        <motion.div
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.7 } } }}
          className="mt-4"
        >
          {/* eyebrow */}
          <motion.div variants={rise} className="flex justify-center">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue-light backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue-light opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue-light" />
              </span>
              Error 404
            </span>
          </motion.div>

          <motion.h1
            id="not-found-heading"
            variants={rise}
            className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
          >
            Lost in{" "}
            <span className="bg-gradient-to-r from-brand-blue-light via-white to-brand-blue bg-clip-text text-transparent">
              space?
            </span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8"
          >
            The page you&apos;re looking for may have moved, been renamed, or
            isn&apos;t built yet. Let&apos;s get you back on track.
          </motion.p>

          {/* attempted URL */}
          {pathname && pathname !== "/" && (
            <motion.div variants={rise} className="mt-5 flex justify-center">
              <code className="max-w-full truncate rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-white/55">
                {pathname}
              </code>
            </motion.div>
          )}

          {/* buttons */}
          <motion.div
            variants={rise}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/"
              className="group relative inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold !text-white shadow-lg shadow-brand-blue/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-blue-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-light sm:w-auto"
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
              <Compass size={18} className="relative" aria-hidden="true" />
              <span className="relative">Back to Home</span>
              <motion.span
                aria-hidden="true"
                animate={reduce ? undefined : { x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
                className="relative inline-flex"
              >
                <ArrowUpRight size={17} />
              </motion.span>
            </Link>

            <button
              type="button"
              onClick={goBack}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-light sm:w-auto"
            >
              <ArrowLeft
                size={17}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Go Back
            </button>
          </motion.div>

          {/* quick links */}
          <motion.div variants={rise} className="mx-auto mt-12 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
              Or try one of these
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {QUICK_LINKS.map(({ label, desc, href, Icon }, i) => (
                <motion.li
                  key={href}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 + i * 0.1, ease: EASE }}
                >
                  <Link
                    href={href}
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/50 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-light"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/15 text-brand-blue-light ring-1 ring-brand-blue/30 transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-white">{label}</span>
                      <span className="block truncate text-xs text-white/50">{desc}</span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue-light"
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}