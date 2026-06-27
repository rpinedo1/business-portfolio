"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { useCapabilities } from "@/hooks/use-capabilities";

// WebGL scene is loaded only on the client, only when we decide to mount it.
const WebglHeroScene = dynamic(() => import("./webgl-hero-scene"), {
  ssr: false,
});

/** Static, dependency-free poster shown on mobile / low-power / reduced-motion. */
function HeroPoster() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(5,96,91,0.55), transparent 42%)," +
            "radial-gradient(circle at 64% 58%, rgba(90,47,95,0.5), transparent 46%)," +
            "radial-gradient(circle at 38% 60%, rgba(176,133,66,0.28), transparent 40%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.5) 0.6px, transparent 0.7px)",
          backgroundSize: "18px 18px",
          maskImage:
            "radial-gradient(circle at 50% 48%, black, transparent 60%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 48%, black, transparent 60%)",
        }}
      />
    </div>
  );
}

export default function WebglHero() {
  const { ready, allowWebGL, webglTier } = useCapabilities();

  return (
    <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#0c1016] text-white">
      {/* Visual layer */}
      <div className="absolute inset-0 z-0">
        {ready && allowWebGL ? (
          <WebglHeroScene lite={webglTier === "lite"} />
        ) : (
          <HeroPoster />
        )}
        {/* Vignette + bottom fade for text legibility */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_45%,transparent,rgba(8,11,16,0.55))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0c1016] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur"
        >
          <Sparkles size={13} className="text-[#d9b873]" />
          Interactive capabilities
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="font-display mt-6 text-balance text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-7xl"
        >
          The kind of website that makes people{" "}
          <em className="italic text-[#e3c489]">stop scrolling.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
        >
          Every effect below is live, built from scratch, and ready to drop into
          your build. Move your cursor, scroll, tap, drag &mdash; then picture it
          carrying your brand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex items-center justify-center"
        >
          <a
            href="#gallery"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/85 backdrop-blur transition hover:bg-white/[0.1]"
          >
            Explore the effects
            <ArrowDown
              size={15}
              className="transition-transform group-hover:translate-y-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
