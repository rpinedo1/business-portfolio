"use client";

import { motion } from "framer-motion";
import { SectionHeader, SectionShell } from "@/components/section-shell";

const steps = [
  {
    step: "01",
    title: "Send a quick project inquiry",
    description:
      "Tell me what you need, who the site is for, which pages matter, and the action visitors should take. Two minutes, no pressure.",
    outcome: "Takes about 2 minutes",
    pinBg: "bg-mineral",
    pinShadow: "shadow-mineral/20",
  },
  {
    step: "02",
    title: "I quote the scope and build the draft",
    description:
      "You get a clear estimate, timeline, and deliverables up front. Once you approve, I design and build the first working draft.",
    outcome: "Clear price before work starts",
    pinBg: "bg-plum-depth",
    pinShadow: "shadow-plum-depth/20",
  },
  {
    step: "03",
    title: "You approve and go live",
    description:
      "Review the site, request the included revisions, and approve launch. Hosting and care can be handled for you or handed off.",
    outcome: "Live and generating leads",
    pinBg: "bg-[#0d5c63]",
    pinShadow: "shadow-[#0d5c63]/20",
  },
];

export default function About() {
  return (
    <SectionShell id="about">
      <SectionHeader
        eyebrow="How It Works"
        title="From idea to a website you can confidently share"
        description="Three steps: scope the project, build the site, launch it cleanly."
      />

      <div className="relative mt-10">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="processPathGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#006b68" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#5b315f" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0d5c63" stopOpacity="0.30" />
            </linearGradient>
          </defs>
          <path
            d="M 7 14 C 7 28 93 28 93 50 C 93 72 7 72 7 86"
            fill="none"
            stroke="url(#processPathGrad)"
            strokeWidth="2.5"
            strokeDasharray="4 3"
            strokeLinecap="round"
          />
        </svg>

        {steps.map((step, index) => {
          const isRight = index % 2 === 1;
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: isRight ? 16 : -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.12 }}
              className={`relative mb-5 flex items-center gap-3 last:mb-0 ${isRight ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${step.pinBg} shadow-lg ${step.pinShadow} ring-4 ring-background`}
              >
                <span className="font-mono text-sm font-black text-white">{step.step}</span>
              </div>

              <article className="relative z-10 flex-1 rounded-2xl border border-black/8 bg-card p-4 shadow-[0_1px_3px_rgba(16,24,40,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                <p className="mt-2 text-xs font-semibold text-mineral">{step.outcome}</p>
              </article>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Landing pages can move fast. Larger websites get a realistic timeline before the invoice is approved.
      </p>
    </SectionShell>
  );
}
