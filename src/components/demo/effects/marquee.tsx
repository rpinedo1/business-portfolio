"use client";

import { motion } from "framer-motion";
import { useCapabilities } from "@/hooks/use-capabilities";

const ROW_A = ["Next.js", "React", "Tailwind", "Framer Motion", "WebGL", "TypeScript"];
const ROW_B = ["Booking", "Payments", "SEO", "Analytics", "CMS", "Automations"];

function Row({
  items,
  direction,
  paused,
}: {
  items: string[];
  direction: 1 | -1;
  paused: boolean;
}) {
  const loop = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-3 pr-3"
        animate={paused ? undefined : { x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm font-medium text-white/75"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Infinite dual-direction ticker. Pure transform loop — smooth on mobile. */
export default function Marquee() {
  const { reducedMotion } = useCapabilities();
  return (
    <div className="flex w-full flex-col justify-center gap-3">
      <Row items={ROW_A} direction={1} paused={reducedMotion} />
      <Row items={ROW_B} direction={-1} paused={reducedMotion} />
    </div>
  );
}
