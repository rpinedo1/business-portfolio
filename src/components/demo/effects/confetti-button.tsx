"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PartyPopper } from "lucide-react";
import { useCapabilities } from "@/hooks/use-capabilities";

const COLORS = ["#8fd6cf", "#e3c489", "#a06fb0", "#0d5c63", "#ffffff"];

type Piece = { id: number; x: number; y: number; rot: number; color: string };

/** Tap to launch a confetti burst. Tap works on mobile; respects reduced-motion. */
export default function ConfettiButton() {
  const { reducedMotion } = useCapabilities();
  const [pieces, setPieces] = useState<Piece[]>([]);

  const burst = () => {
    if (reducedMotion) return;
    const batch = Array.from({ length: 26 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 26 + Math.random() * 0.5;
      const dist = 60 + Math.random() * 70;
      return {
        id: Date.now() + i,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        rot: Math.random() * 360,
        color: COLORS[i % COLORS.length],
      };
    });
    setPieces(batch);
    setTimeout(() => setPieces([]), 900);
  };

  return (
    <div className="relative flex items-center justify-center">
      <button
        type="button"
        onClick={burst}
        className="inline-flex items-center gap-2 rounded-full bg-[#3a2050] px-6 py-3.5 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:brightness-110 active:scale-95"
      >
        <PartyPopper size={16} className="text-[#e3c489]" />
        Celebrate
      </button>
      <AnimatePresence>
        {pieces.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.6, rotate: p.rot }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="pointer-events-none absolute h-2 w-2 rounded-[2px]"
            style={{ background: p.color }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
