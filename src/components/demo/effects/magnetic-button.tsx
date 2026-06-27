"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCapabilities } from "@/hooks/use-capabilities";

type Ripple = { id: number; x: number; y: number };

/**
 * Button that's magnetically pulled toward the cursor on desktop. On touch it
 * can't follow a hover, so taps emit a ripple instead — same "tactile" payoff.
 */
export default function MagneticButton() {
  const { touch, reducedMotion } = useCapabilities();
  const ref = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 14 });
  const sy = useSpring(y, { stiffness: 220, damping: 14 });

  const handleMove = (e: React.PointerEvent) => {
    if (touch || reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * 0.4);
    y.set(my * 0.4);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - r.left, y: e.clientY - r.top },
    ]);
    setTimeout(() => setRipples((prev) => prev.filter((p) => p.id !== id)), 650);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerDown={handleClick}
      style={{ x: sx, y: sy }}
      className="relative overflow-hidden rounded-full bg-[#0c5450] px-8 py-4 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(5,96,91,0.9)] ring-1 ring-white/15"
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {touch ? "Tap me" : "Pull me"}
        <ArrowUpRight size={16} />
      </span>
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 6, opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="pointer-events-none absolute h-16 w-16 rounded-full bg-white/40"
          style={{ left: r.x - 32, top: r.y - 32 }}
        />
      ))}
    </motion.button>
  );
}
