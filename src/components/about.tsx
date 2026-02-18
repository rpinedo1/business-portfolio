"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Users, Clock, ShieldCheck } from "lucide-react";

/* C9 StoryBrand: position us as the guide with empathy + authority
   C6 Kennedy: risk reversal
   M7 Objection-first: pre-handle trust, quality, timing concerns */
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

/* D4 Nielsen: match mental model with clear, numbered process */
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
    <section id="about" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-20 lg:grid-cols-2 lg:gap-24">
          {/* Left — Why Us */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium uppercase tracking-widest text-amber">
              Why Us
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Most Agencies Over-Promise.{" "}
              <span className="text-muted-foreground">We Over-Deliver.</span>
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              We keep our client list small on purpose. Fewer projects means
              deeper focus, faster turnaround, and results that actually match
              the proposal.
            </p>
            <div className="mt-10 grid gap-7 sm:grid-cols-2">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-muted text-amber">
                    <reason.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{reason.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Process */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium uppercase tracking-widest text-amber">
              Our Process
            </span>
            {/* C9 StoryBrand: give the customer a clear plan */}
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Four Steps. Zero Surprises.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              A proven process that keeps you informed, involved, and confident
              from first call to launch day — and beyond.
            </p>
            <div className="mt-10 space-y-5">
              {processSteps.map((step, i) => (
                <div
                  key={step.step}
                  className="group relative flex gap-5 rounded-xl border border-white/[0.06] bg-surface p-5 transition-all hover:border-amber/20"
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
                    <div className="absolute -bottom-2.5 left-[1.9rem] h-2.5 w-px bg-white/[0.06]" />
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
