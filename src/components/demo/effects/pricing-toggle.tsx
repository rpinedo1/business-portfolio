"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Billing toggle with an animated price roll and a sliding switch. Tap-driven. */
export default function PricingToggle() {
  const [annual, setAnnual] = useState(false);
  const price = annual ? 80 : 99;

  return (
    <div className="flex flex-col items-center gap-5">
      <button
        type="button"
        onClick={() => setAnnual((a) => !a)}
        className="flex items-center gap-3 text-sm"
        aria-pressed={annual}
      >
        <span className={annual ? "text-white/40" : "text-white"}>Monthly</span>
        <span className="relative h-7 w-12 rounded-full bg-white/10 p-1">
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className="block h-5 w-5 rounded-full bg-[#8fd6cf]"
            style={{ marginLeft: annual ? "auto" : 0 }}
          />
        </span>
        <span className={annual ? "text-white" : "text-white/40"}>Annual</span>
      </button>

      <div className="flex items-end gap-1">
        <span className="font-display text-2xl text-white/70">$</span>
        <div className="relative h-12 w-16 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={price}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-display absolute inset-0 text-5xl text-white"
            >
              {price}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="mb-1 text-sm text-white/45">/mo</span>
      </div>

      <AnimatePresence>
        {annual ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="rounded-full bg-[#0c5450] px-3 py-1 text-xs font-semibold text-[#8fd6cf]"
          >
            Save 19%
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
