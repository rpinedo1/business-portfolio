"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCapabilities } from "@/hooks/use-capabilities";

type TiltProps = {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  max?: number;
  /** Show a soft light glare that follows the cursor. */
  glare?: boolean;
  /** Optional rounding for the glare layer to match the child. */
  glareClassName?: string;
};

/**
 * Tilts any child in 3D toward the cursor on fine-pointer devices. On touch or
 * reduced-motion it renders a plain static wrapper — the content is unaffected,
 * so this is a safe progressive enhancement.
 */
export default function Tilt({
  children,
  className,
  max = 8,
  glare = false,
  glareClassName,
}: TiltProps) {
  const { touch, reducedMotion } = useCapabilities();
  const ref = useRef<HTMLDivElement>(null);
  const disabled = touch || reducedMotion;

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);
  const glareBg = useTransform(
    [px, py],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.5), transparent 55%)`,
  );

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
    >
      {children}
      {glare ? (
        <motion.div
          aria-hidden
          style={{ background: glareBg }}
          className={`pointer-events-none absolute inset-0 z-20 mix-blend-soft-light ${glareClassName ?? ""}`}
        />
      ) : null}
    </motion.div>
  );
}
