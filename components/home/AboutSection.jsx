import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Layers3,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import TagMarquee from "./TagMarquee";
import {
  SectionTransition,
  Stagger,
  StaggerItem,
  FadeUp,
  TiltCard,
  FloatingBadge,
  SpotlightCard,
} from "./AboutMotion";


import {
  AnimatedCheckIcon,
  AnimatedWords,
  ShimmerText,
  AnimatedUnderline,
} from "./AboutAnimated";





const capabilities = [
  "Websites and e-commerce platforms",
  "Custom software and mobile apps",
  "AI solutions and cloud infrastructure",
  "Technology aligned with business goals",
];

const highlights = [
  {
    icon: Lightbulb,
    title: "Strategy First",
    description: "Understand the business need before choosing technology.",
  },
  {
    icon: Code2,
    title: "Purposeful Engineering",
    description: "Build practical products around real requirements.",
  },
  {
    icon: Layers3,
    title: "Built to Scale",
    description: "Plan for maintainability, performance and growth.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative snap-start overflow-hidden bg-white"
    >
      <SectionTransition className="relative flex min-h-[calc(100svh-76px)] items-center overflow-hidden bg-brand-gray-50 py-10 will-change-transform lg:py-8">
        {/* Background (pure CSS) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(color-mix(in_srgb,var(--black)_14%,transparent)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
        <div className="pointer-events-none absolute -right-32 top-8 h-80 w-80 rounded-full bg-brand-blue/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-brand-blue/5 blur-3xl" />

        {/* old: <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14"> */}
<div className="relative mx-auto grid w-full max-w-none grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12 xl:px-20">
          {/* LEFT */}
          <Stagger>
            <StaggerItem
              as="span"
              className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue shadow-sm backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
              </span>
              Who We Are
            </StaggerItem>

            <StaggerItem
              as="h2"
              className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight text-brand-black sm:text-4xl xl:text-5xl"
            >
              <span id="about-heading">
                <AnimatedWords text="Turning Ideas Into" />{" "}
                <span className="relative inline-block whitespace-nowrap">
                  {/* old:
                  <span className="bg-gradient-to-r from-brand-blue to-brand-blue-light bg-clip-text text-transparent">
                    Digital Products
                  </span>
                  */}
                  <ShimmerText className="bg-gradient-to-r from-brand-blue to-brand-blue-light bg-clip-text text-transparent">
                    Digital Products
                  </ShimmerText>

                  {/* old svg:
                  <svg aria-hidden="true" viewBox="0 0 300 12" preserveAspectRatio="none"
                    className="absolute -bottom-2 left-0 h-2.5 w-full text-brand-blue/40">
                    <path d="M2 9 C 70 2, 160 2, 298 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  */}
                  <AnimatedUnderline className="absolute -bottom-2 left-0 h-2.5 w-full text-brand-blue/40" />
                </span>
              </span>
            </StaggerItem>

            <StaggerItem
              as="p"
              className="mt-5 max-w-xl text-base leading-7 text-brand-gray-600"
            >
              Codernatix is a technology and digital solutions company helping
              businesses build, improve and scale their digital presence,
              bringing technology, design and strategy together into practical
              solutions.
            </StaggerItem>

            <StaggerItem className="mt-4 max-w-md">
              <TagMarquee />
            </StaggerItem>

            <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {capabilities.map((capability, index) => (
                <StaggerItem
                  as="li"
                  key={capability}
                  className="flex items-start gap-2.5 text-sm leading-6 text-brand-gray-700"
                >
                  {/* old:
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-blue" aria-hidden="true" />
                  */}
                  <AnimatedCheckIcon
                    size={18}
                    delay={0.5 + index * 0.14}
                    className="mt-0.5 shrink-0 text-brand-blue"
                  />
                  <span>{capability}</span>
                </StaggerItem>
              ))}
            </ul>

            <StaggerItem>
              <Link
                href="/about"
                className="group relative mt-6 inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-black px-6 py-3 text-sm font-semibold !text-brand-white shadow-lg shadow-brand-black/20 transition-all hover:-translate-y-0.5 hover:bg-brand-blue hover:shadow-brand-blue/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[400%]"
                />
                <span className="relative">More About Codernatix</span>
                <ArrowRight
                  size={17}
                  aria-hidden="true"
                  className="relative transition-transform group-hover:translate-x-1"
                />
              </Link>
            </StaggerItem>
          </Stagger>

          {/* RIGHT */}
          <FadeUp className="relative">
            <TiltCard>
              <div className="relative overflow-hidden rounded-[1.6rem] p-[1.5px] shadow-xl shadow-brand-black/10">
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_280deg,var(--blue)_340deg,var(--blue-light)_360deg)] motion-reduce:animate-none"
                />

                <div className="relative overflow-hidden rounded-3xl bg-white">
                  <div className="relative h-44 sm:h-52 lg:h-[30vh] lg:max-h-72 lg:min-h-44">
                    <Image
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85"
                      alt="Team collaborating on a digital technology project"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent" />

                    <FloatingBadge className="absolute right-4 top-4 flex items-center gap-2 rounded-xl border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                      <Sparkles size={14} aria-hidden="true" />
                      Idea to Launch
                    </FloatingBadge>

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                        Our Approach
                      </span>

                      <h3 className="mt-2.5 text-xl font-bold leading-tight text-white sm:text-2xl">
                        From idea to impact.
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-2 bg-brand-gray-50/60 p-3 sm:p-4">
                    {highlights.map(
                      ({ icon: Icon, title, description }, index) => (
                        <SpotlightCard key={title}>
                          <div className="flex items-center gap-3.5 px-4 py-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-brand-blue/10 bg-brand-blue/5 text-brand-blue transition-colors group-hover/spot:bg-brand-blue group-hover/spot:text-white">
                              <Icon size={19} aria-hidden="true" />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold tracking-wider text-brand-blue">
                                  0{index + 1}
                                </span>
                                <h4 className="text-sm font-semibold text-brand-black sm:text-base">
                                  {title}
                                </h4>
                              </div>

                              <p className="mt-0.5 text-xs leading-5 text-brand-gray-500 sm:text-sm">
                                {description}
                              </p>
                            </div>
                          </div>
                        </SpotlightCard>
                      )
                    )}
                  </div>
                </div>
              </div>
            </TiltCard>
          </FadeUp>
        </div>
      </SectionTransition>
    </section>
  );
}