"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/** SVG success check that draws itself. Tap to replay — works on touch. */
export default function AnimatedCheck() {
  const [key, setKey] = useState(0);

  return (
    <button
      type="button"
      onClick={() => setKey((k) => k + 1)}
      className="flex flex-col items-center gap-3"
    >
      <svg key={key} width="84" height="84" viewBox="0 0 84 84">
        <motion.circle
          cx="42"
          cy="42"
          r="38"
          fill="none"
          stroke="#0c5450"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        <motion.path
          d="M26 43 L38 55 L59 30"
          fill="none"
          stroke="#8fd6cf"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
        />
      </svg>
      <span className="text-xs text-white/45">Tap to replay</span>
    </button>
  );
}
