"use client";

import { motion } from "framer-motion";
import { useCapabilities } from "@/hooks/use-capabilities";

type Blob = { c: string; x: string; y: string; size: number; d: number };

const LIGHT_BLOBS: Blob[] = [
  { c: "rgba(5,96,91,0.22)", x: "12%", y: "18%", size: 460, d: 0 },
  { c: "rgba(90,47,95,0.16)", x: "78%", y: "12%", size: 420, d: 3 },
  { c: "rgba(176,133,66,0.12)", x: "60%", y: "70%", size: 380, d: 6 },
];

/**
 * Soft, slow-drifting colour blooms for an ambient "living" background.
 * GPU-cheap (transform/opacity only) and freezes to a static mesh when the
 * user prefers reduced motion.
 */
export default function AuroraField({ className }: { className?: string }) {
  const { reducedMotion } = useCapabilities();

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      {LIGHT_BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[80px]"
          style={{
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            background: b.c,
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  x: [0, 40, -30, 0],
                  y: [0, -34, 24, 0],
                  scale: [1, 1.12, 0.94, 1],
                }
          }
          transition={{
            duration: 18 + b.d * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
