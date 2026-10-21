"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const cn = (...c) => c.filter(Boolean).join(" ");

const DISC = 64; // arrow disc, px
const BLOCK = 80; // notch block, px
const FILLET = 28; // curve where the cut meets the cover edges, px

/**
 * The notch is painted in the colour of the surface BEHIND the card.
 * Pass `surface` = your section background (hex), or the notch will show.
 */
export default function NotchedProjectCard({
  href,
  title,
  description,
  image,
  imageAlt = "",
  badge,
  tags = [],
  screen,
  dim = screen ? 0.45 : 0,
  monochrome = true,
  surface = "#ffffff",
  accent = "var(--blue)",
  accentForeground = "#ffffff",
  idleDelay = 0, // ← NEW (1/2)
  className,
}) {
  const reduce = useReducedMotion(); // ← NEW (2/2)

  const tone = monochrome
    ? "grayscale transition-[filter,scale] duration-500 group-hover:grayscale-0 group-focus-visible:grayscale-0"
    : "transition-[scale] duration-500";

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col rounded-[28px] outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-4",
        className
      )}
    >
      <div className="relative">
        {/* cover */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-brand-gray-50">
          <img
            src={image}
            alt={screen ? "" : imageAlt}
            loading="lazy"
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              tone,
              !screen && "group-hover:scale-[1.04]"
            )}
          />
          {dim > 0 && (
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ backgroundColor: `rgb(0 0 0 / ${dim})` }}
            />
          )}
          {screen && (
            <img
              src={screen.src}
              alt={screen.alt}
              className={cn(
                "absolute bottom-0 right-0 w-[82%] origin-bottom-right drop-shadow-[0_18px_40px_rgba(0,0,0,0.5)] group-hover:scale-[1.07]",
                tone,
                screen.className
              )}
            />
          )}
          {badge && (
            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center pt-4">
              <span className="rounded-full border border-white/40 bg-black/30 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                {badge}
              </span>
            </div>
          )}
        </div>

        {/* notch block */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0"
          style={{
            width: BLOCK,
            height: BLOCK,
            borderTopLeftRadius: BLOCK - DISC / 2,
            background: surface,
          }}
        />
        {/* fillets */}
        {[
          { bottom: BLOCK, right: 0 },
          { bottom: 0, right: BLOCK },
        ].map((pos, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="absolute"
            style={{
              ...pos,
              width: FILLET,
              height: FILLET,
              background: `radial-gradient(circle at top left, transparent ${FILLET - 0.5}px, ${surface} ${FILLET}px)`,
            }}
          />
        ))}

        {/* arrow disc */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-brand-black/5 text-brand-black transition-[background-color,color,scale] duration-300 group-hover:scale-105 group-hover:bg-[var(--card-accent)] group-hover:text-[var(--card-accent-fg)]"
          style={{
            width: DISC,
            height: DISC,
            "--card-accent": accent,
            "--card-accent-fg": accentForeground,
          }}
        >
          {/* old: <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /> */}
          <motion.span
            className="flex"
            animate={reduce ? undefined : { x: [0, 3, 0], y: [0, -3, 0] }}
            transition={{
              duration: 1.6,
              delay: idleDelay,
              repeat: Infinity,
              repeatDelay: 2.4,
              ease: "easeInOut",
            }}
          >
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.span>
        </span>
      </div>

      <h3 className="mt-5 text-xl font-medium tracking-tight text-brand-black">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-brand-gray-600">
          {description}
        </p>
      )}
      {tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <li
              key={`${t}-${i}`}
              className="rounded-md bg-brand-black/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-gray-700"
            >
              {t}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}