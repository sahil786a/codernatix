// components/home/FinalContactCTA.jsx

import Link from "next/link";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";

export default function FinalContactCTA() {
  return (
    <section
      id="final-contact"
      aria-labelledby="final-contact-heading"
      className="relative overflow-hidden bg-brand-black py-16 text-brand-white sm:py-20 lg:py-24"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 tech-grid opacity-20"
      />

      <div
        aria-hidden="true"
        className="ambient-blue -right-40 -top-40 opacity-70"
      />

      <div
        aria-hidden="true"
        className="ambient-blue -bottom-64 -left-40 opacity-40"
      />

      {/* Content */}
      <div className="site-container relative">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue-light">
            <Sparkles size={15} aria-hidden="true" />
            Your Next Big Idea Starts Here
          </span>

          <h2
            id="final-contact-heading"
            className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-6xl"
          >
            Let's Talk About{" "}
            <span className="bg-gradient-to-r from-brand-blue-light to-brand-blue bg-clip-text text-transparent">
              Your Next Project.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
            Have a project in mind? Let's discuss your goals and explore how
            the right digital solution can move your business forward.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-blue-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-light sm:w-auto"
            >
              <MessageSquare size={18} aria-hidden="true" />
              Start Your Project
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <p className="mt-6 text-xs leading-6 text-white/50 sm:text-sm">
            Tell us what you're building. Let's explore the next steps together.
          </p>
        </div>
      </div>
    </section>
  );
}