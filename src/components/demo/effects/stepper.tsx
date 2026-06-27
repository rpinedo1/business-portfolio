"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

const STEPS = ["Brief", "Design", "Build", "Launch"];

/** A multi-step progress indicator with an animated connector. Tap to advance. */
export default function Stepper() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-6">
      <div className="relative flex w-full items-center justify-between">
        {/* Track */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-white/10" />
        <motion.div
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-[#8fd6cf]"
          animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        {STEPS.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div key={label} className="relative z-10 flex flex-col items-center gap-2">
              <motion.div
                animate={{
                  scale: active ? 1.15 : 1,
                  backgroundColor: done || active ? "#0c5450" : "#1a1d23",
                }}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-xs font-semibold text-white"
              >
                {done ? <Check size={14} className="text-[#8fd6cf]" /> : i + 1}
              </motion.div>
              <span className="text-[10px] text-white/50">{label}</span>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="rounded-lg border border-white/12 px-4 py-1.5 text-xs text-white/70 transition hover:bg-white/[0.05]"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
          className="rounded-lg bg-[#0c5450] px-4 py-1.5 text-xs font-semibold text-white transition hover:brightness-110"
        >
          Next
        </button>
      </div>
    </div>
  );
}
