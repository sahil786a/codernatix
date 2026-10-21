"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import * as navModule from "@/data/navigation";
import MobileMenu from "./MobileMenu";

const FALLBACK = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Technologies", href: "/technologies" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
const WANTED = FALLBACK.map((l) => l.label);

function resolveLinks() {
  const source = Object.values(navModule).find(Array.isArray);
  if (!source) return FALLBACK;
  const normalized = source
    .map((i) => ({
      label: i.label || i.name || i.title,
      href: i.href || i.path || i.url,
    }))
    .filter((i) => i.label && i.href);
  const picked = WANTED.map((w) => normalized.find((i) => i.label === w)).filter(Boolean);
  return picked.length === WANTED.length ? picked : FALLBACK;
}

export const NAV_LINKS = resolveLinks();

export default function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      /* LOAD: sirf halka fade, aur kuch nahi */
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0_8px_24px_-14px_rgba(15,23,42,0.25)]" : ""
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:h-[76px]">
        {/* LOGO */}
        <Link
          href="/"
          aria-label="Codernatix home"
          className="group flex h-10 shrink-0 items-center rounded-md transition-transform duration-200 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
        >
          <Image
            src="/images/logo/codernatix-logo.png"
            alt=""
            width={44}
            height={44}
            priority
            className="transition-transform duration-500 ease-out group-hover:-rotate-[8deg] group-hover:scale-110"
            style={{ height: 40, width: "auto", maxWidth: 56 }}
          />
          <span className="font-brand ml-2.5 text-[17px] font-bold uppercase tracking-[0.06em] text-[#0F172A] transition-colors duration-300 group-hover:text-[#2563EB]">
            Codernatix
          </span>
        </Link>

        {/* NAV LINKS */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-4 xl:gap-6">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className="group block py-5 text-[14px] font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                  >
                    {/* HOVER: sirf text charcoal grey | CLICK: halka dab + light-blue flash */}
                    <span
                      className={`relative inline-block rounded-md px-2.5 py-1.5 transition-colors duration-200 group-active:scale-90 group-active:bg-[#DBEAFE] ${
                        active ? "text-[#2563EB]" : "text-[#111827] group-hover:text-[#475569]"
                      }`}
                    >
                      {label}

                      {/* ACTIVE: bar text ke bilkul neeche, page badalne par slide hoti hai */}
                      {active && (
                        <motion.span
                          layoutId="nav-active-bar"
                          aria-hidden="true"
                          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 32 }}
                          className="absolute bottom-[1px] left-2.5 h-[3px] w-9 rounded-full bg-[#2563EB]"
                        />
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA + MOBILE */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="group relative hidden h-11 items-center gap-2 overflow-hidden rounded-full bg-[#2563EB] px-5 text-[14px] font-semibold text-white shadow-[0_8px_18px_-10px_rgba(37,99,235,0.7)] transition-all duration-200 hover:bg-[#1D4ED8] active:scale-95 active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] lg:inline-flex"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            <span className="relative !text-white">Let&apos;s Build</span>
            <ArrowRight className="h-4 w-4 text-white transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <MobileMenu links={NAV_LINKS} isActive={isActive} />
        </div>
      </div>
    </motion.header>
  );
}