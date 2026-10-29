"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle, Plus } from "lucide-react";
import { EASE, WRAP, SectionHead, Reveal } from "./AboutShared";

// Answers ko apni asli policy ke hisaab se confirm kar lo.
const FAQS = [
  {
    q: "What is Codernatix?",
    a: "Codernatix is a technology-focused brand that builds practical digital solutions, such as websites, custom software, mobile apps and integrations, to help businesses turn ideas into useful products.",
  },
  {
    q: "What types of projects do you work on?",
    a: "We work on websites and e-commerce platforms, custom software and mobile apps, AI solutions and cloud infrastructure. If you're unsure whether your idea fits, share it with us and we'll talk it through.",
  },
  {
    q: "How does a project begin?",
    a: "The first step is understanding the requirement, intended users, scope and constraints. A suitable approach and estimate can then be discussed.",
  },
  {
    q: "Do you work with startups and small businesses?",
    a: "We're happy to discuss projects of different sizes, including those from startups and small businesses. The right approach depends on your goals and requirements.",
  },
  {
    q: "How are cost and timeline estimated?",
    a: "Cost and timeline depend on the scope, features and complexity of the project, so we prefer to understand your requirements first and then discuss a realistic estimate.",
  },
  {
    q: "How can I contact Codernatix?",
    a: "Use the Contact page to send us an enquiry with a few details about your project.",
  },
];

export default function AboutFAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-brand-gray-50 py-16 sm:py-20 lg:py-24"
    >
      <div className={`${WRAP} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            align="left"
            id="faq-heading"
            label="FAQ"
            title="Questions You"
            highlight="Might Have"
            description="Short, honest answers to the things people usually ask first."
          />

          <Reveal delay={0.3} className="mt-8">
            <div className="rounded-2xl border border-brand-gray-200 bg-white p-5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                <MessageCircle size={20} aria-hidden="true" />
              </span>
              <p className="mt-3 text-sm font-semibold text-brand-black">Still have a question?</p>
              <p className="mt-1 text-sm leading-6 text-brand-gray-500">
                Send us a message and tell us about your project.
              </p>
              <Link
                href="/contact"
                className="group mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-blue-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
              >
                Contact us
                <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const id = `about-faq-${i}`;
            return (
              <Reveal key={f.q} delay={i * 0.06} y={20}>
                <div className="border-b border-brand-gray-200 first:border-t">
                  <h3>
                    <button
                      type="button"
                      id={`${id}-button`}
                      aria-expanded={isOpen}
                      aria-controls={`${id}-panel`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="group flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                    >
                      <span
                        className={`text-base font-semibold transition-colors duration-300 sm:text-lg ${
                          isOpen ? "text-brand-blue" : "text-brand-black group-hover:text-brand-blue"
                        }`}
                      >
                        {f.q}
                      </span>
                      <motion.span
                        aria-hidden="true"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                          isOpen
                            ? "border-brand-blue bg-brand-blue text-white"
                            : "border-brand-gray-200 bg-white text-brand-black"
                        }`}
                      >
                        <Plus size={16} />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`${id}-panel`}
                        role="region"
                        aria-labelledby={`${id}-button`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-12 text-sm leading-7 text-brand-gray-600 sm:text-base">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}