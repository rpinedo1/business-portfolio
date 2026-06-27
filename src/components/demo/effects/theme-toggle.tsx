"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

/** A tactile day/night switch with a sliding, color-shifting knob. Tap-driven. */
export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => setDark((d) => !d)}
        aria-pressed={dark}
        className="relative flex h-12 w-24 items-center rounded-full p-1.5 transition-colors"
        style={{ background: dark ? "#0c1c2e" : "#cbe6ff" }}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="grid h-9 w-9 place-items-center rounded-full shadow-lg"
          style={{
            marginLeft: dark ? 0 : "auto",
            background: dark ? "#1d3a5f" : "#ffd66b",
          }}
        >
          <motion.span
            key={dark ? "moon" : "sun"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            className={dark ? "text-[#8fd6cf]" : "text-[#a86b1f]"}
          >
            {dark ? <Moon size={18} /> : <Sun size={18} />}
          </motion.span>
        </motion.span>
      </button>
      <span className="text-xs text-white/45">Tap to switch mode</span>
    </div>
  );
}
