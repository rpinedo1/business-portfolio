"use client";

import { motion } from "framer-motion";
import { useCapabilities } from "@/hooks/use-capabilities";

/** Headline with a gradient sheen that sweeps across it. Static on reduced-motion. */
export default function ShimmerText() {
  const { reducedMotion } = useCapabilities();

  return (
    <div className="text-center">
      <motion.span
        className="font-display bg-clip-text text-3xl text-transparent sm:text-4xl"
        style={{
          backgroundImage:
            "linear-gradient(110deg, #5d6472 35%, #ffffff 50%, #5d6472 65%)",
          backgroundSize: "220% 100%",
        }}
        animate={reducedMotion ? undefined : { backgroundPosition: ["180% 0", "-80% 0"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        Premium by default
      </motion.span>
      <p className="mt-3 text-xs text-white/45">Subtle sheen on key headlines</p>
    </div>
  );
}
