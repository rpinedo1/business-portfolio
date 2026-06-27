"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

/** Click/tap to copy, with animated success feedback. */
export default function CopyClipboard() {
  const [copied, setCopied] = useState(false);
  const text = "hello@nexgen.studio";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard may be blocked; still show feedback */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group flex items-center gap-3 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 font-mono text-sm text-white/80 transition hover:border-[#8fd6cf]/40"
    >
      {text}
      <span className="relative grid h-5 w-5 place-items-center">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute text-[#8fd6cf]"
            >
              <Check size={16} />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute text-white/50"
            >
              <Copy size={15} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}
