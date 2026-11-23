"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Globe } from "lucide-react";
import BrowserVisual from "@/components/services/visuals/BrowserVisual";
import CodeVisual from "@/components/services/visuals/CodeVisual";
import StoreVisual from "@/components/services/visuals/StoreVisual";
import PhoneVisual from "@/components/services/visuals/PhoneVisual";
import DashboardVisual from "@/components/services/visuals/DashboardVisual";
import NetworkVisual from "@/components/services/visuals/NetworkVisual";
import CloudVisual from "@/components/services/visuals/CloudVisual";
import ApiVisual from "@/components/services/visuals/ApiVisual";
import CanvasVisual from "@/components/services/visuals/CanvasVisual";
import ShieldVisual from "@/components/services/visuals/ShieldVisual";
import GrowthVisual from "@/components/services/visuals/GrowthVisual";
import RoadmapVisual from "@/components/services/visuals/RoadmapVisual";


/*
 * Maps a service's `visual` key to its animated visual.
 * Keys without a visual yet fall back to the generic placeholder below.
 * Decorative only: the parent wrapper is aria-hidden.
 */
export default function ServiceVisual({ name = "default", color = "#2563eb" }) {
  const reduce = useReducedMotion();

  if (name === "browser") return <BrowserVisual color={color} />;
  if (name === "code") return <CodeVisual color={color} />;
  if (name === "store") return <StoreVisual color={color} />;
  if (name === "phone") return <PhoneVisual color={color} />;
  if (name === "dashboard") return <DashboardVisual color={color} />;
  if (name === "network") return <NetworkVisual color={color} />;
  if (name === "cloud") return <CloudVisual color={color} />;
  if (name === "api") return <ApiVisual color={color} />;
    if (name === "canvas") return <CanvasVisual color={color} />;
  if (name === "shield") return <ShieldVisual color={color} />;
    if (name === "growth") return <GrowthVisual color={color} />;
  if (name === "roadmap") return <RoadmapVisual color={color} />;

  
  return (
    <div
      data-visual={name}
      className="relative mx-auto aspect-square w-full max-w-[460px]"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border"
          style={{
            inset: `${i * 14}%`,
            borderColor: `${color}${i === 0 ? "55" : i === 1 ? "40" : "2b"}`,
            background: i === 2 ? `${color}12` : "transparent",
          }}
          animate={reduce ? undefined : { scale: [1, 1.04, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <span
          className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full"
          style={{ background: color, boxShadow: `0 0 18px ${color}` }}
        />
      </motion.div>

      <div
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl text-white"
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}99)`,
          boxShadow: `0 12px 40px ${color}55`,
        }}
      >
        <Globe size={32} strokeWidth={1.8} aria-hidden="true" />
      </div>
    </div>
  );
}