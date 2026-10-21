"use client";

import { useId } from "react";

const cn = (...c) => c.filter(Boolean).join(" ");

// original me closing ")" missing thi, yahan theek hai
const FOLDED_CLIP =
  "polygon(0 8px, 8px 0, calc(100% - 40px) 0, 100% 40px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))";

/**
 * Shell: hover par uthta hai aur drop-shadow aati hai
 * (clip-path box-shadow ko kaat deta hai, isliye filter use kiya)
 */
export function FoldedCard({ accent = "#2563eb", className, style, children, ...props }) {
  return (
    <div
      data-slot="folded-card"
      className={cn(
        "group relative transition-[transform,filter] duration-300 hover:-translate-y-1.5 hover:[filter:drop-shadow(0_22px_28px_rgba(15,23,42,0.10))]",
        className
      )}
      style={{ "--fc-accent": accent, ...style }}
      {...props}
    >
      <div className="relative overflow-hidden bg-white" style={{ clipPath: FOLDED_CLIP }}>
        {children}
      </div>
    </div>
  );
}

/** Top-right ka folded flap */
export function FoldedCardFold({ className }) {
  const gradientId = useId().replaceAll(":", "");
  return (
    <div
      aria-hidden="true"
      data-slot="folded-card-fold"
      className={cn("pointer-events-none absolute right-0 top-0 z-30 h-10 w-10", className)}
    >
      <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" focusable="false">
        <defs>
          <linearGradient id={gradientId} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>
        <path d="M0 0 L40 40 L0 40 Z" fill={`url(#${gradientId})`} />
        <line x1="0" y1="0" x2="40" y2="40" stroke="#e2e8f0" strokeWidth="1" />
        <path
          d="M4 22 L4 36 L18 36"
          stroke="#cbd5e1"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** 1px border, hover par accent colour */
export function FoldedCardBorder({ className, style }) {
  return (
    <div
      aria-hidden="true"
      data-slot="folded-card-border"
      className={cn(
        "pointer-events-none absolute inset-0 z-20 rounded-b-xl rounded-tl-xl bg-[#e2e8f0] transition-colors duration-300 group-hover:bg-[var(--fc-accent)]",
        className
      )}
      style={{
        padding: "1px",
        WebkitMask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        ...style,
      }}
    />
  );
}

export function FoldedCardPreview({ className, children, ...props }) {
  return (
    <div
      data-slot="folded-card-preview"
      className={cn(
        "relative h-[228px] overflow-hidden rounded-b-xl rounded-tl-xl bg-slate-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function FoldedCardGrid({ rows = 4, columns = 4, className }) {
  const r = Math.max(1, Math.floor(rows));
  const c = Math.max(1, Math.floor(columns));
  return (
    <div
      aria-hidden="true"
      data-slot="folded-card-grid"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {Array.from({ length: r - 1 }, (_, i) => (
        <div
          key={`row-${i}`}
          className="absolute left-0 w-full border-t border-dashed border-slate-300/60"
          style={{ top: `${((i + 1) / r) * 100}%` }}
        />
      ))}
      {Array.from({ length: c - 1 }, (_, i) => (
        <div
          key={`col-${i}`}
          className="absolute top-0 h-full border-l border-dashed border-slate-300/60"
          style={{ left: `${((i + 1) / c) * 100}%` }}
        />
      ))}
    </div>
  );
}

export function FoldedCardFooter({ className, ...props }) {
  return (
    <div
      data-slot="folded-card-footer"
      className={cn("flex flex-col gap-2 border-t border-slate-200 bg-white px-5 py-4", className)}
      {...props}
    />
  );
}

export function FoldedCardHeading({ className, ...props }) {
  return (
    <div
      data-slot="folded-card-heading"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

export function FoldedCardTitle({ className, ...props }) {
  return (
    <h3
      data-slot="folded-card-title"
      className={cn("text-base font-semibold text-brand-black", className)}
      {...props}
    />
  );
}

export function FoldedCardBadge({ className, ...props }) {
  return (
    <span
      data-slot="folded-card-badge"
      className={cn(
        "rounded-full bg-[var(--fc-accent)] px-2 py-0.5 text-xs font-semibold tabular-nums text-white",
        className
      )}
      {...props}
    />
  );
}

export function FoldedCardDescription({ className, ...props }) {
  return (
    <p
      data-slot="folded-card-description"
      className={cn("line-clamp-3 text-sm leading-relaxed text-brand-gray-500", className)}
      {...props}
    />
  );
}

export default FoldedCard;