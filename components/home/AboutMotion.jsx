"use client";

import { useRef } from "react";
import {
  motion,
  MotionConfig,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* Section ke scroll transition ka wrapper */
export function SectionTransition({ children, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [56, 0]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [0.5, 1]);
  const lift = useTransform(scrollYProgress, [0, 1], [48, 0]);

  return (
    <MotionConfig reducedMotion="user">
      <div ref={ref}>
        <motion.div
          style={{
            scale,
            opacity: fade,
            borderTopLeftRadius: radius,
            borderTopRightRadius: radius,
            transformOrigin: "top center",
          }}
          className={className}
        >
          <motion.div style={{ y: lift }} className="w-full">
            {children}
          </motion.div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}

/* Left side stagger group */
export function Stagger({ children, className = "" }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ as = "div", children, className = "" }) {
  const Tag = motion[as];
  return (
    <Tag variants={itemVariant} className={className}>
      {children}
    </Tag>
  );
}

/* Right side fade-up */
export function FadeUp({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* 3D tilt */
export function TiltCard({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 18 });
  const springY = useSpring(y, { stiffness: 150, damping: 18 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

/* Floating badge */
export function FloatingBadge({ children, className = "" }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Spotlight (mouse glow) */
export function SpotlightCard({ children }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="group/spot relative overflow-hidden rounded-xl border border-brand-gray-200 bg-white transition-colors hover:border-brand-blue/30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--blue) 14%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}