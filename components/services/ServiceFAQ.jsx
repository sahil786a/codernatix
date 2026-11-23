"use client";

import Accordion from "@/components/ui/Accordion";
import { WRAP } from "@/lib/ui";

/*
 * FAQ section. The FAQPage JSON-LD is emitted by ServiceTemplate (server),
 * not here.
 * Background: white (Technologies above is dark).
 */
export default function ServiceFAQ({ service }) {
  const accent = service.accent || "#2563eb";
  const faqs = service.faqs || [];

  if (!faqs.length) return null;

  return (
    <section
      aria-labelledby="service-faq-heading"
      className="relative bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className={`${WRAP} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14`}>
        <div className="min-w-0 lg:sticky lg:top-28 lg:h-fit">
          <p
            className="text-[13px] font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            FAQ
          </p>
          <h2
            id="service-faq-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-brand-black sm:text-4xl"
          >
            Common questions about {service.title.toLowerCase()}
          </h2>
          <p className="mt-4 text-base leading-7 text-brand-gray-600">
            Can&apos;t find what you are looking for? Get in touch and we will
            be happy to help.
          </p>
        </div>

        <Accordion items={faqs} defaultOpen={0} accent={accent} />
      </div>
    </section>
  );
}