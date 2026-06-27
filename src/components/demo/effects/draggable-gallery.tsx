"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CARDS = [
  { label: "Hero", tint: "from-[#0c5450] to-[#072e2c]" },
  { label: "Services", tint: "from-[#3a2050] to-[#1d1030]" },
  { label: "Proof", tint: "from-[#0d5c63] to-[#082f33]" },
  { label: "Pricing", tint: "from-[#7a5a28] to-[#2e2210]" },
  { label: "Contact", tint: "from-[#0c5450] to-[#072e2c]" },
  { label: "About", tint: "from-[#3a2050] to-[#1d1030]" },
  { label: "Gallery", tint: "from-[#0d5c63] to-[#082f33]" },
  { label: "FAQ", tint: "from-[#7a5a28] to-[#2e2210]" },
  { label: "Booking", tint: "from-[#0c5450] to-[#072e2c]" },
  { label: "Blog", tint: "from-[#3a2050] to-[#1d1030]" },
  { label: "Reviews", tint: "from-[#0d5c63] to-[#082f33]" },
  { label: "Team", tint: "from-[#7a5a28] to-[#2e2210]" },
];

/**
 * Drag/throw a row of cards with momentum. Constraints are measured from the
 * actual content overflow so it's draggable at any width (desktop included),
 * not just when a hardcoded range happens to overflow. Framer's drag works for
 * mouse and touch alike.
 */
export default function DraggableGallery() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(0);

  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      const overflow = track.scrollWidth - viewport.offsetWidth;
      setMaxDrag(overflow > 0 ? overflow : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={viewportRef} className="w-full overflow-hidden">
      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={{ left: -maxDrag, right: 0 }}
        dragElastic={0.12}
        dragMomentum
        whileTap={{ cursor: "grabbing" }}
        className="flex w-max cursor-grab gap-3 px-1"
      >
        {CARDS.map((c, i) => (
          <motion.div
            key={`${c.label}-${i}`}
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
