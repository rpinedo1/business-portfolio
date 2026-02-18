"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Users, Clock, ShieldCheck } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Partner, Not Vendor",
    description:
      "We embed with your team. Your goals are our goals — and we don't disappear after launch.",
  },
  {
    icon: Clock,
    title: "Ship Fast, Iterate Faster",
    description:
      "Agile sprints with weekly deliverables. You see progress constantly, not after months of silence.",
  },
  {
    icon: ShieldCheck,
    title: "Built to Last",
    description:
      "Clean architecture, tested code, and documentation that means your next developer won't curse us.",
  },
  {
    icon: CheckCircle2,
    title: "Results-Obsessed",
    description:
      "Every decision we make ties back to your KPIs. Beautiful code means nothing if it doesn't convert.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "We learn your business, goals, and users inside and out.",
  },
  {
    step: "02",
    title: "Strategy",
    description: "We map out the technical approach and user experience.",
  },
  {
    step: "03",
    title: "Build",
    description: "Iterative development with weekly demos and feedback loops.",
  },
  {
    step: "04",
    title: "Launch & Grow",
    description: "Deploy, monitor, optimize, and scale based on real data.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left - Why Us */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium uppercase tracking-widest text-amber">
              Why Us
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              We Build Different
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Most agencies over-promise and under-deliver. We take a different
              approach — fewer clients, deeper relationships, better outcomes.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-muted text-amber">
                    <reason.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{reason.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Process */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium uppercase tracking-widest text-amber">
              Our Process
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              From Idea to Impact
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A proven, transparent process that keeps you in the loop and
              ensures we ship the right thing, the right way.
            </p>
            <div className="mt-10 space-y-6">
              {processSteps.map((step, i) => (
                <div
                  key={step.step}
                  className="group relative flex gap-6 rounded-xl border border-white/5 bg-card p-5 transition-all hover:border-amber/20"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold text-amber">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{step.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="absolute -bottom-3 left-9 h-3 w-px bg-white/10" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
