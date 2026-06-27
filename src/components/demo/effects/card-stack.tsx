"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CARDS = [
  { t: "Roofing Co.", s: "+38% calls", tint: "from-[#0c5450] to-[#072e2c]" },
  { t: "Dental Studio", s: "2x bookings", tint: "from-[#3a2050] to-[#1d1030]" },
  { t: "Law Firm", s: "Higher-quality leads", tint: "from-[#0d5c63] to-[#082f33]" },
  { t: "Med Spa", s: "Fully booked weeks", tint: "from-[#7a5a28] to-[#2e2210]" },
];

/** Swipe/drag the top card away to reveal the next. Works with mouse and touch. */
export default function CardStack() {
  const [order, setOrder] = useState(CARDS.map((_, i) => i));

  const cycle = () => setOrder((o) => [...o.slice(1), o[0]]);

  return (
    <div className="relative h-40 w-56">
      {order.map((cardIdx, stackPos) => {
        const card = CARDS[cardIdx];
        const isTop = stackPos === 0;
        return (
          <motion.div
            key={cardIdx}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 90) cycle();
            }}
            animate={{
              scale: 1 - stackPos * 0.05,
              y: stackPos * 12,
              opacity: stackPos < 3 ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ zIndex: CARDS.length - stackPos }}
            className={`absolute inset-0 flex cursor-grab flex-col justify-between rounded-2xl border border-white/15 bg-gradient-to-br ${card.tint} p-5 shadow-xl active:cursor-grabbing`}
          >
            <span className="text-xs font-medium uppercase tracking-wider text-white/55">
              Client result
            </span>
            <div>
              <p className="font-display text-xl text-white">{card.t}</p>
              <p className="mt-1 text-sm text-[#8fd6cf]">{card.s}</p>
            </div>
          </motion.div>
        );
      })}
      <span className="pointer-events-none absolute -bottom-7 inset-x-0 text-center text-xs text-white/40">
        Swipe the top card
      </span>
    </div>
  );
}
