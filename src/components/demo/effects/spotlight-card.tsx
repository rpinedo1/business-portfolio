"use client";

import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { useCapabilities } from "@/hooks/use-capabilities";

/**
 * A card with a radial glow that tracks the pointer. Pointer events fire for
 * both mouse and touch-drag, so it works on a phone. Static centered glow under
 * reduced-motion.
 */
export default function SpotlightCard() {
  const { reducedMotion } = useCapabilities();
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const bg = useMotionTemplate`radial-gradient(220px circle at ${mx}% ${my}%, rgba(143,214,207,0.35), transparent 70%)`;

  const handleMove = (e: React.PointerEvent) => {
    if (reducedMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <div
      onPointerMove={handleMove}
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ background: reducedMotion ? undefined : bg }}
      />
      <div className="relative z-10 flex flex-col items-center gap-2 text-center">
        <MousePointer2 className="text-[#8fd6cf]" size={22} />
        <span className="font-display text-lg text-white">Follow the light</span>
        <span className="text-xs text-white/45">Glow tracks your finger</span>
      </div>
    </div>
  );
}
