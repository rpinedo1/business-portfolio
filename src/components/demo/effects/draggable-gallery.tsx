"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const CARDS = [
  { label: "Hero", tint: "from-[#0c5450] to-[#072e2c]" },
  { label: "Services", tint: "from-[#3a2050] to-[#1d1030]" },
  { label: "Proof", tint: "from-[#0d5c63] to-[#082f33]" },
  { label: "Pricing", tint: "from-[#7a5a28] to-[#2e2210]" },
  { label: "Contact", tint: "from-[#0c5450] to-[#072e2c]" },
];

/**
 * Drag/throw a row of cards with momentum. Framer's drag works identically for
 * mouse and touch, so this is mobile-native with no extra handling.
 */
export default function DraggableGallery() {
  const constraints = useRef<HTMLDivElement>(null);

  return (
    <div ref={constraints} className="w-full overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ left: -260, right: 0 }}
        dragElastic={0.12}
        dragMomentum
        whileTap={{ cursor: "grabbing" }}
        className="flex cursor-grab gap-3 px-1"
      >
        {CARDS.map((c) => (
          <motion.div
            key={c.label}
            whileHover={{ y: -6 }}
            className={`flex h-32 w-24 shrink-0 select-none items-end rounded-xl bg-gradient-to-br ${c.tint} p-3 shadow-lg ring-1 ring-white/10`}
          >
            <span className="text-xs font-semibold text-white/85">{c.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
