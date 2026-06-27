"use client";

import { motion } from "framer-motion";
import { useCapabilities } from "@/hooks/use-capabilities";

type Blob = {
  c: string;
  x: string;
  y: string;
  size: number;
  dur: number;
  dx: number[];
  dy: number[];
};

const BLOBS: Blob[] = [
  { c: "#0c5450", x: "15%", y: "25%", size: 150, dur: 7, dx: [0, 60, -30, 0], dy: [0, -40, 30, 0] },
  { c: "#5a2f5f", x: "65%", y: "35%", size: 170, dur: 9, dx: [0, -50, 40, 0], dy: [0, 36, -28, 0] },
  { c: "#b08542", x: "40%", y: "65%", size: 130, dur: 8, dx: [0, 44, -50, 0], dy: [0, -30, 24, 0] },
  { c: "#0d5c63", x: "80%", y: "70%", size: 120, dur: 6.5, dx: [0, -36, 28, 0], dy: [0, -34, 40, 0] },
  { c: "#7a3f80", x: "30%", y: "20%", size: 110, dur: 10, dx: [0, 50, -40, 0], dy: [0, 44, -20, 0] },
];

/**
 * Drifting blurred colour blobs + a slow rotating conic shimmer — an "aurora"
 * ambient background. GPU-cheap (transform/opacity) and freezes to a static
 * mesh under reduced-motion.
 */
export default function AuroraCard() {
  const { reducedMotion } = useCapabilities();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#080b10]">
      {/* Rotating conic shimmer */}
      {!reducedMotion ? (
        <motion.div
          aria-hidden
          className="absolute -inset-1/4 opacity-25 blur-2xl"
          style={{
            background:
              "conic-gradient(from 0deg, #0c5450, #5a2f5f, #b08542, #0d5c63, #0c5450)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
      ) : null}

      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-screen blur-2xl"
          style={{
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            background: b.c,
          }}
          animate={
            reducedMotion
              ? { opacity: 0.5 }
              : {
                  x: b.dx,
                  y: b.dy,
                  scale: [1, 1.25, 0.85, 1],
                  opacity: [0.45, 0.75, 0.5, 0.45],
                }
          }
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display rounded-xl bg-black/30 px-4 py-2 text-lg text-white backdrop-blur-sm">
          Living backgrounds
        </span>
      </div>
    </div>
  );
}
