"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Palette,
  Layers3,
  Server,
  Database,
  Smartphone,
  Cloud,
  Brain,
  Workflow,
  GitBranch,
  Cpu,
  Sparkles,
  Webhook,
} from "lucide-react";

import { technologyCategories } from "@/data/technologies";
import {
  SectionReveal,
  Eyebrow,
  AnimatedWords,
  FadeBlur,
  ShineLink,
} from "./SolutionAnimation";

const EASE = [0.22, 1, 0.36, 1];
const DESIGN = 740; // stage ka design size (px); available jagah ke hisab se scale hota hai
const SUN = 140;

const CATEGORY_ICONS = {
  frontend: Code2,
  backend: Server,
  database: Database,
  mobile: Smartphone,
  cloud: Cloud,
  ai: Brain,
  devops: Workflow,
  tools: GitBranch,
  design: Palette,
  other: Layers3,
};

const ACCENTS = [
  "#60a5fa", // blue
  "#a78bfa", // violet
  "#34d399", // emerald
  "#fb923c", // orange
  "#f472b6", // pink
  "#22d3ee", // cyan
  "#facc15", // yellow
  "#f87171", // red
];

/* ---------------------------------------------------------------- */
/* Logos                                                             */
/* ---------------------------------------------------------------- */

const DEVICON = (path) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${path}`;

/*
 * Keys NORMALIZED hain: lowercase, sirf a-z 0-9 aur "+".
 * "Next.js" -> "nextjs", "Tailwind CSS" -> "tailwindcss", "CI/CD" -> "cicd"
 *
 * { slug, color } => Simple Icons CDN
 * { url }         => seedha image URL
 */
const TECHNOLOGY_LOGOS = {
  html: { slug: "html5", color: "E34F26" },
  html5: { slug: "html5", color: "E34F26" },
  css: { slug: "css", color: "663399" },
  css3: { slug: "css", color: "663399" },
  javascript: { slug: "javascript", color: "F7DF1E" },
  js: { slug: "javascript", color: "F7DF1E" },
  typescript: { slug: "typescript", color: "3178C6" },
  ts: { slug: "typescript", color: "3178C6" },
  react: { slug: "react", color: "61DAFB" },
  reactjs: { slug: "react", color: "61DAFB" },
  nextjs: { slug: "nextdotjs", color: "000000" },
  tailwind: { slug: "tailwindcss", color: "06B6D4" },
  tailwindcss: { slug: "tailwindcss", color: "06B6D4" },
  vite: { slug: "vite", color: "646CFF" },
  bootstrap: { slug: "bootstrap", color: "7952B3" },
  redux: { slug: "redux", color: "764ABC" },

  nodejs: { slug: "nodedotjs", color: "5FA04E" },
  node: { slug: "nodedotjs", color: "5FA04E" },
  express: { slug: "express", color: "000000" },
  expressjs: { slug: "express", color: "000000" },
  php: { slug: "php", color: "777BB4" },
  laravel: { slug: "laravel", color: "FF2D20" },
  python: { slug: "python", color: "3776AB" },
  django: { slug: "django", color: "092E20" },
  java: { slug: "openjdk", color: "437291" },
  "c++": { slug: "cplusplus", color: "00599C" },
  graphql: { slug: "graphql", color: "E10098" },
  postman: { slug: "postman", color: "FF6C37" },

  mysql: { slug: "mysql", color: "4479A1" },
  postgresql: { slug: "postgresql", color: "4169E1" },
  postgres: { slug: "postgresql", color: "4169E1" },
  mongodb: { slug: "mongodb", color: "47A248" },
  redis: { slug: "redis", color: "FF4438" },
  firebase: { slug: "firebase", color: "DD2C00" },
  supabase: { slug: "supabase", color: "3FCF8E" },

  reactnative: { slug: "react", color: "61DAFB" },
  flutter: { slug: "flutter", color: "02569B" },
  android: { slug: "android", color: "3DDC84" },
  ios: { slug: "apple", color: "000000" },

  // AWS / Azure: Simple Icons me nahi hain, isliye Devicon se
  aws: { url: DEVICON("amazonwebservices/amazonwebservices-original-wordmark.svg") },
  amazonwebservices: { url: DEVICON("amazonwebservices/amazonwebservices-original-wordmark.svg") },
  azure: { url: DEVICON("azure/azure-original.svg") },
  microsoftazure: { url: DEVICON("azure/azure-original.svg") },
  gcp: { slug: "googlecloud", color: "4285F4" },
  googlecloud: { slug: "googlecloud", color: "4285F4" },
  docker: { slug: "docker", color: "2496ED" },
  kubernetes: { slug: "kubernetes", color: "326CE5" },
  nginx: { slug: "nginx", color: "009639" },
  vercel: { slug: "vercel", color: "000000" },
  netlify: { slug: "netlify", color: "00C7B7" },
  git: { slug: "git", color: "F05032" },
  github: { slug: "github", color: "181717" },
  gitlab: { slug: "gitlab", color: "FC6D26" },

  figma: { slug: "figma", color: "F24E1E" },
  wordpress: { slug: "wordpress", color: "21759B" },
  jest: { slug: "jest", color: "C21325" },

  tensorflow: { slug: "tensorflow", color: "FF6F00" },
  pytorch: { slug: "pytorch", color: "EE4C2C" },
  machinelearning: { slug: "scikitlearn", color: "F7931E" },
};

/*
 * Jin technologies ka brand logo nahi hota (ya CDN pe nahi hai),
 * unke liye icon. Logo load fail ho to bhi yahi icon dikhta hai.
 */
const ICON_FALLBACKS = {
  restapi: { Icon: Webhook, color: "#0ea5e9" },
  restapis: { Icon: Webhook, color: "#0ea5e9" },
  api: { Icon: Webhook, color: "#0ea5e9" },
  apis: { Icon: Webhook, color: "#0ea5e9" },
  cicd: { Icon: Workflow, color: "#f97316" },
  devops: { Icon: Workflow, color: "#f97316" },
  aiapis: { Icon: Brain, color: "#10a37f" },
  aiapi: { Icon: Brain, color: "#10a37f" },
  openai: { Icon: Brain, color: "#10a37f" },
  ai: { Icon: Brain, color: "#10a37f" },
  automation: { Icon: Workflow, color: "#f97316" },
  aws: { Icon: Cloud, color: "#FF9900" },
  azure: { Icon: Cloud, color: "#0078D4" },
  cloud: { Icon: Cloud, color: "#38bdf8" },
};

const keyOf = (name) => String(name).toLowerCase().replace(/[^a-z0-9+]/g, "");

function getTechnologyLogo(name) {
  return TECHNOLOGY_LOGOS[keyOf(name)] || null;
}

function TechLogo({ name, size = 24 }) {
  const logo = getTechnologyLogo(name);
  const [failed, setFailed] = useState(false);

  const src = logo
    ? logo.url || `https://cdn.simpleicons.org/${logo.slug}/${logo.color}`
    : null;

  if (!src || failed) {
    const fb = ICON_FALLBACKS[keyOf(name)];
    if (fb) {
      const FallbackIcon = fb.Icon;
      return (
        <FallbackIcon
          size={size}
          strokeWidth={1.9}
          style={{ color: fb.color }}
          aria-hidden="true"
        />
      );
    }
    return <Code2 size={size} strokeWidth={1.8} className="text-slate-500" aria-hidden="true" />;
  }

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
  );
}

/* ---------------------------------------------------------------- */
/* Stars (seeded, hydration-safe)                                    */
/* ---------------------------------------------------------------- */

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STARS = (() => {
  const r = mulberry32(7);
  return Array.from({ length: 90 }, () => ({
    x: +(r() * 100).toFixed(2),
    y: +(r() * 100).toFixed(2),
    s: +(0.6 + r() * 1.8).toFixed(2),
    d: +(r() * 5).toFixed(2),
    t: +(2.5 + r() * 4).toFixed(2),
  }));
})();

/* ---------------------------------------------------------------- */
/* Rings builder                                                     */
/* ---------------------------------------------------------------- */

function buildRings(categories, activeId) {
  if (activeId === "all") {
    const k = categories.length;
    const rMin = 105;
    const rMax = 350;
    const step = k > 1 ? Math.min(80, (rMax - rMin) / (k - 1)) : 0;
    const size = Math.max(36, Math.min(60, Math.round(step - 3)));

    return categories.map((c, i) => ({
      id: c.id,
      label: c.title,
      accent: ACCENTS[i % ACCENTS.length],
      radius: k > 1 ? rMin + i * step : 230,
      size,
      duration: 70 + i * 22,
      dir: i % 2 === 0 ? "normal" : "reverse",
      offset: (i * 47) % 360,
      techs: c.technologies,
      showLabel: true,
    }));
  }

  const idx = categories.findIndex((c) => c.id === activeId);
  const cat = categories[idx];
  const techs = cat.technologies;
  const n = techs.length;
  const ringCount = n <= 6 ? 1 : n <= 12 ? 2 : 3;
  const radii = ringCount === 1 ? [250] : ringCount === 2 ? [180, 305] : [140, 235, 330];
  const per = Math.ceil(n / ringCount);

  return radii
    .map((radius, i) => ({
      id: `${cat.id}-${i}`,
      label: cat.title,
      accent: ACCENTS[idx % ACCENTS.length],
      radius,
      size: 76,
      duration: 50 + i * 20,
      dir: i % 2 === 0 ? "normal" : "reverse",
      offset: i * 40,
      techs: techs.slice(i * per, (i + 1) * per),
      showLabel: false,
    }))
    .filter((r) => r.techs.length > 0);
}

/* ---------------------------------------------------------------- */
/* Planet                                                            */
/* ---------------------------------------------------------------- */

function Planet({ name, size, angle, radius, duration, counterDir, accent, order }) {
  return (
    <div
      className="absolute left-0 top-0 h-0 w-0 hover:z-50"
      style={{ transform: `rotate(${angle}deg) translateX(${radius}px)` }}
    >
      <div className="absolute left-0 top-0 h-0 w-0" style={{ transform: `rotate(${-angle}deg)` }}>
        <div
          className="group/planet absolute"
          style={{
            left: -size / 2,
            top: -size / 2,
            width: size,
            height: size,
            animation: `cx-spin ${duration}s linear infinite ${counterDir}`,
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25 + order * 0.05, type: "spring", stiffness: 200, damping: 16 }}
            className="relative h-full w-full"
          >
            <div
              className="flex h-full w-full items-center justify-center rounded-full transition-transform duration-300 group-hover/planet:scale-125"
              style={{
                background: "radial-gradient(circle at 30% 25%, #ffffff, #eef1ff 55%, #cfd6ff)",
                boxShadow: `0 0 0 1px rgba(255,255,255,0.55), 0 0 22px ${accent}66, inset -4px -6px 10px rgba(80,90,160,0.18)`,
              }}
            >
              <TechLogo name={name} size={Math.round(size * 0.56)} />
            </div>
            <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black/80 px-2 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur transition-opacity duration-200 group-hover/planet:opacity-100">
              {name}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Main                                                              */
/* ---------------------------------------------------------------- */

export default function TechnologiesSection() {
  const reduce = useReducedMotion();
  const categories = technologyCategories;
  const [mode, setMode] = useState("all");

  const wrapRef = useRef(null);
  const [scale, setScale] = useState(0.7);

  // orbit ko available width + height dono ke hisab se fit karo
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.min(1.3, Math.min(width, height) / DESIGN));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const total = useMemo(
    () => categories.reduce((sum, c) => sum + c.technologies.length, 0),
    [categories]
  );

  const activeIndex = categories.findIndex((c) => c.id === mode);
  const activeCat = activeIndex >= 0 ? categories[activeIndex] : null;
  const accent = activeCat ? ACCENTS[activeIndex % ACCENTS.length] : "#3b82f6";
  const rings = useMemo(() => buildRings(categories, mode), [categories, mode]);

  const SunIcon = activeCat ? CATEGORY_ICONS[activeCat.icon] || Cpu : Sparkles;
  const sunTitle = activeCat ? activeCat.title : "Tech Stack";
  const sunCount = activeCat ? activeCat.technologies.length : total;

  const tabs = [
    { id: "all", title: "All", Icon: Sparkles, color: "#ffffff", count: total },
    ...categories.map((c, i) => ({
      id: c.id,
      title: c.title,
      Icon: CATEGORY_ICONS[c.icon] || Cpu,
      color: ACCENTS[i % ACCENTS.length],
      count: c.technologies.length,
    })),
  ];

  return (
    <section
      id="technologies"
      aria-labelledby="technologies-heading"
      className="relative overflow-hidden bg-[#050714] text-white"
    >
      <style>{`
        @keyframes cx-spin { to { transform: rotate(360deg); } }
        @keyframes cx-twinkle { 0%,100% { opacity: .15; transform: scale(.8); } 50% { opacity: 1; transform: scale(1.25); } }
        @keyframes cx-shoot {
          0% { transform: translate3d(0,0,0) rotate(35deg); opacity: 0; }
          2% { opacity: 1; }
          12% { transform: translate3d(420px,300px,0) rotate(35deg); opacity: 0; }
          100% { transform: translate3d(420px,300px,0) rotate(35deg); opacity: 0; }
        }
        @keyframes cx-sun { 0%,100% { opacity: .5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.12); } }
        @media (prefers-reduced-motion: reduce) {
          .cx-star, .cx-shoot, .cx-sun { animation: none !important; }
        }
      `}</style>

      {/* ---------- SPACE BACKGROUND ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-[460px] w-[460px] rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-3xl" />

        {STARS.map((s, i) => (
          <span
            key={i}
            className="cx-star absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.s,
              height: s.s,
              animation: `cx-twinkle ${s.t}s ease-in-out ${s.d}s infinite`,
            }}
          />
        ))}

        <span
          className="cx-shoot absolute left-[8%] top-[6%] h-px w-28 bg-gradient-to-r from-transparent via-white/70 to-white"
          style={{ animation: "cx-shoot 9s linear 2s infinite" }}
        />
        <span
          className="cx-shoot absolute left-[45%] top-[2%] h-px w-24 bg-gradient-to-r from-transparent via-white/60 to-white"
          style={{ animation: "cx-shoot 13s linear 6s infinite" }}
        />
      </div>

      {/* ================= FIRST SCREEN: header + tabs + orbit + info ================= */}
      <div className="relative mx-auto flex w-full max-w-[1320px] flex-col px-5 py-14 sm:px-8 lg:h-screen lg:min-h-[700px] lg:pb-4 lg:pt-20">
        {/* HEADER */}
        <SectionReveal className="shrink-0">
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow>Our Technology Stack</Eyebrow>

            <h2
              id="technologies-heading"
              className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
            >
              <AnimatedWords text="Built With the" delay={0.25} />{" "}
              <AnimatedWords
                text="Right Technologies"
                delay={0.6}
                shimmer
                className="bg-gradient-to-r from-blue-400 via-sky-200 to-blue-400 bg-clip-text text-transparent"
              />
            </h2>

            <FadeBlur
              as="p"
              delay={0.9}
              className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base"
            >
              Modern tools selected for performance, security, scalability, and
              your business requirements.
            </FadeBlur>
          </div>
        </SectionReveal>

        {/* 3 COLUMNS: tabs | orbit | info */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-2 lg:min-h-0 lg:flex-1 lg:grid-cols-[220px_minmax(0,1fr)_320px] lg:items-center lg:gap-6 xl:gap-10">
          {/* LEFT: category tabs */}
          <FadeBlur delay={0.2}>
            <div
              role="tablist"
              aria-label="Technology categories"
              className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {tabs.map(({ id, title, Icon, color, count }) => {
                const isActive = id === mode;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setMode(id)}
                    className="relative shrink-0 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-left backdrop-blur transition-colors hover:border-white/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 lg:w-full"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="tech-tab-pill"
                        className="absolute inset-0 rounded-xl bg-white"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative flex items-center gap-2.5 text-[13px] font-semibold ${
                        isActive ? "text-[#050714]" : "text-white/70"
                      }`}
                    >
                      <Icon
                        size={15}
                        strokeWidth={2}
                        style={!isActive ? { color } : undefined}
                        aria-hidden="true"
                      />
                      <span className="whitespace-nowrap lg:flex-1">{title}</span>
                      <span className={`hidden text-[11px] lg:inline ${isActive ? "opacity-60" : "opacity-40"}`}>
                        {count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </FadeBlur>

          {/* CENTER: orbit */}
          <motion.div
            ref={wrapRef}
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="relative aspect-square w-full lg:aspect-auto lg:h-full"
          >
            <div
              className="absolute left-1/2 top-1/2"
              style={{
                width: DESIGN,
                height: DESIGN,
                transform: `translate(-50%, -50%) scale(${scale})`,
                transformOrigin: "center",
              }}
            >
              {/* centre glow */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: `radial-gradient(circle, ${accent}22, transparent 65%)` }}
              />

              {/* rings + planets */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                  aria-hidden="true"
                >
                  {rings.map((ring, i) => (
                    <motion.div
                      key={`line-${ring.id}`}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
                      className="absolute left-1/2 top-1/2 rounded-full border"
                      style={{
                        width: ring.radius * 2,
                        height: ring.radius * 2,
                        marginLeft: -ring.radius,
                        marginTop: -ring.radius,
                        borderColor: `${ring.accent}33`,
                        boxShadow: `inset 0 0 40px ${ring.accent}0d`,
                      }}
                    >
                      {ring.showLabel && (
                        <span
                          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-[#050714] px-2 text-[10px] font-bold uppercase tracking-[0.2em]"
                          style={{ color: ring.accent }}
                        >
                          {ring.label}
                        </span>
                      )}
                    </motion.div>
                  ))}

                  {rings.map((ring, ri) => {
                    const counterDir = ring.dir === "normal" ? "reverse" : "normal";
                    const m = ring.techs.length;
                    return (
                      <div
                        key={`spin-${ring.id}`}
                        className="absolute left-1/2 top-1/2 h-0 w-0 hover:z-40"
                        style={{ animation: `cx-spin ${ring.duration}s linear infinite ${ring.dir}` }}
                      >
                        {ring.techs.map((tech, j) => (
                          <Planet
                            key={`${tech.name}-${j}`}
                            name={tech.name}
                            size={ring.size}
                            angle={(360 / m) * j + ring.offset}
                            radius={ring.radius}
                            duration={ring.duration}
                            counterDir={counterDir}
                            accent={ring.accent}
                            order={ri * 4 + j}
                          />
                        ))}
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {/* SUN */}
              <div
                className="absolute left-1/2 top-1/2 z-10"
                style={{ width: SUN, height: SUN, marginLeft: -SUN / 2, marginTop: -SUN / 2 }}
              >
                <span
                  aria-hidden="true"
                  className="cx-sun absolute -inset-10 rounded-full blur-2xl"
                  style={{ background: `${accent}55`, animation: "cx-sun 5s ease-in-out infinite" }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full transition-[background] duration-700"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, #ffffffcc, ${accent} 38%, #0b1030 100%)`,
                    boxShadow: `inset -14px -18px 34px rgba(0,0,30,0.6), 0 0 70px ${accent}77`,
                  }}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white"
                  >
                    <SunIcon size={26} strokeWidth={1.8} aria-hidden="true" />
                    <span className="mt-1.5 text-[13px] font-bold leading-tight">{sunTitle}</span>
                    <span className="mt-0.5 text-[10px] font-medium text-white/75">
                      {sunCount} technologies
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: info box */}
          <div>
            <AnimatePresence mode="wait">
              {activeCat ? (
                <motion.div
                  key={activeCat.id}
                  initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur"
                >
                  <div className="flex items-start gap-3.5">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-white/15"
                      style={{ background: `${accent}26`, color: accent }}
                    >
                      <SunIcon size={22} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold leading-snug">{activeCat.title}</h3>
                      <p className="mt-1 text-[13px] leading-5 text-white/60">
                        {activeCat.description}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {activeCat.technologies.map((tech, i) => (
                      <motion.li
                        key={tech.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.05, duration: 0.4, ease: EASE }}
                      >
                        <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 py-1 pl-1 pr-2.5 text-[13px] font-medium text-white/85">
                          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white">
                            <TechLogo name={tech.name} size={18} />
                          </span>
                          {tech.name}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.div
                  key="all"
                  initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-400/15 text-blue-300 ring-1 ring-white/15">
                      <Sparkles size={22} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold leading-snug">Full Tech Universe</h3>
                      <p className="mt-1 text-[13px] leading-5 text-white/60">
                        Every ring is a category. Pick one on the left to explore its stack.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                      <p className="text-xl font-bold">{total}+</p>
                      <p className="text-[11px] text-white/50">Technologies</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                      <p className="text-xl font-bold">{categories.length}</p>
                      <p className="text-[11px] text-white/50">Categories</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ================= CTA: scroll karne par aata hai ================= */}
      <div className="relative mx-auto w-full max-w-[1320px] px-5 pb-20 pt-4 sm:px-8 lg:pb-28 lg:pt-16">
        <FadeBlur>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-12 text-center backdrop-blur sm:px-12 sm:py-16">
            <motion.div
              aria-hidden="true"
              animate={reduce ? undefined : { opacity: [0.35, 0.8, 0.35], scale: [1, 1.12, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -top-28 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/30 blur-3xl"
            />
            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300 ring-1 ring-blue-400/20">
                <Cpu size={24} aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
                Not Sure Which Technology You Need?
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
                Let&apos;s discuss your requirements and identify a suitable
                technology stack for your project.
              </p>
              <div className="mt-7">
                <ShineLink href="/contact">Talk to Our Team</ShineLink>
              </div>
            </div>
          </div>
        </FadeBlur>
      </div>

      {/* screen-reader list */}
      <ul className="sr-only">
        {categories.map((c) => (
          <li key={c.id}>
            {c.title}: {c.technologies.map((t) => t.name).join(", ")}
          </li>
        ))}
      </ul>
    </section>
  );
}