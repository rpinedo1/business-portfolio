"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useCapabilities } from "@/hooks/use-capabilities";

const TARGET = 92;
const SIZE = 132;
const STROKE = 10;
const R = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;

/** Circular progress that draws + counts up when scrolled into view. */
export default function ProgressRing() {
  const { reducedMotion } = useCapabilities();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setPct(TARGET);
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1400);
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * TARGET));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reducedMotion]);

  return (
    <div ref={ref} className="relative grid place-items-center">
      <svg width={SIZE} height={SIZE} className="-rotate-90">
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC - (pct / 100) * CIRC}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8fd6cf" />
            <stop offset="100%" stopColor="#e3c489" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-3xl text-white">{pct}%</div>
        <div className="text-[10px] uppercase tracking-[0.14em] text-white/45">
          Performance
        </div>
      </div>
    </div>
  );
}
