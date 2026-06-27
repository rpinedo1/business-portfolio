"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useCapabilities } from "@/hooks/use-capabilities";

const COLORS = ["#05605b", "#5a2f5f", "#b08542", "#8fd6cf", "#0d5c63"];

/**
 * A one-shot confetti burst that fires when mounted. Drop it inside a relative
 * container (e.g. a success message). Renders nothing under reduced-motion.
 */
export default function SuccessConfetti() {
  const { reducedMotion } = useCapabilities();

  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 36 + Math.random() * 0.4;
        const dist = 80 + Math.random() * 120;
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist - 40,
          rot: Math.random() * 360,
          color: COLORS[i % COLORS.length],
          delay: Math.random() * 0.1,
        };
      }),
    [],
  );

  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none absolute left-1/2 top-6 z-20 h-0 w-0" aria-hidden>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.5, rotate: p.rot }}
          transition={{ duration: 1.1, delay: p.delay, ease: "easeOut" }}
          className="absolute h-2 w-2 rounded-[2px]"
          style={{ background: p.color }}
        />
      ))}
    </div>
  );
}
