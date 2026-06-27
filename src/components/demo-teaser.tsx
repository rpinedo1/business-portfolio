"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Magnetic from "@/components/magnetic";

const effects = [
  "3D tilt",
  "Magnetic CTAs",
  "Scroll parallax",
  "Particle WebGL",
  "Living gradients",
];

export default function DemoTeaser() {
  return (
    <section className="anchor-section px-6 py-20 lg:px-8 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c1016] px-6 py-14 text-white shadow-[0_40px_80px_-40px_rgba(12,16,22,0.6)] sm:px-12 lg:py-20"
      >
        {/* Ambient brand glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 18% 10%, rgba(5,96,91,0.4), transparent 55%)," +
              "radial-gradient(ellipse 45% 55% at 85% 90%, rgba(90,47,95,0.38), transparent 55%)," +
              "radial-gradient(ellipse 40% 40% at 60% 30%, rgba(176,133,66,0.18), transparent 50%)",
          }}
        />
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.6) 0.6px, transparent 0.7px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black, transparent 75%)",
          }}
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
            <Sparkles size={13} className="text-[#e3c489]" />
            Interactive capabilities
          </span>

          <h2 className="font-display mt-6 text-[2rem] leading-[1.08] sm:text-[2.8rem]">
            See what your site could{" "}
            <em className="italic text-[#e3c489]">actually do.</em>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60">
            A live playground of the motion, 3D, and micro-interactions I can build
            into your site &mdash; every one of them playable, and built to work on
            a phone too.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {effects.map((e) => (
              <span
                key={e}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/70"
              >
                {e}
              </span>
            ))}
          </div>

          <Magnetic strength={0.4} className="mt-9 inline-block">
            <Link
              href="/demo"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0c1016] shadow-lg shadow-black/30 transition hover:bg-[#e3c489]"
            >
              Explore the live demo
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
