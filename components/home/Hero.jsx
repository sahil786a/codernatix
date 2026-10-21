"use client";
//components/home/Hero.jsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code2, Rocket, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const SPRING = { type: "spring", stiffness: 260, damping: 18 };

/* Har feature ke icon ki apni alag arrival animation */
const FEATURES = [
  { icon: Rocket, a: "Fast", b: "Performance",
    from: { x: -26, y: 26, opacity: 0, rotate: -25 },
    item: { x: -24, opacity: 0 } },
  { icon: ShieldCheck, a: "Secure", b: "Architecture",
    from: { scale: 0, opacity: 0 },
    item: { y: 24, opacity: 0 } },
  { icon: Code2, a: "Scalable", b: "Solutions",
    from: { scale: 0.4, rotate: -120, opacity: 0 },
    item: { x: 24, opacity: 0 } },
];

/* Background shape: apne corner ki taraf se slide hoke aata hai */
function Shape({ from, delay, className, style, reduce }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, ...from }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    />
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  const fx = (initial, animate, transition) => (reduce ? {} : { initial, animate, transition });
  const draw = (delay, duration = 0.9) =>
    fx({ pathLength: 0, opacity: 0 }, { pathLength: 1, opacity: 1 }, { duration, delay, ease: "easeInOut" });
  const dot = (delay) => ({
    ...fx({ scale: 0, opacity: 0 }, { scale: 1, opacity: 1 }, { ...SPRING, delay }),
    style: { transformBox: "fill-box", transformOrigin: "center" },
  });

  return (
    <section className="relative isolate overflow-hidden bg-page lg:h-[calc(100vh-76px)] lg:min-h-[620px] lg:max-h-[860px]">
      {/* ================= Background geometry ================= */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
  <div className="absolute inset-0 bg-page" />

  {/* ===== Saari shapes ki opacity yahin se: opacity-60 ===== */}
  <div className="absolute inset-0 opacity-40">
    {/* top-right: big fold */}
    <Shape reduce={reduce} delay={0.0} from={{ x: 90, y: -90 }}
      className="absolute -right-24 -top-10 h-[460px] w-[460px] bg-gradient-to-bl from-brand-blue-100/70 via-brand-blue-100/40 to-brand-blue-100/10"
      style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }} />
    {/* top-right: second layer */}
    <Shape reduce={reduce} delay={0.1} from={{ x: 70, y: -40 }}
      className="absolute -right-10 top-10 h-[300px] w-[300px] bg-gradient-to-bl from-brand-blue-100/60 to-brand-blue-100/15"
      style={{ clipPath: "polygon(100% 0, 100% 100%, 0 40%)" }} />
    {/* top-center: long diagonal */}
    <Shape reduce={reduce} delay={0.15} from={{ y: -70 }}
      className="absolute left-[38%] top-0 h-[180px] w-[420px] bg-gradient-to-r from-brand-blue-100/5 to-brand-blue-100/60"
      style={{ clipPath: "polygon(0 0, 100% 0, 60% 100%)" }} />
    {/* middle-right: fold behind the logo */}
    <Shape reduce={reduce} delay={0.25} from={{ x: 120, scale: 0.9 }}
      className="absolute right-0 top-[26%] hidden h-[440px] w-[620px] bg-gradient-to-tl from-brand-blue-100/70 via-brand-blue-100/40 to-brand-blue-100/10 lg:block"
      style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
    {/* bottom-right: fold */}
    <Shape reduce={reduce} delay={0.3} from={{ x: 90, y: 90 }}
      className="absolute -right-16 bottom-0 h-[260px] w-[560px] bg-gradient-to-tl from-brand-blue-100/60 to-brand-blue-100/15"
      style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
    {/* bottom-center: low wide mountain */}
    <Shape reduce={reduce} delay={0.35} from={{ y: 100 }}
      className="absolute bottom-0 left-[30%] h-[200px] w-[620px] bg-gradient-to-t from-brand-blue-100/60 to-brand-blue-100/15"
      style={{ clipPath: "polygon(0 100%, 45% 0, 100% 100%)" }} />
    {/* bottom-left: big fold */}
    <Shape reduce={reduce} delay={0.4} from={{ x: -90, y: 90 }}
      className="absolute -left-16 bottom-0 h-[220px] w-[520px] bg-gradient-to-t from-brand-blue-100/60 to-brand-blue-100/15"
      style={{ clipPath: "polygon(0 100%, 55% 0, 100% 100%)" }} />
    {/* bottom-left: second layer */}
    <Shape reduce={reduce} delay={0.45} from={{ x: -110, y: 40 }}
      className="absolute -left-24 bottom-0 h-[150px] w-[380px] bg-gradient-to-t from-brand-blue-100/60 to-brand-blue-100/20"
      style={{ clipPath: "polygon(0 100%, 0 20%, 100% 100%)" }} />
    {/* left-middle: faint fold */}
    <Shape reduce={reduce} delay={0.2} from={{ x: -100 }}
      className="absolute -left-20 top-[30%] h-[260px] w-[300px] bg-gradient-to-r from-brand-blue-100/50 to-brand-blue-100/5"
      style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
  </div>

  {/* blue corner triangle (wrapper ke bahar, solid rehta hai) */}
  <motion.div
    className="absolute left-0 bottom-10 hidden h-[130px] w-[80px] bg-brand-blue lg:block"
    style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
    initial={reduce ? false : { x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ ...SPRING, stiffness: 140, delay: 0.7 }}
  />
</div>

      <div className="mx-auto grid h-full max-w-[1240px] items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-0 lg:py-0 lg:pb-16">
        {/* ================= LEFT ================= */}
        <div className="relative z-10">
          {/* Eyebrow */}
          <div className="flex items-center gap-3.5">
            <motion.span
              aria-hidden="true"
              className="h-8 w-[3px] origin-top bg-brand-blue"
              {...fx({ scaleY: 0 }, { scaleY: 1 }, { duration: 0.5, delay: 0.2, ease: EASE })}
            />
            <motion.p
              className="text-[10.5px] font-medium uppercase text-brand-gray-500 sm:text-xs"
              {...fx(
                { opacity: 0, x: -18, letterSpacing: "0.42em" },
                { opacity: 1, x: 0, letterSpacing: "0.18em" },
                { duration: 0.9, delay: 0.3, ease: EASE }
              )}
            >
              Innovation&nbsp;&nbsp;/&nbsp;&nbsp;Technology&nbsp;&nbsp;/&nbsp;&nbsp;Solutions
            </motion.p>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-[2.25rem] font-extrabold uppercase leading-[1] tracking-[-0.035em] text-brand-black sm:text-[3rem] md:text-[3.5rem] lg:whitespace-nowrap lg:text-[clamp(3rem,4.4vw,4.75rem)]">
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="block"
                {...fx({ y: "110%" }, { y: 0 }, { duration: 0.8, delay: 0.4, ease: EASE })}
              >
                Build the
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="inline-block text-brand-blue"
                {...fx({ y: "110%", scale: 0.85 }, { y: 0, scale: 1 }, { ...SPRING, stiffness: 200, delay: 0.55 })}
              >
                Next
              </motion.span>{" "}
              <motion.span
                className="inline-block"
                {...fx({ x: -50, opacity: 0 }, { x: 0, opacity: 1 }, { duration: 0.8, delay: 0.7, ease: EASE })}
              >
                digital system
              </motion.span>
            </span>
          </h1>

          {/* Paragraph */}
          <motion.p
            className="mt-6 max-w-[560px] text-[15px] leading-[1.65] text-brand-gray-500 sm:text-base lg:text-[17px]"
            {...fx(
              { opacity: 0, y: 14, filter: "blur(8px)" },
              { opacity: 1, y: 0, filter: "blur(0px)" },
              { duration: 0.9, delay: 0.95, ease: EASE }
            )}
          >
            We craft modern web, mobile and custom software solutions that help businesses grow, scale and stay ahead in the digital era.
          </motion.p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <motion.div
                className="max-sm:w-full"
                {...fx({ opacity: 0, x: -44, scale: 0.9 }, { opacity: 1, x: 0, scale: 1 }, { ...SPRING, stiffness: 180, delay: 1.15 })}
                >
                <Link
                    href="/contact"
                    className="group relative inline-flex h-[50px] items-center justify-center gap-2.5 overflow-hidden rounded-full border border-transparent bg-brand-blue px-7 text-[15px] font-semibold text-brand-white shadow-[0_8px_18px_-8px_color-mix(in_srgb,var(--blue)_50%,transparent)] transition-all duration-300 hover:border-brand-black hover:bg-brand-blue-100 hover:text-brand-black active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue max-sm:w-full"
                    >
                    {/* HOVER SHINE: hover par left se right guzarti hai */}
                    <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full bg-linear-to-r from-transparent via-brand-white/80 to-transparent group-hover:translate-x-[300%] group-hover:transition-transform group-hover:duration-700 group-hover:ease-out"
                    />

                    <span className="relative !text-brand-white transition-colors duration-300 group-hover:!text-brand-black ">
                    Let&apos;s Build
                    </span>

                    <motion.span
                    className="relative inline-flex"
                    {...fx({ x: -18, opacity: 0 }, { x: 0, opacity: 1 }, { ...SPRING, delay: 1.55 })}
                    >
                    <ArrowRight
                        className="h-4 w-4 text-brand-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-black"
                        aria-hidden="true"
                    />
                    </motion.span>
                </Link>
             </motion.div>

            <motion.div
              className="max-sm:w-full"
              {...fx({ opacity: 0, y: 28, scale: 0.92 }, { opacity: 1, y: 0, scale: 1 }, { duration: 0.7, delay: 1.3, ease: EASE })}
            >
              <Link
                href="/services"
                className="inline-flex h-[50px] items-center justify-center rounded-full border border-brand-fg bg-brand-white px-7 text-[15px] font-semibold text-brand-fg transition-colors duration-200 hover:border-brand-blue hover:bg-brand-gray-50 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue max-sm:w-full"
              >
                Our Services
              </Link>
            </motion.div>
          </div>

          {/* Features */}
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0 lg:max-w-[560px]">
            {FEATURES.map(({ icon: Icon, a, b, from, item }, i) => (
              <motion.li
                key={a}
                className="relative flex items-center gap-2.5 sm:px-5 sm:first:pl-0"
                {...fx(item, { x: 0, y: 0, opacity: 1 }, { duration: 0.7, delay: 1.45 + i * 0.12, ease: EASE })}
              >
                {i > 0 && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 my-auto hidden h-8 w-px origin-top bg-brand-gray-200 sm:block"
                    {...fx({ scaleY: 0 }, { scaleY: 1 }, { duration: 0.5, delay: 1.6 + i * 0.12, ease: EASE })}
                  />
                )}
                <motion.span
                  className="inline-flex shrink-0"
                  {...fx(from, { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }, { ...SPRING, delay: 1.6 + i * 0.12 })}
                  whileHover={reduce ? undefined : { scale: 1.15, rotate: -6 }}
                >
                  <Icon className="h-6 w-6 text-brand-blue" strokeWidth={1.6} aria-hidden="true" />
                </motion.span>
                <span className="text-[13px] leading-snug text-brand-fg">
                  <span className="block font-medium">{a}</span>
                  <span className="block text-brand-gray-500">{b}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="relative mx-auto mb-14 mt-6 w-[min(72vw,300px)] sm:w-[340px] lg:mb-10 lg:ml-29 lg:mr-auto lg:mt-0 lg:w-[clamp(260px,22vw,340px)]">
          {/* Shadows */}
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[83%] h-[12%] w-[115%] -translate-x-1/2">
            <motion.div
              className="h-full w-full rounded-[50%] bg-brand-blue/35 blur-xl"
              {...fx({ scaleX: 0.2, opacity: 0 }, { scaleX: 1, opacity: 1 }, { duration: 1, delay: 1.0, ease: EASE })}
            />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[86.5%] h-[6%] w-[72%] -translate-x-1/2">
            <motion.div
              className="h-full w-full rounded-[50%] bg-brand-navy/60 blur-md"
              {...fx({ scaleX: 0.1, opacity: 0 }, { scaleX: 1, opacity: 1 }, { duration: 0.9, delay: 1.1, ease: EASE })}
            />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute left-[10%] top-[94%] h-[28%] w-[80%]">
            <motion.div
              className="h-full w-full bg-linear-to-b from-brand-blue-light/20 to-transparent blur-2xl"
              {...fx({ opacity: 0, y: -16 }, { opacity: 1, y: 0 }, { duration: 1.2, delay: 1.3, ease: EASE })}
            />
          </div>

          {/* Logo mark */}
          <motion.div
            {...fx(
              { opacity: 0, y: -50, scale: 0.8, rotate: -6, filter: "blur(10px)" },
              { opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" },
              { type: "spring", stiffness: 90, damping: 14, delay: 0.35 }
            )}
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
            >
              <Image
                src="/images/hero/codernatix-hero-visual.png"
                alt="Codernatix geometric logo mark rendered as a three-dimensional object"
                width={900}
                height={900}
                priority
                sizes="(min-width:1024px) 340px, 72vw"
                className="h-auto w-full"
              />
            </motion.div>
          </motion.div>

          {/* Lines + nodes (xl+) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 303 312"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible xl:block"
            fill="none"
          >
            {/* blue lines */}
            <g className="stroke-brand-blue/60" strokeWidth="1">
              <motion.path d="M-20.7 105 L-20.7 280" {...draw(1.2, 1.0)} />
              <motion.path d="M-31.8 234.6 L-6.4 225.6" {...draw(1.5, 0.5)} />
              <motion.path d="M-20.7 232 L198.5 352" {...draw(1.6, 1.2)} />
              <motion.path d="M92 23.7 L161.8 -25.9" {...draw(1.3, 0.8)} />
            </g>
            {/* gray details + callout connectors */}
            <g className="stroke-brand-gray-400/70" strokeWidth="1">
              <motion.path d="M-20.7 105 L0 90.5" {...draw(1.4, 0.5)} />
              <motion.path d="M186.6 27.8 L198.5 35.2" {...draw(1.5, 0.4)} />
              <motion.path d="M227 33 L268 -16 L308 -16" {...draw(1.6, 0.9)} />
              <motion.path d="M322 246 L346 214 L356 214" {...draw(1.8, 0.8)} />
            </g>
            {/* nodes */}
            <g className={reduce ? "" : "animate-pulse"}>
              <motion.circle cx="-20.7" cy="232" r="3.5" className="fill-brand-blue" {...dot(1.5)} />
              <motion.circle cx="128.2" cy="-2.5" r="2.5" className="fill-brand-blue" {...dot(1.3)} />
              <motion.circle cx="227" cy="33" r="3" className="fill-brand-blue-light" {...dot(1.6)} />
              <motion.circle cx="322" cy="246" r="3" className="fill-brand-blue-light" {...dot(1.8)} />
            </g>
          </svg>

          {/* Labels */}
          <motion.p
            className="absolute left-[103%] top-[-11.5%] hidden text-[10.5px] font-medium uppercase leading-[1.5] tracking-[0.14em] text-brand-gray-700 xl:block"
            {...fx({ opacity: 0, x: -16, filter: "blur(4px)" }, { opacity: 1, x: 0, filter: "blur(0px)" }, { duration: 0.7, delay: 2.2, ease: EASE })}
          >
            Ideas<br />Into<br />Reality
          </motion.p>
          <motion.p
            className="absolute left-[119%] top-[60.8%] hidden whitespace-nowrap text-[10.5px] font-medium uppercase leading-[1.5] tracking-[0.14em] text-brand-gray-700 xl:block"
            {...fx({ opacity: 0, y: 16, filter: "blur(4px)" }, { opacity: 1, y: 0, filter: "blur(0px)" }, { duration: 0.7, delay: 2.4, ease: EASE })}
          >
            Modern tech<br />for a better<br />tomorrow
          </motion.p>
        </div>
      </div>

      {/* ================= Scroll indicator ================= */}
      <div aria-hidden="true" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block">
        <motion.div {...fx({ opacity: 0, y: -20 }, { opacity: 1, y: 0 }, { duration: 0.8, delay: 2.3, ease: EASE })}>
          <motion.div
            className="flex flex-col items-center gap-1.5"
            animate={reduce ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          >
            <span className="relative h-8 w-5 rounded-full border border-brand-gray-500">
              <motion.span
                className="absolute inset-x-0 top-1.5 mx-auto h-1.5 w-px bg-brand-gray-500"
                animate={reduce ? undefined : { y: [0, 6, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-gray-500">Scroll down</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}