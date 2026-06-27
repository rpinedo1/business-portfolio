"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-to-section";
import Magnetic from "@/components/magnetic";
import Tilt from "@/components/tilt";
import AuroraField from "@/components/aurora-field";

function HeroVisual() {
  return (
    <div className="relative mx-auto h-[380px] w-full max-w-[380px] sm:h-[440px] sm:max-w-none lg:h-[500px]">
      <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_60%_30%,rgba(0,107,104,0.18),transparent_38%),linear-gradient(135deg,rgba(91,49,95,0.10),rgba(16,21,31,0.045))]" />

      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute left-0 top-5 w-[92%] overflow-hidden rounded-2xl border border-black/8 bg-card shadow-2xl shadow-black/[0.12]"
      >
        <div className="flex items-center justify-between border-b border-black/6 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-plum-depth/45" />
            <div className="h-2.5 w-2.5 rounded-full bg-mineral/55" />
            <div className="h-2.5 w-2.5 rounded-full bg-foreground/35" />
          </div>
          <div className="rounded-md bg-black/[0.04] px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
            website-preview
          </div>
        </div>

        <div className="grid grid-cols-[1fr_0.7fr] gap-4 p-5">
          <div>
            <div className="h-3 w-20 rounded-full bg-mineral/25" />
            <div className="mt-3 h-8 w-full rounded-lg bg-foreground" />
            <div className="mt-2 h-8 w-4/5 rounded-lg bg-foreground/90" />
            <div className="mt-4 h-2 w-11/12 rounded-full bg-black/10" />
            <div className="mt-2 h-2 w-8/12 rounded-full bg-black/10" />
            <div className="mt-5 flex gap-2">
              <div className="h-9 w-28 rounded-lg bg-mineral" />
              <div className="h-9 w-24 rounded-lg border border-black/10 bg-surface" />
            </div>
          </div>

          <div className="rounded-xl border border-black/8 bg-surface-raised p-3">
            <div className="h-2 w-20 rounded-full bg-black/[0.12]" />
            <div className="mt-3 grid gap-2">
              <div className="h-12 rounded-lg bg-card shadow-sm" />
              <div className="h-12 rounded-lg bg-card shadow-sm" />
              <div className="h-12 rounded-lg bg-card shadow-sm" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-black/6 bg-surface p-4">
          {["Offer", "Proof", "Contact"].map((label) => (
            <div key={label} className="rounded-lg border border-black/6 bg-card p-2.5">
              <div className="h-10 rounded-md bg-surface-raised" />
              <p className="mt-2 text-[10px] font-semibold text-foreground/70">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 2 }}
        transition={{ duration: 0.65, delay: 0.58 }}
        className="absolute bottom-10 right-0 w-40 overflow-hidden rounded-[1.25rem] border border-black/10 bg-card shadow-2xl shadow-black/[0.12] sm:w-48"
      >
        <div className="border-b border-black/6 bg-surface px-4 py-3">
          <div className="mx-auto h-1 w-10 rounded-full bg-black/15" />
        </div>
        <div className="p-3">
          <div className="h-16 rounded-xl bg-foreground" />
          <div className="mt-3 h-2 w-4/5 rounded-full bg-black/[0.12]" />
          <div className="mt-2 h-2 w-3/5 rounded-full bg-black/[0.12]" />
          <div className="mt-4 space-y-2">
            <div className="h-10 rounded-lg border border-black/8 bg-surface-raised" />
            <div className="h-10 rounded-lg border border-black/8 bg-surface-raised" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20, rotate: 1 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute right-2 top-10 w-52 rounded-xl border border-black/8 bg-card p-4 shadow-xl shadow-black/10"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-mineral">
          Build checklist
        </p>
        <div className="mt-3 space-y-2">
          {["Homepage structure", "Mobile layout", "Contact path"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs font-medium text-foreground/80">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-mineral-muted text-[10px] font-bold text-plum-depth">
                ✓
              </span>
              {item}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.82 }}
        className="absolute bottom-3 left-5 hidden rounded-xl border border-black/8 bg-foreground px-4 py-3 font-mono text-[11px] text-white shadow-xl shadow-black/[0.12] sm:block"
      >
        <span className="text-mineral-muted">deploy</span> /business-site
      </motion.div>
    </div>
  );
}

const trustPills = ["Custom quote", "Fast launch timelines", "Clear project scope", "You own your site"];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-x-clip overflow-y-hidden noise-bg">
      <div className="pointer-events-none absolute inset-0">
        <AuroraField />
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/70 to-transparent" />
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
              <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 break-words rounded-full border border-mineral/30 bg-mineral-muted px-3 py-1.5 text-center text-xs font-semibold text-mineral sm:px-4">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mineral opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mineral" />
                </span>
                Custom websites for service businesses
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display"
              style={{ fontSize: "clamp(2.1rem, 7.4vw, 4.6rem)", lineHeight: 1.04 }}
            >
              A sharp website that makes your business look{" "}
              <em className="italic text-mineral">ready to hire</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:max-w-none"
            >
              I build polished websites around your offer, your proof, and the one action you want visitors to take.{" "}
              <span className="font-medium text-foreground">
                Clear scope, fast replies, and a site that earns trust from the first click.
              </span>
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
                className="rounded-full border border-black/10 bg-card px-3 py-1.5 text-[11px] font-medium text-foreground/85"
                >
                  {pill}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.34 }}
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Magnetic strength={0.4}>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#contact");
                  }}
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-mineral px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-mineral/30 ring-1 ring-mineral/40 transition-all duration-200 hover:brightness-105 hover:shadow-xl hover:shadow-mineral/35"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-card/80 opacity-80" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-card" />
                  </span>
                  Request a Quote
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </Magnetic>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#work");
                }}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-black/10 bg-card/80 px-7 py-3.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-card hover:shadow-md"
              >
                See Sample Sites
                <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
              </a>
            </motion.div>
            <p className="mt-3 text-xs text-muted-foreground">
              Two-minute inquiry. A clear quote and scope before any work begins.
            </p>
          </div>

          {/* Right: floating visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full min-w-0 flex-1 overflow-hidden lg:max-w-[520px]"
          >
            <Tilt max={7} className="h-full w-full">
              <HeroVisual />
            </Tilt>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
