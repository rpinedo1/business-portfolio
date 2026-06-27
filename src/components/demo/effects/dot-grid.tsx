"use client";

import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { useCapabilities } from "@/hooks/use-capabilities";

/**
 * A dim dot grid with a brighter layer revealed around the pointer. Pointer
 * events cover mouse + touch-drag. Under reduced-motion the highlight sits
 * statically in the center.
 */
export default function DotGrid() {
  const { reducedMotion } = useCapabilities();
  const mx = useMotionValue(120);
  const my = useMotionValue(90);
  const mask = useMotionTemplate`radial-gradient(130px circle at ${mx}px ${my}px, black 10%, transparent 75%)`;

  const handleMove = (e: React.PointerEvent) => {
    if (reducedMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const dots = {
    backgroundImage: "radial-gradient(currentColor 1.4px, transparent 1.6px)",
    backgroundSize: "22px 22px",
  } as const;

  return (
    <div
      onPointerMove={handleMove}
      className="relative h-full w-full overflow-hidden rounded-2xl"
    >
      {/* Base dim dots */}
      <div className="absolute inset-0 text-white/12" style={dots} />
      {/* Bright dots revealed near pointer */}
      <motion.div
        className="absolute inset-0 text-[#8fd6cf]"
        style={{
          ...dots,
          maskImage: reducedMotion
            ? "radial-gradient(130px circle at 50% 50%, black 10%, transparent 75%)"
            : mask,
          WebkitMaskImage: reducedMotion
            ? "radial-gradient(130px circle at 50% 50%, black 10%, transparent 75%)"
            : mask,
        }}
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-xs text-white/45">
        Move across the grid
      </span>
    </div>
  );
}
