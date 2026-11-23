import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  AnimatedWords,
  Eyebrow,
  FadeBlur,
  SectionReveal,
  ShineLink,
} from "@/components/home/SolutionAnimation";
import { WRAP } from "@/lib/ui";

/*
 * Server component: closing CTA, dark section (Related above is gray-50).
 * Only strings are passed to the client animation components.
 */
export default function ServiceCTA({ service }) {
  return (
    <section
      aria-labelledby="service-cta-heading"
      className="relative overflow-hidden bg-brand-black text-brand-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 tech-grid opacity-20"
      />
      <div aria-hidden="true" className="ambient-blue -right-40 -top-40 opacity-80" />
      <div aria-hidden="true" className="ambient-blue -bottom-64 -left-40 opacity-40" />

      <SectionReveal className="py-16 sm:py-20 lg:py-28">
        <div className={`${WRAP} text-center`}>
          <div className="flex justify-center">
            <Eyebrow>Let&apos;s Talk</Eyebrow>
          </div>

          <h2
            id="service-cta-heading"
            className="mx-auto mt-6 max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
          >
            <AnimatedWords text="Planning" delay={0.2} />{" "}
            <AnimatedWords
              text={service.title}
              delay={0.45}
              shimmer
              className="bg-gradient-to-r from-brand-blue-light via-white to-brand-blue bg-clip-text text-transparent"
            />
            <AnimatedWords text="?" delay={0.7} />
          </h2>

          <FadeBlur
            as="p"
            delay={0.9}
            className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8"
          >
            Tell us about your goals and requirements, and we will help you
            work out a sensible next step.
          </FadeBlur>

          <FadeBlur
            delay={1.05}
            className="mt-9 flex flex-wrap items-center justify-center gap-5"
          >
            <ShineLink href="/contact">Discuss Your Project</ShineLink>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-[15px] font-semibold text-white/85 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Explore All Services
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </FadeBlur>
        </div>
      </SectionReveal>
    </section>
  );
}