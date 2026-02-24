"use client";

import { motion } from "framer-motion";
import { SectionHeader, SectionShell } from "@/components/section-shell";

const processSteps = [
  {
    step: "01",
    title: "Quick Strategy Call",
    description: "We align on your goal: more leads, more sales, or more time saved.",
    outcome: "Outcome: clear success target",
    pinBg: "bg-blue-500",
    pinShadow: "shadow-blue-200",
  },
  {
    step: "02",
    title: "Simple Growth Plan",
    description: "You get the exact pages, automations, and priorities to build first.",
    outcome: "Outcome: clear scope + timeline",
    pinBg: "bg-violet-500",
    pinShadow: "shadow-violet-200",
  },
  {
    step: "03",
    title: "Build in Weekly Sprints",
    description: "We ship each week, show progress, and adapt fast when priorities shift.",
    outcome: "Outcome: no surprises",
    pinBg: "bg-amber",
    pinShadow: "shadow-amber/30",
  },
  {
    step: "04",
    title: "Launch and Improve",
    description: "After launch, we track results and improve what drives revenue and efficiency.",
    outcome: "Outcome: measurable growth",
    pinBg: "bg-green-500",
    pinShadow: "shadow-green-200",
  },
];

export default function About() {
  return (
    <SectionShell id="about">
      <SectionHeader
        eyebrow="Our Process"
        title="Four simple steps from idea to measurable results"
        description="No long handoffs. No confusion. Just a clear plan and steady execution."
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
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="33%" stopColor="#8b5cf6" stopOpacity="0.35" />
              <stop offset="66%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <path
            d="M 7 11 C 7 24 93 24 93 37 C 93 50 7 50 7 63 C 7 76 93 76 93 89"
            fill="none"
            stroke="url(#processPathGrad)"
            strokeWidth="2.5"
            strokeDasharray="4 3"
            strokeLinecap="round"
          />
        </svg>

        {processSteps.map((step, index) => {
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
                className={`relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${step.pinBg} shadow-lg ${step.pinShadow} ring-4 ring-white`}
              >
                <span className="font-mono text-sm font-black text-white">{step.step}</span>
              </div>

              <article className="relative z-10 flex-1 rounded-2xl border border-black/8 bg-white p-4 shadow-[0_1px_3px_rgba(16,24,40,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                <p className="mt-2 text-xs font-semibold text-amber">{step.outcome}</p>
              </article>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}
