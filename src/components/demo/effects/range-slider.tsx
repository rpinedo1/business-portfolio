"use client";

import { useState } from "react";

/** Native range input (touch-friendly) with a live gradient fill and value bubble. */
export default function RangeSlider() {
  const [value, setValue] = useState(64);

  return (
    <div className="w-full max-w-xs">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-xs uppercase tracking-[0.14em] text-white/45">
          Budget
        </span>
        <span className="font-display text-2xl text-white">
          ${(value * 100).toLocaleString()}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="demo-range h-2 w-full cursor-pointer appearance-none rounded-full"
        style={{
          background: `linear-gradient(90deg, #8fd6cf ${value}%, rgba(255,255,255,0.1) ${value}%)`,
        }}
      />
    </div>
  );
}
