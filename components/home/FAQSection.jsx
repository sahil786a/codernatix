// components/home/FAQSection.jsx

import Link from "next/link";
import { ArrowRight, ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    id: "services",
    question: "What services does Codernatix offer?",
    answer:
      "We offer software and web development, mobile app development, e-commerce solutions, AI and automation, cloud and DevOps, UI/UX design, digital marketing, and IT consulting.",
  },
  {
    id: "start-project",
    question: "How do I start a project with Codernatix?",
    answer:
      "Start by contacting us with your idea, business goals, and project requirements. We can discuss the scope, suitable approach, and next steps for your project.",
  },
  {
    id: "custom-solutions",
    question: "Can you build custom solutions for my business?",
    answer:
      "Yes. We can discuss a solution tailored to your business requirements, workflows, target users, and goals.",
  },
  {
    id: "startups",
    question: "Do you work with startups and small businesses?",
    answer:
      "Yes. We can discuss solutions based on your business stage, priorities, requirements, and available budget.",
  },
  {
    id: "maintenance",
    question: "Do you provide website and software maintenance?",
    answer:
      "Maintenance and ongoing support can be discussed according to your project's scope and the service terms agreed upon.",
  },
  {
    id: "cost",
    question: "How much does a project cost?",
    answer:
      "Project cost depends on features, complexity, integrations, timeline, and overall scope. Contact us to discuss your requirements and request a project estimate.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-brand-gray-50 py-16 sm:py-20 lg:py-24"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 tech-grid opacity-40"
      />

      {/* Content */}
      <div className="site-container relative">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">
            <HelpCircle size={16} aria-hidden="true" />
            Frequently Asked Questions
          </span>

          <h2
            id="faq-heading"
            className="mt-5 text-3xl font-bold leading-tight tracking-tight text-brand-black sm:text-4xl lg:text-5xl"
          >
            Got Questions?{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-blue-light bg-clip-text text-transparent">
              We've Got Answers.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-brand-gray-500 sm:text-base sm:leading-8">
            Find answers to common questions about our services, project
            process, and working with Codernatix.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto mt-10 max-w-4xl space-y-4 sm:mt-14">
          {FAQS.map((faq, index) => (
            <details
              key={faq.id}
              className="group rounded-2xl border border-brand-gray-200 bg-brand-white transition-colors duration-300 open:border-brand-blue/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                <span className="flex min-w-0 items-start gap-4">
                  <span className="shrink-0 pt-0.5 font-brand text-sm font-bold text-brand-blue">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-left text-sm font-semibold leading-6 text-brand-black sm:text-base">
                    {faq.question}
                  </span>
                </span>

                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-gray-50 text-brand-gray-600 transition-all duration-300 group-open:rotate-180 group-open:bg-brand-blue group-open:text-white">
                  <ChevronDown size={18} aria-hidden="true" />
                </span>
              </summary>

              <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                <div className="ml-0 border-l-2 border-brand-blue/20 pl-4 sm:ml-9">
                  <p className="text-sm leading-7 text-brand-gray-500 sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center sm:mt-12">
          <p className="text-sm text-brand-gray-600 sm:text-base">
            Still have questions? Let's discuss your project.
          </p>

          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-blue-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
          >
            Contact Our Team
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}