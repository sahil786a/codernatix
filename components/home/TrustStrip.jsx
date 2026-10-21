"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  MotionConfig,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Blocks,
  Scaling,
  Cpu,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const TRUST_VALUES = [
  {
    icon: Blocks,
    title: "Custom-Built",
    description: "Solutions designed around your requirements.",
  },
  {
    icon: Scaling,
    title: "Scalable",
    description: "Built to grow with your business.",
  },
  {
    icon: Cpu,
    title: "Modern Technology",
    description: "Using relevant and reliable technologies.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description: "Quality and security considered from the start.",
  },
  {
    icon: Headphones,
    title: "Long-Term Support",
    description: "Support beyond launch, based on the agreed scope.",
  },
];

function TrustCard({ item, duplicate = false }) {
  const Icon = item.icon;

  return (
    <li
      aria-hidden={duplicate ? "true" : undefined}
      className="trust-marquee-card w-[200px] shrink-0 will-change-transform sm:w-[220px]"
    >
      <div className="flex min-h-[230px] flex-col items-start gap-4 rounded-2xl border border-brand-blue/10 bg-white p-5 shadow-sm shadow-brand-black/5 sm:min-h-[260px] sm:p-6">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-blue/10 bg-brand-blue/5 text-brand-blue">
          <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
        </span>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold leading-5 text-brand-black">
            {item.title}
          </h2>

          <p className="mt-2 text-sm leading-5 text-brand-gray-500">
            {item.description}
          </p>
        </div>
      </div>
    </li>
  );
}

export default function TrustStrip() {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  /* ---------- Scroll transition ---------- */
  // 0 = strip screen ke neeche se aa rahi hai, 1 = strip screen ke 65% par pahunch gayi
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 65%"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [0.5, 1]);
  const lift = useTransform(scrollYProgress, [0, 1], [36, 0]);

  /* ---------- Marquee + tilt ---------- */
  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;

    if (!track || !section) return;

    const groups = track.querySelectorAll(".trust-marquee-group");
    const cards = Array.from(
      track.querySelectorAll(".trust-marquee-card")
    );

    if (groups.length !== 2 || cards.length === 0) return;

    const firstGroup = groups[0];
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let offset = 0;
    let previousTime = 0;
    let frameId = 0;
    let isVisible = true;

    const speed = 38; // pixels per second

    const update = (time) => {
      frameId = 0;

      if (!isVisible) {
        previousTime = 0;
        return;
      }

      if (motionPreference.matches) {
        track.style.transform = "translate3d(0, 0, 0)";

        cards.forEach((card) => {
          card.style.transform =
            "perspective(900px) rotateY(0deg) rotateZ(0deg) scale(1)";
        });

        previousTime = 0;
        return;
      }

      if (previousTime === 0) previousTime = time;

      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      const loopWidth = firstGroup.getBoundingClientRect().width;

      if (loopWidth > 0) {
        offset = (offset + speed * delta) % loopWidth;
      }

      track.style.transform = `translate3d(${-offset}px, 0, 0)`;

      const viewportCenter = window.innerWidth / 2;
      const influenceDistance = Math.min(window.innerWidth * 0.38, 420);

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;

        const raw = (cardCenter - viewportCenter) / influenceDistance;
        const position = Math.max(-1, Math.min(1, raw));
        const distance = Math.abs(position);

        const deadZone = 0.08;
        const t = Math.max(0, (distance - deadZone) / (1 - deadZone));
        const eased = t * t * (3 - 2 * t);

        const sign = Math.sign(position);
        const rotateZ = sign * eased * 14;
        const rotateY = sign * eased * -18;
        const scaleCard = 1 - eased * 0.12;

        card.style.transform =
          `perspective(900px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scaleCard})`;
      });

      frameId = window.requestAnimationFrame(update);
    };

    const start = () => {
      if (!frameId && isVisible) {
        frameId = window.requestAnimationFrame(update);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;

      if (isVisible) {
        previousTime = 0;
        start();
      } else {
        if (frameId) window.cancelAnimationFrame(frameId);
        frameId = 0;
        previousTime = 0;
      }
    });

    observer.observe(section);

    const onMotionChange = () => {
      previousTime = 0;
      start();
    };

    motionPreference.addEventListener("change", onMotionChange);
    window.addEventListener("resize", onMotionChange);

    start();

    return () => {
      observer.disconnect();
      motionPreference.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", onMotionChange);

      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {/* Outer: static wrapper (observer + scroll target). bg pichle section jaisa rakho */}
      <section
        ref={sectionRef}
        aria-label="Codernatix business values"
        className="relative overflow-hidden bg-white"
      >
        {/* Inner: ye animate hota hai */}
        <motion.div
          style={{
            scale,
            opacity: fade,
            borderTopLeftRadius: radius,
            borderTopRightRadius: radius,
            transformOrigin: "top center",
          }}
          className="relative overflow-hidden border-y border-brand-gray-200 bg-white py-12 will-change-transform sm:py-14"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent sm:w-14" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent sm:w-14" />

          <motion.div style={{ y: lift }}>
            <div
              ref={trackRef}
              className="trust-marquee-track flex w-max items-center"
            >
              {[0, 1].map((group) => (
                <ul
                  key={group}
                  aria-label={group === 0 ? "Business values" : undefined}
                  className="trust-marquee-group flex shrink-0 items-center gap-5 px-2 sm:gap-7 sm:px-3"
                >
                  {TRUST_VALUES.map((item) => (
                    <TrustCard
                      key={`${group}-${item.title}`}
                      item={item}
                      duplicate={group === 1}
                    />
                  ))}
                </ul>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}