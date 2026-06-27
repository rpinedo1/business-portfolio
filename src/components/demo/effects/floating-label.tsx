"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/** Form field whose label floats up on focus/fill — a classic micro-interaction. */
function Field({ label, type = "text" }: { label: string; type?: string }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full rounded-xl border border-white/12 bg-white/[0.03] px-3 pb-2 pt-5 text-sm text-white outline-none transition focus:border-[#8fd6cf]/60"
      />
      <motion.label
        animate={{
          y: floated ? -10 : 0,
          scale: floated ? 0.8 : 1,
          color: focused ? "#8fd6cf" : "rgba(255,255,255,0.45)",
        }}
        transition={{ duration: 0.18 }}
        className="pointer-events-none absolute left-3 top-3.5 origin-left text-sm"
      >
        {label}
      </motion.label>
    </div>
  );
}

export default function FloatingLabel() {
  return (
    <div className="w-full max-w-[15rem] space-y-3">
      <Field label="Your name" />
      <Field label="Email address" type="email" />
    </div>
  );
}
