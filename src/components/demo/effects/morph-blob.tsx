"use client";

import { motion } from "framer-motion";
import { useCapabilities } from "@/hooks/use-capabilities";

const SHAPES = [
  "60% 40% 30% 70% / 60% 30% 70% 40%",
  "30% 60% 70% 40% / 50% 60% 30% 60%",
  "50% 50% 40% 60% / 40% 50% 60% 50%",
  "60% 40% 30% 70% / 60% 30% 70% 40%",
];

/**
 * An organic shape that morphs by animating border-radius — GPU-light and fully
 * mobile-safe. Holds a static shape under reduced-motion.
 */
export default function MorphBlob() {
  const { reducedMotion } = useCapabilities();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <motion.div
        className="flex h-36 w-36 items-center justify-center bg-gradient-to-br from-[#0c5450] via-[#0d5c63] to-[#5a2f5f] shadow-[0_0_50px_-5px_rgba(5,96,91,0.6)]"
        style={{ borderRadius: SHAPES[0] }}
        animate={
          reducedMotion
            ? undefined
            : { borderRadius: SHAPES, rotate: [0, 8, -8, 0] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-display text-sm text-white/90">Organic shapes</span>
      </motion.div>
    </div>
  );
}
