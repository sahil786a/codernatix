"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Cloud, Globe, Network, Palette, Smartphone } from "lucide-react";
import { WRAP, SectionHead, Reveal } from "./AboutShared";

// Sirf wahi capabilities rakho jo tum sach me deliver karte ho.
const CAPS = [
  { title: "Web & Software", text: "Websites, web applications, custom software and dashboards.", tags: ["Websites", "Web apps", "Custom software", "Dashboards"], Icon: Globe },
  { title: "Mobile & Digital Products", text: "Mobile apps, responsive interfaces and early prototypes.", tags: ["Apps", "Responsive interfaces", "Prototypes"], Icon: Smartphone },
  { title: "Business Integrations", text: "Connecting your systems through APIs, payments and third-party services.", tags: ["APIs", "Payments", "Third-party connections"], Icon: Network },
  { title: "Cloud & Automation", text: "Deployment, cloud services and automation where it makes sense.", tags: ["Deployment", "Cloud services", "Automation"], Icon: Cloud },
  { title: "UI/UX & Quality", text: "Interface design, usability and testing to keep the experience solid.", tags: ["Interface design", "Usability", "Testing"], Icon: Palette },
];

export default function ExpertiseSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);

  // highlight apne aap ghoomta hai (hover par ruk jaata hai)
  useEffect(() => {
    if (reduce || hold) return;
    const t = setInterval(() => setActive((a) => (a + 1) % CAPS.length), 3000);
    return () => clearInterval(t);
  }, [reduce, hold]);

  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="relative overflow-hidden bg-brand-black py-16 text-white sm:py-20 lg:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 tech-grid opacity-10" />
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, 40, -20, 0], y: [0, 24, -12, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl"
      />

      <div className={`${WRAP} grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            dark
            align="left"
            id="expertise-heading"
            label="Expertise & Capabilities"
            title="What We Can"
            highlight="Build With You"
            description="The right mix of skills depends on your project. Here are the areas we work in."
          />
          <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
            >
              Explore our services
              <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/technologies"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
            >
              Technologies we use
              <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <ul
          className="space-y-3"
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
        >
          {CAPS.map(({ title, text, tags, Icon }, i) => {
            const on = i === active;
            return (
              <Reveal key={title} as="li" delay={i * 0.08} x={30} y={0}>
                <div
                  onMouseEnter={() => setActive(i)}
                  className={`relative flex gap-4 overflow-hidden rounded-2xl border p-5 transition-all duration-500 sm:gap-5 sm:p-6 ${
                    on
                      ? "border-blue-400/40 bg-white/[0.07]"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-0.5 origin-top bg-blue-400 transition-transform duration-500 ${
                      on ? "scale-y-100" : "scale-y-0"
                    }`}
                  />
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl ring-1 transition-colors duration-500 ${
                      on
                        ? "bg-brand-blue text-white ring-blue-300/40"
                        : "bg-white/5 text-blue-300 ring-white/10"
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold tracking-tight">{title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-white/60">{text}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}