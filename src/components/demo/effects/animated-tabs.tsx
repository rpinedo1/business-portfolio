"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TABS = [
  { label: "Design", body: "Pixel-precise layouts shaped around your offer and brand." },
  { label: "Build", body: "Fast, accessible, SEO-ready code you actually own." },
  { label: "Launch", body: "Deploy, connect your domain, and hand over the keys." },
];

/** Tabs with a sliding active pill (shared layout) and crossfading content. */
export default function AnimatedTabs() {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full max-w-xs">
      <div className="flex gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
        {TABS.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActive(i)}
            className="relative flex-1 rounded-full px-3 py-2 text-xs font-semibold text-white/70 transition-colors"
          >
            {active === i ? (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-[#0c5450]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            ) : null}
            <span className={active === i ? "relative text-white" : "relative"}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-4 min-h-[3.5rem] text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-sm leading-relaxed text-white/60"
          >
            {TABS[active].body}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
