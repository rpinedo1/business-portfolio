"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCw, Check } from "lucide-react";

/**
 * 3D flip on tap/click — universal across mouse and touch (no hover required).
 */
export default function FlipCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex h-full w-full items-center justify-center" style={{ perspective: 1000 }}>
      <motion.button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-40 w-56"
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/15 bg-gradient-to-br from-[#0c5450] to-[#072e2c] p-5"
        >
          <RotateCw className="text-[#8fd6cf]" size={22} />
          <span className="font-display text-lg text-white">Tap to flip</span>
          <span className="text-xs text-white/55">See the other side</span>
        </div>
        {/* Back */}
        <div
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/15 bg-gradient-to-br from-[#3a2050] to-[#1d1030] p-5"
        >
          <Check className="text-[#e3c489]" size={22} />
          <span className="font-display text-lg text-white">Pricing &amp; details</span>
          <span className="text-xs text-white/55">Perfect for service cards</span>
        </div>
      </motion.button>
    </div>
  );
}
