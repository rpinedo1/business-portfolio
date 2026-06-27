"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useCapabilities } from "@/hooks/use-capabilities";

const STATS = [
  { value: 100, suffix: "%", label: "Custom built" },
  { value: 3, suffix: "x", label: "Faster load" },
  { value: 48, suffix: "h", label: "First draft" },
];

function Stat({
  value,
  suffix,
  label,
  start,
  instant,
}: (typeof STATS)[number] & { start: boolean; instant: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (instant) {
      setN(value);
      return;
    }
    const duration = 1300;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value, instant]);

  return (
    <div className="text-center">
      <div className="font-display text-4xl text-white sm:text-5xl">
        {n}
        <span className="text-[#e3c489]">{suffix}</span>
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/45">
        {label}
      </div>
    </div>
  );
}

export default function CountUp() {
  const { reducedMotion } = useCapabilities();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="flex w-full items-center justify-around gap-3">
      {STATS.map((s) => (
        <Stat key={s.label} {...s} start={inView} instant={reducedMotion} />
      ))}
    </div>
  );
}
