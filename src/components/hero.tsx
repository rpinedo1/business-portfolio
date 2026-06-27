"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-to-section";
import Magnetic from "@/components/magnetic";
import HeroParticles from "@/components/home/hero-particles";

const trustPills = ["Custom quote", "Fast launch timelines", "Clear project scope", "You own your site"];

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden noise-bg">
      {/* Background: drifting particle constellation + texture */}
      <div className="pointer-events-none absolute inset-0">
        <HeroParticles />
        <div className="absolute inset-0 grid-pattern opacity-40" />
        {/* Soft cream scrim to keep the centered text legible over the particles */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 52% 42% at 50% 46%, rgba(243,239,230,0.9) 0%, rgba(243,239,230,0.55) 38%, transparent 64%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-28 pb-20 text-center lg:pt-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-7 flex justify-center"
        >
          <span className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-mineral/30 bg-mineral-muted/80 px-4 py-1.5 text-xs font-semibold text-mineral backdrop-blur">
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
          className="font-display mx-auto max-w-2xl text-balance"
          style={{ fontSize: "clamp(2.1rem, 7vw, 4.4rem)", lineHeight: 1.04 }}
        >
          A website that stops the scroll &mdash; and makes you look{" "}
          <em className="italic text-mineral">ready to hire</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Custom-built around your offer, your proof, and the one action you want
          visitors to take &mdash;{" "}
          <span className="font-medium text-foreground">
            polished enough to earn trust from the very first second.
          </span>
        </motion.p>

        {/* Trust pills */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          {trustPills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-black/10 bg-card/80 px-3 py-1.5 text-[11px] font-medium text-foreground/85 backdrop-blur"
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
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
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
            className="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-black/10 bg-card/80 px-7 py-3.5 text-sm font-medium text-foreground shadow-sm backdrop-blur transition hover:bg-card hover:shadow-md"
          >
            See Sample Sites
            <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>
        <p className="mt-3 text-xs text-muted-foreground">
          Two-minute inquiry. A clear quote and scope before any work begins.
        </p>
      </div>
    </section>
  );
}
