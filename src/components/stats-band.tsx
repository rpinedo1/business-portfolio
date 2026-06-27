"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useCapabilities } from "@/hooks/use-capabilities";

const STATS = [
  { value: 48, suffix: "h", label: "to first working draft" },
  { value: 100, suffix: "%", label: "custom built, you own it" },
  { value: 3, suffix: "x", label: "faster than a page builder" },
  { value: 0, prefix: "$", suffix: "", label: "until scope is agreed" },
];

function Stat({
  value,
  prefix,
  suffix,
  label,
  start,
  instant,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  start: boolean;
  instant: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (instant || value === 0) {
      setN(value);
      return;
    }
    const duration = 1400;
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
      <div className="font-display text-4xl text-foreground sm:text-5xl">
        {prefix}
        {n}
        <span className="text-mineral">{suffix}</span>
      </div>
      <div className="mx-auto mt-2 max-w-[12rem] text-sm leading-snug text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export default function StatsBand() {
  const { reducedMotion } = useCapabilities();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="px-6 py-14 lg:px-8">
      <div
        ref={ref}
        className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-10 rounded-3xl border border-black/8 bg-card/60 px-6 py-12 shadow-[0_1px_3px_rgba(16,24,40,0.05)] backdrop-blur-sm sm:px-10 lg:grid-cols-4"
      >
        {STATS.map((s) => (
          <Stat key={s.label} {...s} start={inView} instant={reducedMotion} />
        ))}
      </div>
    </section>
  );
}
