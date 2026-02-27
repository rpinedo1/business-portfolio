"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-to-section";

function HeroVisual() {
  const bars = [32, 44, 40, 55, 52, 68, 61];

  return (
    <div className="relative mx-auto h-[360px] w-full max-w-[360px] sm:h-[420px] sm:max-w-none lg:h-[480px]">
      <div className="absolute inset-0 -m-8 rounded-full bg-blue-300/[0.10] blur-3xl orb-b" />

      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute left-0 top-6 w-[90%] rounded-2xl border border-black/8 bg-white shadow-2xl shadow-black/10"
      >
        <div className="flex items-center gap-1.5 border-b border-black/6 px-4 py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          <div className="ml-2 rounded-md bg-black/[0.04] px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
            your-landing-page
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Your Business
              </p>
              <p className="mt-0.5 text-2xl font-bold text-foreground">Live in 3–5 Days</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
              $0 setup
            </span>
          </div>
          <div className="mt-5 flex h-20 items-end gap-2">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md bg-gradient-to-t from-blue-500/25 to-blue-500/70"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "Mobile Ready", val: "✓" },
              { label: "Fast Load", val: "✓" },
              { label: "SEO Ready", val: "✓" },
            ].map((m) => (
              <div key={m.label} className="rounded-lg bg-black/[0.025] p-2.5">
                <p className="text-[10px] text-muted-foreground">{m.label}</p>
                <p className="mt-0.5 text-sm font-bold text-foreground">{m.val}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute right-0 top-8 w-44 rounded-xl border border-black/8 bg-white p-3.5 shadow-xl shadow-black/10"
        style={{ rotate: "2deg" }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Hosting Starts After
        </p>
        <p className="mt-1.5 text-sm font-semibold text-foreground">Your Page Goes Live</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          No upfront cost. Pay only when you&apos;re happy with the result.
        </p>
      </motion.div>
    </div>
  );
}

const trustPills = ["$0 to get started", "Live in 3–5 days", "No long-term contracts"];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-x-clip overflow-y-hidden noise-bg">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="orb-a absolute -top-24 left-[15%] h-[500px] w-[500px] rounded-full bg-amber/[0.12] blur-[120px]" />
        <div className="orb-b absolute right-[10%] top-[20%] h-80 w-80 rounded-full bg-blue-400/[0.12] blur-[90px]" />
        <div className="orb-c absolute bottom-0 left-[40%] h-72 w-72 rounded-full bg-sky-300/[0.10] blur-[80px]" />
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl overflow-x-hidden px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pt-36 lg:pb-20">
        <div className="flex w-full flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left: text content */}
          <div className="w-full min-w-0 flex-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-7 flex justify-center lg:justify-start"
            >
              <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 break-words rounded-full border border-amber/30 bg-amber-muted px-3 py-1.5 text-center text-xs font-semibold text-amber sm:px-4">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
                </span>
                $0 to get started — no credit card, no commitment
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)", lineHeight: 1.05 }}
            >
              Get a professional landing page for{" "}
              <span className="bg-gradient-to-r from-amber via-orange-500 to-amber bg-clip-text text-transparent">
                $0 setup
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:max-w-none"
            >
              We build your landing page at zero upfront cost. Pay only for hosting after it goes
              live. No contracts, no surprises.
            </motion.p>

            {/* Trust pills */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
            >
              {trustPills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11px] font-medium text-foreground/85"
                >
                  {pill}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.34 }}
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#contact");
                }}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-amber px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber/30 ring-1 ring-amber/40 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-xl hover:shadow-amber/35 active:translate-y-0"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80 opacity-80" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                Claim My $0 Setup Page
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
            <p className="mt-3 text-xs text-muted-foreground">
              Takes 2 minutes. No credit card required.
            </p>
          </div>

          {/* Right: floating visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full min-w-0 flex-1 overflow-hidden lg:max-w-[520px]"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
