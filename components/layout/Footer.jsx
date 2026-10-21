"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const EASE = [0.22, 1, 0.36, 1];

// Navbar wala hi brand text (font, size, spacing)
const BRAND_TEXT =
  "font-brand text-[17px] font-bold uppercase tracking-[0.06em]";

// Particle wordmark me jo text banega
const WORDMARK = "CODERNATIX";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Projects", href: "/case-studies" },
  { label: "Contact Us", href: "/contact" },
];

const services = [
  { label: "Web Development", href: "/services/web" },
  { label: "Software Development", href: "/services/software" },
  { label: "Mobile App Development", href: "/services/mobile" },
  { label: "AI & Automation", href: "/services/ai-automation" },
  { label: "Cloud & DevOps", href: "/services/cloud-devops" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

// Apne asli social profile links yahan daalo
const socials = [
  { label: "LinkedIn", href: "#", Icon: FaLinkedinIn },
  { label: "Instagram", href: "#", Icon: FaInstagram },
  { label: "Facebook", href: "#", Icon: FaFacebookF },
];

/* ---------------------------------------------------------------- */
/* Brand logo (navbar jaisa)                                         */
/* ---------------------------------------------------------------- */

function BrandLogo() {
  return (
    <Link
      href="/"
      aria-label="Codernatix home"
      className="group inline-flex h-12 shrink-0 items-center rounded-md transition-transform duration-200 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
    >
      {/* white tile: dark logo black footer par bhi saaf dikhe */}
      <span className="flex items-center justify-center rounded-xl bg-white p-1 shadow-lg shadow-black/30">
        <Image
          src="/images/logo/codernatix-logo.png"
          alt=""
          width={44}
          height={44}
          className="transition-transform duration-500 ease-out group-hover:-rotate-[8deg] group-hover:scale-110"
          style={{ height: 40, width: "auto", maxWidth: 56 }}
        />
      </span>
      <span
        className={`${BRAND_TEXT} ml-2.5 text-white transition-colors duration-300 group-hover:text-brand-blue`}
      >
        Codernatix
      </span>
    </Link>
  );
}

/* ---------------------------------------------------------------- */
/* Particle wordmark                                                 */
/* ---------------------------------------------------------------- */

function ParticleWordmark({
  text = WORDMARK,
  fontClass = "font-brand", // navbar/copyright wali hi class. Alag font: "font-display" etc.
  weight = 700, // Lilita One jaise single-weight font ke liye 400
  letterSpacing = 0, // px me, jaise 4 ya 8
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const fontProbeRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const fontProbe = fontProbeRef.current;
    if (!wrap || !canvas || !fontProbe) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Asli rendered font (next/font ka hashed naam bhi isme aa jaata hai)
    const computed = getComputedStyle(fontProbe).fontFamily;
    const FONT = computed || '"Chakra Petch", system-ui, sans-serif';
    const COLORS = ["#e5e7eb", "#93c5fd", "#3b82f6"];

    let particles = [];
    let W = 0;
    let H = 0;
    let raf = 0;
    let inView = false;
    let destroyed = false;
    let resizeTimer = 0;
    const t0 = performance.now();
    const mouse = { x: -9999, y: -9999, active: false };

    function scatter() {
      for (const p of particles) {
        p.x = p.hx + (Math.random() - 0.5) * W * 0.9;
        p.y = p.hy + (Math.random() - 0.1) * H * 2.2;
        p.vx = 0;
        p.vy = 0;
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        const bx = reduce ? 0 : Math.sin(t * 1.3 + p.ph) * 0.7;
        const by = reduce ? 0 : Math.cos(t * 1.1 + p.ph) * 0.7;
        const wave = Math.max(0, Math.sin((p.hx / W) * Math.PI * 2 - t * 1.4));
        ctx.globalAlpha = reduce ? 0.9 : 0.5 + 0.5 * wave * wave;
        ctx.fillStyle = COLORS[p.c];
        ctx.beginPath();
        ctx.arc(p.x + bx, p.y + by, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function build(initial) {
      const width = Math.floor(wrap.clientWidth);
      if (!width) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // text ko width me fit karo
      const probe = document.createElement("canvas").getContext("2d");
      probe.font = `${weight} 100px ${FONT}`;
      if ("letterSpacing" in probe) {
        probe.letterSpacing = `${letterSpacing}px`;
      }
      const tw = probe.measureText(text).width || 600;
      const fontSize = Math.min((width * 0.97 * 100) / tw, 320);

      W = width;
      H = Math.round(fontSize * 1.08);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // text ko offscreen draw karke dots sample karo
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const o = off.getContext("2d");
      o.font = `${weight} ${fontSize}px ${FONT}`;
      if ("letterSpacing" in o) {
        // spacing font size ke saath scale hoti hai (probe 100px par tha)
        o.letterSpacing = `${(letterSpacing * fontSize) / 100}px`;
      }
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.fillStyle = "#fff";
      o.fillText(text, W / 2, H / 2 + fontSize * 0.04);
      const data = o.getImageData(0, 0, W, H).data;

      const gap = W < 480 ? 3 : W < 768 ? 4 : W < 1100 ? 5 : 6;
      const radius = gap * 0.3;

      particles = [];
      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          if (data[(y * W + x) * 4 + 3] > 128) {
            const r = Math.random();
            particles.push({
              hx: x,
              hy: y,
              x,
              y,
              vx: 0,
              vy: 0,
              c: r < 0.68 ? 0 : r < 0.9 ? 1 : 2,
              ph: Math.random() * Math.PI * 2,
              r: radius,
            });
          }
        }
      }

      if (initial && !reduce && !inView) scatter();
      draw(0);
    }

    function frame(now) {
      if (destroyed) return;
      raf = requestAnimationFrame(frame);

      const t = (now - t0) / 1000;
      const R = Math.max(60, W * 0.09);
      const R2 = R * R;

      for (const p of particles) {
        let ax = (p.hx - p.x) * 0.07;
        let ay = (p.hy - p.y) * 0.07;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = 1 - d / R;
            ax += (dx / d) * f * 3.4;
            ay += (dy / d) * f * 3.4;
          }
        }

        p.vx = (p.vx + ax) * 0.84;
        p.vy = (p.vy + ay) * 0.84;
        p.x += p.vx;
        p.y += p.vy;
      }
      draw(t);
    }

    function start() {
      if (reduce || raf) return;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    // visible hone par: bikhre dots se phir se letters banao
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          if (!reduce) {
            scatter();
            start();
          }
        } else {
          stop();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(wrap);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointercancel", onLeave);

    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => build(false), 150);
    });
    ro.observe(wrap);

    // font pura load hone ke baad hi dots banao (warna fallback font ban jaata hai)
    const fontReady = Promise.race([
      document.fonts
        ? document.fonts.load(`${weight} 100px ${FONT}`, text).catch(() => {})
        : Promise.resolve(),
      new Promise((res) => setTimeout(res, 2000)),
    ]);
    fontReady.then(() => {
      if (!destroyed) build(true);
    });

    return () => {
      destroyed = true;
      stop();
      io.disconnect();
      ro.disconnect();
      clearTimeout(resizeTimer);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointercancel", onLeave);
    };
  }, [text, reduce, fontClass, weight, letterSpacing]);

  return (
    <div ref={wrapRef} className="relative w-full">
      {/* chhupa hua span: isse asli font ka naam milta hai (aur font load bhi trigger hota hai) */}
      <span
        ref={fontProbeRef}
        aria-hidden="true"
        className={`${fontClass} pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap text-base uppercase`}
        style={{ fontWeight: weight }}
      >
        {text}
      </span>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/10 blur-3xl"
      />
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={text}
        className="relative mx-auto block cursor-crosshair [touch-action:pan-y]"
      />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Small pieces                                                      */
/* ---------------------------------------------------------------- */

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-1.5 text-sm text-white/60 transition-all duration-300 hover:translate-x-1 hover:text-white"
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand-blue transition-transform duration-300 group-hover:scale-x-100"
        />
      </span>
    </Link>
  );
}

const colIn = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

/* ---------------------------------------------------------------- */
/* Footer                                                            */
/* ---------------------------------------------------------------- */

export default function Footer() {
  const reduce = useReducedMotion();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-brand-black text-white">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-10" />
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, 40, -20, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-brand-blue/15 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, -30, 15, 0], y: [0, -16, 12, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 bottom-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/60 to-transparent"
      />

      <div className="site-container relative">
        {/* ---------- TOP BAND ---------- */}
        <motion.div
          variants={colIn}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          className="flex flex-col gap-6 border-b border-white/10 py-12 sm:py-14 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/70 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for new projects
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Have an idea? Let&apos;s{" "}
              <span className="bg-gradient-to-r from-brand-blue to-brand-blue-light bg-clip-text text-transparent">
                build it together.
              </span>
            </h2>
          </div>

          <Link
            href="/contact"
            className="group relative inline-flex min-h-12 w-fit shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-6 py-3 text-sm font-semibold !text-brand-black transition-colors hover:bg-brand-blue hover:!text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {!reduce && (
              <motion.span
                aria-hidden="true"
                initial={{ x: "-150%" }}
                animate={{ x: "450%" }}
                transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
                className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent"
              />
            )}
            <span className="relative">Start a Project</span>
            <ArrowUpRight size={17} className="relative" />
          </Link>
        </motion.div>

        {/* ---------- MAIN GRID ---------- */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: false, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid gap-10 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-12 lg:gap-12"
        >
          {/* Company */}
          <motion.div variants={colIn} className="sm:col-span-2 lg:col-span-4">
            <BrandLogo />

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              Digital products, custom software, and technology solutions
              designed to help businesses grow and move forward.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={reduce ? undefined : { y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-brand-blue/60 hover:bg-brand-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={colIn} className="lg:col-span-2">
            <h2 className="text-sm font-semibold tracking-wide text-white">
              Quick Links
            </h2>
            <span className="mt-2 block h-0.5 w-8 rounded-full bg-brand-blue" />
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={colIn} className="lg:col-span-3">
            <h2 className="text-sm font-semibold tracking-wide text-white">
              Our Services
            </h2>
            <span className="mt-2 block h-0.5 w-8 rounded-full bg-brand-blue" />
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <FooterLink href={service.href}>{service.label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={colIn} className="lg:col-span-3">
            <h2 className="text-sm font-semibold tracking-wide text-white">
              Get in Touch
            </h2>
            <span className="mt-2 block h-0.5 w-8 rounded-full bg-brand-blue" />

            <p className="mt-5 text-sm leading-6 text-white/60">
              Have a project in mind? Let&apos;s talk about your goals and how
              we can help.
            </p>

            <div className="mt-5 space-y-3.5">
              <div className="flex items-start gap-3 text-sm text-white/60">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                  <Mail size={16} />
                </span>
                <Link
                  href="/contact"
                  className="pt-1 transition-colors hover:text-white"
                >
                  Send us an enquiry
                </Link>
              </div>

              <div className="flex items-start gap-3 text-sm text-white/60">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                  <MapPin size={16} />
                </span>
                <span className="pt-1">
                  Serving businesses through digital solutions
                </span>
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
            >
              Contact Us
              <ArrowUpRight size={17} />
            </Link>
          </motion.div>
        </motion.div>

        {/* ---------- BOTTOM BAR ---------- */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-white/50">
            © {currentYear}{" "}
            <span className="font-brand font-bold uppercase tracking-[0.06em] text-white/70">
              Codernatix
            </span>
            . All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/50 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:border-brand-blue/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
            >
              Back to top
              <motion.span
                aria-hidden="true"
                animate={reduce ? undefined : { y: [0, -2, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <ArrowUp size={14} />
              </motion.span>
            </button>
          </div>
        </div>

        {/* ---------- PARTICLE WORDMARK (sabse last) ---------- */}
        <div className="pb-8 pt-4 sm:pb-10">
          <ParticleWordmark text={WORDMARK} />
          <p className="mt-2 hidden text-center text-[11px] tracking-widest text-white/25 sm:block">
            MOVE YOUR CURSOR OVER THE LETTERS
          </p>
        </div>
      </div>
    </footer>
  );
}