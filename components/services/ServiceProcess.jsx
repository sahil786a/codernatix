"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE, WRAP } from "@/lib/ui";

/*
 * Service-specific process timeline.
 * Mobile: vertical line on the left. Desktop (lg+): horizontal row.
 * Background: brand-gray-50.
 */
export default function ServiceProcess({ service }) {
  const reduce = useReducedMotion();
  const accent = service.accent || "#2563eb";
  const steps = service.process || [];

  if (!steps.length) return null;

  return (
    <section
      aria-labelledby="service-process-heading"
      className="relative overflow-hidden bg-brand-gray-50 py-16 sm:py-20 lg:py-24"
    >
      <div className={WRAP}>
        <div className="max-w-2xl">
          <p
            className="text-[13px] font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            How we work
          </p>
          <h2
            id="service-process-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-brand-black sm:text-4xl"
          >
            Our {service.title} process
          </h2>
        </div>

        <ol className="relative mt-12 space-y-8 lg:grid lg:space-y-0 lg:gap-6 lg:[grid-template-columns:repeat(var(--steps),minmax(0,1fr))]"
          style={{ "--steps": steps.length }}
        >
          {/* connecting line: vertical on mobile */}
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-[19px] top-3 w-px lg:hidden"
            style={{ background: `linear-gradient(to bottom, ${accent}66, ${accent}1a)` }}
          />
          {/* connecting line: horizontal on desktop */}
          <span
            aria-hidden="true"
            className="absolute left-5 right-5 top-5 hidden h-px lg:block"
            style={{ background: `linear-gradient(to right, ${accent}66, ${accent}1a)` }}
          />

          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="relative pl-14 lg:pl-0 lg:pt-14"
            >
              <span
                className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white text-sm font-bold"
                style={{ borderColor: accent, color: accent }}
              >
                <span className="sr-only">Step </span>
                {i + 1}
                {!reduce && i === 0 && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${accent}` }}
                    animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
              </span>
              <h3 className="text-lg font-bold text-brand-black">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-brand-gray-600">
                {step.text}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}