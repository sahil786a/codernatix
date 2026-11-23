"use client";

import { motion, useReducedMotion } from "framer-motion";
import TechLogo from "@/components/ui/TechLogo";
import { EASE, WRAP } from "@/lib/ui";

/*
 * Technology chips with logos.
 * Background: brand-black (dark section). Logos sit on small white tiles
 * so dark logos (Next.js, Express, GitHub) stay visible.
 */
export default function ServiceTechnologies({ service }) {
  const reduce = useReducedMotion();
  const accent = service.accent || "#2563eb";
  const techs = service.technologies || [];

  if (!techs.length) return null;

  return (
    <section
      aria-labelledby="service-tech-heading"
      className="relative overflow-hidden bg-brand-black py-16 text-white sm:py-20 lg:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          animate={reduce ? undefined : { opacity: [0.25, 0.55, 0.25], scale: [1, 1.12, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: `${accent}40` }}
        />
      </div>

      <div className={WRAP}>
        <div className="max-w-2xl">
          <p
            className="text-[13px] font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            Technologies
          </p>
          <h2
            id="service-tech-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
          >
            Tools we commonly use
          </h2>
          <p className="mt-4 text-base leading-7 text-white/60">
            The right stack depends on your project. These are technologies we
            often work with for {service.title.toLowerCase()}.
          </p>
        </div>

        <ul className="mt-10 flex flex-wrap gap-3">
          {techs.map((name, i) => (
            <motion.li
              key={name}
              initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
              whileHover={reduce ? undefined : { y: -3 }}
            >
              <span className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 py-2 pl-2 pr-4 text-[15px] font-medium text-white/90 backdrop-blur transition-colors hover:border-white/25">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                  <TechLogo name={name} size={22} />
                </span>
                {name}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}