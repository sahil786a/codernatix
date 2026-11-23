"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

/*
 * Generic accessible accordion (one panel open at a time).
 * items: [{ q, a }]   defaultOpen: index to open first, or null for all closed
 * dark: true on dark sections   accent: hex colour for the open state
 */
export default function Accordion({
  items = [],
  defaultOpen = 0,
  dark = false,
  accent = "#2563eb",
}) {
  const reduce = useReducedMotion();
  const baseId = useId();
  const [open, setOpen] = useState(defaultOpen);

  if (!items.length) return null;

  const border = dark ? "border-white/10" : "border-brand-gray-200";
  const surface = dark ? "bg-white/[0.04]" : "bg-white";
  const question = dark ? "text-white" : "text-brand-black";
  const answer = dark ? "text-white/65" : "text-brand-gray-600";

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;

        return (
          <div
            key={`${item.q}-${i}`}
            className={`overflow-hidden rounded-2xl border transition-colors ${surface}`}
            style={{ borderColor: isOpen ? `${accent}66` : undefined }}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`flex w-full items-center justify-between gap-4 border-0 px-5 py-4 text-left text-base font-semibold focus-visible:outline-2 focus-visible:-outline-offset-2 ${question}`}
                style={{ outlineColor: accent }}
              >
                <span>{item.q}</span>
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ background: `${accent}1a`, color: accent }}
                >
                  <Plus size={18} strokeWidth={2.2} />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className={`px-5 pb-5 text-[15px] leading-7 ${answer}`}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}