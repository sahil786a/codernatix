"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Accessibility,
  Activity,
  BarChart3,
  Bell,
  Brain,
  Cloud,
  Code2,
  Container,
  CreditCard,
  Database,
  FileText,
  Gauge,
  GitBranch,
  Layers,
  LayoutTemplate,
  Lock,
  Megaphone,
  MessageSquare,
  MousePointer2,
  Package,
  Palette,
  Plug,
  RefreshCw,
  Rocket,
  Search,
  Settings,
  Share2,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Target,
  UserCheck,
  Users,
  Webhook,
  WifiOff,
  Workflow,
} from "lucide-react";
import { EASE, WRAP } from "@/lib/ui";

/*
 * Feature icon string keys -> lucide icons.
 * Extend this map when a new service file uses a new `icon` key.
 * Unknown keys fall back to Sparkles.
 */
const ICONS = {
  layout: LayoutTemplate,
  gauge: Gauge,
  search: Search,
  accessibility: Accessibility,
  "file-text": FileText,
  plug: Plug,
  code: Code2,
  layers: Layers,
  "refresh-cw": RefreshCw,
  "shopping-cart": ShoppingCart,
  "credit-card": CreditCard,
  package: Package,
  smartphone: Smartphone,
  bell: Bell,
  "wifi-off": WifiOff,
  rocket: Rocket,
  users: Users,
  "bar-chart": BarChart3,
  settings: Settings,
  workflow: Workflow,
  brain: Brain,
  "message-square": MessageSquare,
  "user-check": UserCheck,
  cloud: Cloud,
  "git-branch": GitBranch,
  container: Container,
  activity: Activity,
  lock: Lock,
  webhook: Webhook,
  palette: Palette,
  "mouse-pointer": MousePointer2,
  database: Database,
  megaphone: Megaphone,
  "share-2": Share2,
  target: Target,
};

export default function ServiceFeatures({ service }) {
  const reduce = useReducedMotion();
  const accent = service.accent || "#2563eb";
  const features = service.features || [];

  if (!features.length) return null;

  return (
    <section
      aria-labelledby="service-features-heading"
      className="relative bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className={WRAP}>
        <div className="max-w-2xl">
          <p
            className="text-[13px] font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            What you get
          </p>
          <h2
            id="service-features-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-brand-black sm:text-4xl"
          >
            Key features of our {service.title}
          </h2>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = ICONS[f.icon] || Sparkles;
            return (
              <motion.li
                key={f.title}
                initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
                whileHover={reduce ? undefined : { y: -4 }}
                className="group rounded-3xl border border-brand-gray-200 bg-white p-6 transition-shadow hover:shadow-lg sm:p-7"
                style={{ "--svc-accent": accent }}
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${accent}1a`, color: accent }}
                >
                  <Icon size={22} strokeWidth={1.9} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-brand-black">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-brand-gray-600">{f.text}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
