"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import { WRAP, SectionHead, Reveal } from "./AboutShared";

/*
 * Real founders/team add karne ke liye yahan entries daalo.
 * Photo na ho to initials dikhte hain. Sirf verified info daalo.
 *
 * { name: "Full Name", role: "Founder & ...", bio: "2 lines of bio.",
 *   photo: "/images/team/full-name.jpg",   // optional
 *   link: { label: "LinkedIn", href: "https://..." } }   // optional
 */
const TEAM = [];

function initials(name) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

export default function TeamSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="our-team"
      aria-labelledby="team-heading"
      className="relative overflow-hidden bg-brand-gray-50 py-16 sm:py-20 lg:py-24"
    >
      <div className={WRAP}>
        <SectionHead
          id="team-heading"
          label="Our Team"
          title="The People Behind"
          highlight="Codernatix"
          description={
            TEAM.length
              ? "Meet the people who shape and deliver your project."
              : undefined
          }
        />

        {TEAM.length > 0 ? (
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2 lg:mt-16">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} as="article" delay={i * 0.12} y={40}>
                <div className="group h-full overflow-hidden rounded-3xl border border-brand-gray-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-900/[0.06]">
                  <div className="relative mx-auto size-28 overflow-hidden rounded-full ring-4 ring-brand-gray-50">
                    {m.photo ? (
                      <Image src={m.photo} alt={`${m.name}, ${m.role}`} fill sizes="112px" className="object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-blue to-brand-blue-light text-2xl font-bold text-white">
                        {initials(m.name)}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-brand-black">{m.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-brand-blue">{m.role}</p>
                  <p className="mt-3 text-sm leading-6 text-brand-gray-500">{m.bio}</p>
                  {m.link && (
                    <a
                      href={m.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-xs font-semibold text-brand-black transition-colors hover:text-brand-blue"
                    >
                      {m.link.label}
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal y={40} className="mx-auto mt-12 max-w-3xl lg:mt-16">
            <div className="relative overflow-hidden rounded-3xl border border-brand-gray-200 bg-white p-8 text-center sm:p-12">
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-100/60 blur-3xl" />

              {/* neutral avatars (illustration, real log nahi) */}
              <div aria-hidden="true" className="relative mx-auto flex w-fit items-center">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={reduce ? undefined : { y: [0, -6, 0] }}
                    transition={{ duration: 3.6, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                    className={`flex size-16 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br ${
                      i === 1
                        ? "z-10 from-brand-blue to-brand-blue-light text-white"
                        : "from-brand-gray-100 to-brand-gray-200 text-brand-gray-400"
                    } ${i > 0 ? "-ml-4" : ""}`}
                  >
                    <User size={26} strokeWidth={1.8} />
                  </motion.span>
                ))}
              </div>

              <h3 className="relative mt-7 text-xl font-bold text-brand-black sm:text-2xl">
                Real people, working on real projects
              </h3>
              <p className="relative mx-auto mt-3 max-w-lg text-sm leading-7 text-brand-gray-500 sm:text-base">
                Detailed profiles of the people behind Codernatix will be added
                here soon. Until then, you&apos;re welcome to get in touch and
                talk to us directly about your project.
              </p>
              <Link
                href="/contact"
                className="group relative mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-blue-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
              >
                Get in touch
                <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}