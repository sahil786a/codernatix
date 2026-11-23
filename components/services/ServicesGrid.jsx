"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import NotchedProjectCard from "@/components/ui/NotchedProjectCard";
import { EASE, WRAP } from "@/lib/ui";

/*
 * Filterable grid of all services. Receives plain data (strings/arrays) from
 * the server page. Background: brand-gray-50 (#f8fafc); the card `surface`
 * must match it or a visible box appears in each card's corner.
 */
const SURFACE = "#f8fafc";

export default function ServicesGrid({ services = [], categories = [] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState("all");

  const visible =
    active === "all" ? services : services.filter((s) => s.category === active);

  return (
    <section
      aria-labelledby="services-grid-heading"
      className="relative bg-brand-gray-50 py-16 sm:py-20 lg:py-24"
    >
      <div className={WRAP}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="services-grid-heading"
            className="text-3xl font-bold leading-tight tracking-tight text-brand-black sm:text-4xl"
          >
            What we can help with
          </h2>

          <div
            role="group"
            aria-label="Filter services by category"
            className="flex flex-wrap gap-2"
          >
            {categories.map((c) => {
              const on = c.id === active;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(c.id)}
                  className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                    on
                      ? "border-brand-blue bg-brand-blue text-white"
                      : "border-brand-gray-200 bg-white text-brand-gray-600 hover:border-brand-black hover:text-brand-black"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} services
        </p>

        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((s, i) => (
              <motion.li
                key={s.id}
                layout={reduce ? false : true}
                initial={reduce ? false : { opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, delay: reduce ? 0 : (i % 3) * 0.06, ease: EASE }}
              >
                <NotchedProjectCard
                  href={`/services/${s.id}`}
                  title={s.title}
                  description={s.description}
                  image={s.image}
                  imageAlt=""
                  tags={s.tags || []}
                  surface={SURFACE}
                  accent={s.accent}
                  accentForeground="#ffffff"
                  idleDelay={i * 0.35}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}
