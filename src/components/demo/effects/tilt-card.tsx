"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Layers } from "lucide-react";
import { useCapabilities } from "@/hooks/use-capabilities";

/**
 * A card that tilts in 3D toward the cursor. On touch devices (no fine pointer)
 * it tilts with device orientation instead, so it still feels alive in the hand.
 */
export default function TiltCard() {
  const { touch, reducedMotion } = useCapabilities();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0); // -0.5..0.5
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-14, 14]), {
    stiffness: 150,
    damping: 18,
  });
  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);

  useEffect(() => {
    if (reducedMotion || !touch) return;
    const onOrient = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0; // left/right [-90,90]
      const beta = (e.beta ?? 0) - 45; // front/back, recentre to a held angle
      px.set(Math.max(-0.5, Math.min(0.5, gamma / 45)));
      py.set(Math.max(-0.5, Math.min(0.5, beta / 45)));
    };
    window.addEventListener("deviceorientation", onOrient);
    return () => window.removeEventListener("deviceorientation", onOrient);
  }, [touch, reducedMotion, px, py]);

  const handlePointer = (e: React.PointerEvent) => {
    if (touch) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    if (touch) return;
    px.set(0);
    py.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointer}
      onPointerLeave={reset}
      className="flex h-full w-full items-center justify-center"
      style={{ perspective: 900 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-40 w-60 rounded-2xl border border-white/15 bg-gradient-to-br from-[#0c5450] to-[#3a2050] p-5 shadow-2xl"
      >
        <div style={{ transform: "translateZ(40px)" }}>
          <Layers className="text-[#8fd6cf]" size={22} />
          <p className="font-display mt-4 text-xl text-white">Your Product</p>
          <p className="mt-1 text-xs text-white/60">Depth that follows the eye</p>
        </div>
        <div
          style={{ transform: "translateZ(20px)" }}
          className="absolute bottom-4 right-4 rounded-lg bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur"
        >
          3D
        </div>
        {/* Glare */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: useTransform(
              glareX,
              (x) =>
                `radial-gradient(circle at ${x} 0%, rgba(255,255,255,0.28), transparent 55%)`,
            ),
          }}
        />
      </motion.div>
    </div>
  );
}
