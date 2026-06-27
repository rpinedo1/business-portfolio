"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const ITEMS = [
  { q: "How fast can it launch?", a: "Landing pages can go live in days; larger sites get a realistic timeline up front." },
  { q: "Will it work on mobile?", a: "Every build is mobile-first and tested across real devices." },
  { q: "Do I own the site?", a: "Yes — you own the code, content, and domain. No lock-in." },
];

/** Tap-to-expand accordion with animated height. Mobile-native. */
export default function Accordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="w-full space-y-2">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-white/90"
            >
              {item.q}
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0 text-[#8fd6cf]"
              >
                <Plus size={16} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-4 pb-3 text-xs leading-relaxed text-white/55">
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
