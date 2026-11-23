"use client";

import { useState } from "react";
import { Code2 } from "lucide-react";
import { getFallback, getLogoSrc } from "@/lib/tech-logos";

/*
 * Technology logo. Brand logo from CDN if known; if it is unknown or fails to
 * load, falls back to a lucide icon, then to a generic code icon.
 */
export default function TechLogo({ name, size = 24 }) {
  const src = getLogoSrc(name);
  // Remember WHICH src failed, so a changed `name` gets a fresh try
  const [failedSrc, setFailedSrc] = useState(null);
  const failed = src !== null && failedSrc === src;

  if (!src || failed) {
    const fb = getFallback(name);
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
    return (
      <Code2
        size={size}
        strokeWidth={1.8}
        className="text-slate-500"
        aria-hidden="true"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setFailedSrc(src)}
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
  );
}