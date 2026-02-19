"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Users, Clock, ShieldCheck } from "lucide-react";
import { SectionHeader, SectionShell } from "@/components/section-shell";

const reasons = [
  {
    icon: Users,
    title: "Partner, Not Vendor",
    description:
      "We take on fewer clients so we can go deep. Your goals become our goals — and we stay involved long after launch day.",
  },
  {
    icon: Clock,
    title: "Weekly Deliverables",
    description:
      "No months of radio silence. You see working progress every week with demos, feedback loops, and clear next steps.",
  },
  {
    icon: ShieldCheck,
    title: "Code You Can Trust",
    description:
      "Clean architecture, automated tests, and real documentation. Your next developer will thank you (and us).",
  },
  {
    icon: CheckCircle2,
    title: "Tied to Your KPIs",
    description:
      "Every design and engineering decision maps to a business outcome. If it doesn't move the needle, we don't build it.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    description:
      "We learn your business, your users, and what success looks like. You walk away with clarity — even if we're not the right fit.",
  },
  {
    step: "02",
    title: "Strategy & Roadmap",
    description:
      "We map out the technical approach, define milestones, and give you a transparent, fixed-scope proposal.",
  },
  {
    step: "03",
    title: "Build & Iterate",
    description:
      "Agile sprints with weekly demos. You're in the loop at every step, and can change direction without starting over.",
  },
  {
    step: "04",
    title: "Launch & Grow",
    description:
      "We deploy, monitor performance, and optimize based on real user data. Then we help you scale what's working.",
  },
];

export default function About() {
  return (
    <SectionShell id="about">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeader
            eyebrow="Why Us"
            title="A focused team that ships consistently"
            description="We keep our client roster small so each project gets direct senior attention from strategy to launch."
          />

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mt-10 grid gap-7 sm:grid-cols-2"
          >
            {reasons.map((reason) => (
              <article key={reason.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-muted text-amber">
                  <reason.icon size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{reason.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        <div>
          <SectionHeader
            eyebrow="Our Process"
            title="Four steps, zero surprises"
            description="You get weekly progress, clear milestones, and direct communication from kickoff through post-launch."
          />
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mt-10 space-y-4"
          >
            {processSteps.map((step, i) => (
              <article
                key={step.step}
                className="group relative flex gap-5 rounded-xl border border-black/8 bg-white/90 p-5 shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition hover:border-amber/25"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-muted font-mono text-sm font-bold text-amber">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="absolute -bottom-2 left-[1.9rem] h-2 w-px bg-black/10" />
                )}
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
}
