"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useCapabilities } from "@/hooks/use-capabilities";

/** Tap a star to rate; desktop also previews on hover. Touch-friendly. */
export default function StarRating() {
  const { touch } = useCapabilities();
  const [value, setValue] = useState(4);
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => setValue(i)}
            onPointerEnter={() => !touch && setHover(i)}
            onPointerLeave={() => !touch && setHover(0)}
            whileTap={{ scale: 0.8 }}
            animate={{ scale: i <= shown ? 1.1 : 1 }}
            className="text-[#e3c489]"
            aria-label={`Rate ${i}`}
          >
            <Star
              size={28}
              fill={i <= shown ? "#e3c489" : "transparent"}
              className={i <= shown ? "" : "text-white/25"}
            />
          </motion.button>
        ))}
      </div>
      <span className="text-xs text-white/45">
        {shown}.0 — tap to rate
      </span>
    </div>
  );
}
