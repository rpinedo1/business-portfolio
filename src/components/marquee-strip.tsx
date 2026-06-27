"use client";

import { motion } from "framer-motion";
import { useCapabilities } from "@/hooks/use-capabilities";

const INDUSTRIES = [
  "Law Firms",
  "Dental Practices",
  "HVAC & Home Services",
  "Med Spas",
  "Contractors",
  "Real Estate",
  "Salons & Studios",
  "Clinics",
  "Restaurants",
  "Auto Shops",
  "Fitness",
  "Accountants",
];

function Row({ reverse, paused }: { reverse: boolean; paused: boolean }) {
  const loop = [...INDUSTRIES, ...INDUSTRIES];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex shrink-0 gap-3 pr-3"
        animate={paused ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap rounded-full border border-black/8 bg-card px-5 py-2 text-sm font-medium text-foreground/75 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function MarqueeStrip() {
  const { reducedMotion } = useCapabilities();

  return (
    <section className="overflow-hidden py-10">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Built for service businesses like
      </p>
      <Row reverse={false} paused={reducedMotion} />
    </section>
  );
}
