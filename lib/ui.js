/*
 * Server-safe UI constants.
 *
 * components/about/AboutShared.jsx is a client file, so its constants cannot be
 * imported by server components. Anything shared between server and client
 * lives here instead.
 */

// Same easing curve used across the site's animations
export const EASE = [0.22, 1, 0.36, 1];

// Standard section wrapper: centred, max width, responsive side padding
export const WRAP =
  "relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12";

// Dark section background used by CTA-style blocks
export const DARK_BG = "bg-brand-black text-white";