"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCapabilities } from "@/hooks/use-capabilities";

/**
 * Three layers that drift at different rates as the tile scrolls through the
 * viewport, creating depth. Disabled (flat) under reduced-motion.
 */
export default function ParallaxReveal() {
  const { reducedMotion } = useCapabilities();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const back = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const mid = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const front = useTransform(scrollYProgress, [0, 1], [130, -130]);

  const flat = reducedMotion ? 0 : undefined;

  return (
    <div
      ref={ref}
      className="relative flex h-full w-full items-center justify-center"
    >
      <motion.div
        style={{ y: flat ?? back }}
        className="absolute h-28 w-28 rounded-full bg-[#3a2050] blur-xl"
      />
      <motion.div
        style={{ y: flat ?? mid }}
        className="absolute h-40 w-40 rounded-3xl border border-white/10 bg-[#0c5450]/40 backdrop-blur-sm"
      />
      <motion.div
        style={{ y: flat ?? front }}
        className="relative rounded-2xl border border-white/15 bg-black/40 px-5 py-3 backdrop-blur"
      >
        <span className="font-display text-lg text-white">Depth</span>
        <span className="ml-2 text-xs text-white/50">on scroll</span>
      </motion.div>
    </div>
  );
}
