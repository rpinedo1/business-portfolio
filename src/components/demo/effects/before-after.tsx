"use client";

import { useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

/**
 * Before/after reveal slider. Uses pointer capture so a single handler drives
 * both mouse drag and touch drag identically.
 */
export default function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(52);
  const dragging = useRef(false);

  const setFromEvent = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={ref}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromEvent(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromEvent(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      className="relative h-44 w-full max-w-sm cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl border border-white/12"
    >
      {/* After (full) */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0c5450] via-[#0d5c63] to-[#3a2050]">
        <span className="font-display text-2xl text-white">After</span>
      </div>
      {/* Before (clipped) */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-[#1a1d23]"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <span className="font-display text-2xl text-white/40">Before</span>
      </div>
      {/* Handle */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white/80"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-1.5 text-[#0c1016] shadow-lg">
          <MoveHorizontal size={14} />
        </span>
      </div>
    </div>
  );
}
