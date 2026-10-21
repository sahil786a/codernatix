"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* Receives links + isActive from Navbar so the nav data lives in one place. */
export default function MobileMenu({ links = [], isActive = () => false }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E2E8F0] text-[#111827] transition-colors hover:bg-[#F8FAFC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full border-b border-[#E2E8F0] bg-white px-5 pb-6 pt-2 sm:px-8"
          >
            <ul>
              {links.map(({ label, href }) => (
                <li key={href} className="border-b border-[#E2E8F0] last:border-0">
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={`flex items-center justify-between py-4 text-base font-medium ${
                      isActive(href) ? "text-[#2563EB]" : "text-[#111827]"
                    }`}
                  >
                    {label}
                    {isActive(href) && <span aria-hidden="true" className="h-[3px] w-6 rounded-full bg-[#2563EB]" />}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2563EB] text-[15px] font-semibold text-white hover:bg-[#1D4ED8]"
            >
              Let&apos;s Build <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}