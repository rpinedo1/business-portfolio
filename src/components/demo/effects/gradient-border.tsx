"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useCapabilities } from "@/hooks/use-capabilities";

/**
 * A card framed by a rotating conic-gradient border. Pure transform on a
 * gradient layer, so it's cheap and mobile-safe. Static frame on reduced-motion.
 */
export default function GradientBorder() {
  const { reducedMotion } = useCapabilities();

  return (
    <div className="relative h-40 w-60 overflow-hidden rounded-2xl">
      <motion.div
        aria-hidden
        className="absolute -inset-1/2"
        style={{
          background:
            "conic-gradient(from 0deg, #0c5450, #8fd6cf, #e3c489, #5a2f5f, #0c5450)",
        }}
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-[2px] flex flex-col items-center justify-center gap-2 rounded-[14px] bg-[#0c1016] text-center">
        <Sparkles className="text-[#e3c489]" size={22} />
        <span className="font-display text-lg text-white">Glowing borders</span>
        <span className="text-xs text-white/50">Draws the eye to key cards</span>
      </div>
    </div>
  );
}
