"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCapabilities } from "@/hooks/use-capabilities";

type MagneticProps = {
  children: React.ReactNode;
  /** How far the element follows the cursor (fraction of offset). */
  strength?: number;
  className?: string;
};

/**
 * Wraps a child so it's magnetically pulled toward the cursor on devices with a
 * fine pointer. On touch or reduced-motion it renders a plain, static wrapper.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: MagneticProps) {
  const { touch, reducedMotion } = useCapabilities();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.5 });

  const disabled = touch || reducedMotion;

  const handleMove = (e: React.PointerEvent) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={disabled ? undefined : { x: sx, y: sy }}
      className={className ?? "inline-block"}
    >
      {children}
    </motion.span>
  );
}
