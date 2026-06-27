"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionShell } from "@/components/section-shell";
import { scrollToSection } from "@/lib/scroll-to-section";

const points = [
  "Custom quote after scope",
  "Clear quote before work starts",
  "Landing pages can launch fast",
  "Optional hosting and care",
  "You own the finished site",
];

export default function FinalCTA() {
  return (
    <SectionShell>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-mineral/[0.12] via-card to-accent-soft px-8 py-14 text-center sm:px-12 lg:px-20"
      >
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-mineral/[0.18] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-plum-depth/16 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-mineral/20" />

        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mineral">
            Ready to start?
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Get a website you are not embarrassed to send people to
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Fill out the 5-minute intake form. We scope the project, quote it clearly, and build the smallest polished site that can do the job well.
          </p>

          <div className="mx-auto mt-6 flex flex-wrap justify-center gap-3">
            {points.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-1.5 rounded-full border border-mineral/25 bg-card/80 px-3 py-1.5 text-xs font-medium text-foreground/85"
              >
                <CheckCircle2 size={11} className="text-mineral" />
                {p}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-mineral px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-mineral/30 ring-1 ring-mineral/40 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-xl hover:shadow-mineral/35"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-card/80 opacity-80" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-card" />
              </span>
              Request a Quote
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <p className="mt-3 text-xs text-muted-foreground">
              No credit card required. No commitment until you approve the scope and price.
            </p>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
