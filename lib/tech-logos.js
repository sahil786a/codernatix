/*
 * Technology logo data (copied from components/home/TechnologiesSection.jsx).
 * Import this ONLY from client components (it holds icon components).
 *
 * { slug, color } => Simple Icons CDN
 * { url }         => direct image URL
 */

import { Brain, Cloud, Webhook, Workflow } from "lucide-react";

const DEVICON = (path) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${path}`;

/* Keys are normalized: lowercase, only a-z 0-9 and "+" */
export const keyOf = (name) =>
  String(name).toLowerCase().replace(/[^a-z0-9+]/g, "");

export const TECHNOLOGY_LOGOS = {
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

  // AWS / Azure: not on Simple Icons, so Devicon
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
 * For technologies with no brand logo (or when the logo fails to load).
 */
export const ICON_FALLBACKS = {
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

/** Image URL for a technology, or null if it has no logo. */
export function getLogoSrc(name) {
  const logo = TECHNOLOGY_LOGOS[keyOf(name)];
  if (!logo) return null;
  return logo.url || `https://cdn.simpleicons.org/${logo.slug}/${logo.color}`;
}

/** Fallback { Icon, color } for a technology, or null. */
export function getFallback(name) {
  return ICON_FALLBACKS[keyOf(name)] || null;
}