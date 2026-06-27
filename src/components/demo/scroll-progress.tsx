"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient progress bar pinned to the top of the page. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-[#05605b] via-[#5a2f5f] to-[#b08542]"
    />
  );
}
