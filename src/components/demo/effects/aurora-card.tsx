"use client";

import { motion } from "framer-motion";
import { useCapabilities } from "@/hooks/use-capabilities";

const BLOBS = [
  { c: "#0c5450", x: "20%", y: "30%", d: 0 },
  { c: "#5a2f5f", x: "70%", y: "40%", d: 2 },
  { c: "#b08542", x: "45%", y: "70%", d: 4 },
];

/**
 * Drifting blurred colour blobs — an "aurora" ambient background. GPU-cheap
 * (transform/opacity only) and freezes to a static mesh under reduced-motion.
 */
export default function AuroraCard() {
  const { reducedMotion } = useCapabilities();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute h-32 w-32 rounded-full blur-2xl"
          style={{ left: b.x, top: b.y, background: b.c, opacity: 0.55 }}
          animate={
            reducedMotion
              ? undefined
              : { x: [0, 26, -18, 0], y: [0, -22, 16, 0], scale: [1, 1.18, 0.92, 1] }
          }
          transition={{ duration: 9 + b.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display rounded-xl bg-black/25 px-4 py-2 text-lg text-white backdrop-blur-sm">
          Living backgrounds
        </span>
      </div>
    </div>
  );
}
