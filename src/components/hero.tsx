"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MousePointerClick, ShieldCheck, Sparkles } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-to-section";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const proofItems = [
  { label: "Projects delivered", value: "50+" },
  { label: "Avg. launch time", value: "8.2 weeks" },
  { label: "Client retention", value: "78%" },
  { label: "Response time", value: "<2 business hours" },
];

const heroCopy = {
  default: {
    badge: "Next kickoff window: March 18, 2026",
    title: "We build revenue-focused web apps and AI workflows for B2B teams in 6-10 weeks",
    body: "Typical outcomes: faster sales cycles, lower support load, and measurable conversion lift within 90 days.",
  },
  ai: {
    badge: "AI build sprint starts March 18, 2026",
    title: "Cut support workload with production-safe AI workflows",
    body: "From scoped RAG assistants to internal automations, we ship secure AI systems that reduce response times and free up your team.",
  },
  web: {
    badge: "Website sprint starts March 18, 2026",
    title: "Increase qualified pipeline from your existing traffic",
    body: "Messaging, UX, and implementation are built as one system so your site drives qualified inquiries, not vanity metrics.",
  },
  app: {
    badge: "Product sprint starts March 18, 2026",
    title: "Ship conversion-critical product features in weeks",
    body: "We prioritize the highest-impact workflows, ship fast, and instrument outcomes so product work translates into business growth.",
  },
} as const;

function HeroVisualControl() {
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
            funnel-performance
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Qualified Pipeline</p>
              <p className="mt-0.5 text-2xl font-bold text-foreground">+41%</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
              90-day window
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
              { label: "Lead Quality", val: "Higher" },
              { label: "Sales Speed", val: "Faster" },
              { label: "Funnel Clarity", val: "Stronger" },
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
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Primary CTA</p>
        <p className="mt-1.5 text-sm font-semibold text-foreground">Get Build Plan</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Clear next step and immediate value framing.
        </p>
      </motion.div>
    </div>
  );
}

/* Floating UI visual — creative conversion system */
function HeroVisualCreative() {
  return (
    <div className="relative mx-auto h-[360px] w-full max-w-[360px] sm:h-[420px] sm:max-w-none lg:h-[480px]">
      <div className="absolute inset-0 -m-8 rounded-full bg-amber/[0.09] blur-3xl orb-b" />
      <div className="absolute -left-4 top-10 h-24 w-24 rounded-full bg-blue-400/20 blur-2xl" />
      <div className="absolute bottom-8 right-4 h-20 w-20 rounded-full bg-emerald-300/20 blur-2xl" />

      {/* Main conversion mockup */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute left-0 top-6 w-[90%] overflow-hidden rounded-2xl border border-black/8 bg-white shadow-2xl shadow-black/10"
      >
        <div className="flex items-center gap-1.5 border-b border-black/6 px-4 py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          <div className="ml-2 rounded-md bg-black/[0.04] px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
            conversion-plan.app
          </div>
        </div>
        <div className="space-y-4 p-4">
          <div className="rounded-xl border border-black/8 bg-black/[0.02] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Offer
            </p>
            <p className="mt-1.5 text-base font-semibold text-foreground">
              Get a 30-minute build plan with scope, timeline, and budget range.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-amber px-3 py-1.5 text-xs font-semibold text-white">
                <MousePointerClick size={12} />
                Get Build Plan
              </div>
              <span className="text-[11px] text-muted-foreground">No pitch deck</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Proof", value: "50+ launches" },
              { label: "Trust", value: "78% retained" },
              { label: "Speed", value: "8.2 week avg" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-black/8 bg-white p-2.5">
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-xs font-semibold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-black/8 bg-white p-3">
            <div className="flex items-end gap-1.5">
              {[28, 34, 31, 42, 39, 56, 52].map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-amber/35 to-amber/70"
                  style={{ height: `${v}px` }}
                />
              ))}
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Simulated conversion trend after messaging + UX optimization
            </p>
          </div>
        </div>
      </motion.div>

      {/* Floating trust card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute right-0 top-8 w-44 rounded-xl border border-black/8 bg-white p-3.5 shadow-xl shadow-black/10"
        style={{ rotate: "2deg" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
            <ShieldCheck size={14} className="text-emerald-600" />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Trust Layer
          </p>
        </div>
        <p className="mt-1.5 text-sm font-semibold text-foreground">Risk Reversal Built-In</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Milestone commitment, code ownership, and roadmap-first kickoff reduce decision anxiety.
        </p>
      </motion.div>

      {/* Floating fit card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute bottom-20 right-2 w-48 rounded-xl border border-black/8 bg-white p-3.5 shadow-xl shadow-black/10"
        style={{ rotate: "-2deg" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-muted">
            <Sparkles size={14} className="text-amber" />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Fit Signal
          </p>
        </div>
        <p className="mt-1.5 text-sm font-semibold text-foreground">Best for B2B Teams</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Existing demand, 6-10 week timeline, and measurable conversion or support outcomes.
        </p>
      </motion.div>

      {/* Floating card 3 — outcome tag */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full border border-amber/25 bg-amber/[0.08] px-3.5 py-2 shadow-md"
        style={{ rotate: "1deg" }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
        </span>
        <span className="text-xs font-semibold text-amber">Conversion-Focused</span>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/30" />
    </div>
  );
}

type HeroProps = {
  variant?: "default" | "ai" | "web" | "app";
  visualVariant?: "control" | "creative";
  showCroBlocks?: boolean;
};

export default function Hero({
  variant = "default",
  visualVariant = "creative",
  showCroBlocks = true,
}: HeroProps) {
  const content = heroCopy[variant];
  const isMobile = useIsMobile();
  const [proofIndex, setProofIndex] = useState(0);

  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => {
      setProofIndex((prev) => (prev + 1) % proofItems.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isMobile]);

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
                {content.badge}
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
              {content.title.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="bg-gradient-to-r from-amber via-orange-500 to-amber bg-clip-text text-transparent">
                {content.title.split(" ").slice(-2).join(" ")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:max-w-none"
            >
              {content.body}
            </motion.p>

            {showCroBlocks ? (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="mt-6 rounded-2xl border border-black/8 bg-white/70 p-4"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Is this for you?
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {[
                    "B2B teams with existing demand",
                    "Need launch in 6-10 weeks",
                    "Need measurable conversion or support impact",
                  ].map((fit) => (
                    <span
                      key={fit}
                      className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11px] font-medium text-foreground/85"
                    >
                      {fit}
                    </span>
                  ))}
                </div>
                <p className="mt-2.5 text-xs text-muted-foreground">
                  Not ideal if you need full-time staff augmentation only.
                </p>
              </motion.div>
            ) : null}

            {/* CTAs */}
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
                className="group inline-flex items-center gap-2 rounded-xl bg-amber px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-amber/25 transition hover:brightness-105 hover:shadow-lg hover:shadow-amber/30"
              >
                Get My 30-Min Build Plan
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#work");
                }}
                className="group inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/80 px-7 py-3.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-white hover:shadow-md"
              >
                Read 3-Min Case Studies
              </a>
            </motion.div>
            <p className="mt-3 text-xs text-muted-foreground">
              You&apos;ll leave with scope, timeline, and budget range. No pitch deck.
            </p>

            {isMobile ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.5 }}
                className="relative mt-10 min-h-[132px] lg:hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={proofItems[proofIndex].label}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                    className="group relative overflow-hidden rounded-2xl border border-black/8 bg-white/80 p-4 text-left shadow-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber/[0.08] via-transparent to-blue-100/40" />
                    <div className="relative z-10">
                      <span className="inline-block h-1.5 w-8 rounded-full bg-amber/70" />
                      <p className="mt-2 text-2xl font-bold tracking-tight text-amber">
                        {proofItems[proofIndex].value}
                      </p>
                      <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
                        {proofItems[proofIndex].label}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.5 }}
                className="mt-10 grid gap-3 lg:hidden"
              >
                {proofItems.map((item) => (
                  <div
                    key={item.label}
                    className="group relative overflow-hidden rounded-2xl border border-black/8 bg-white/80 p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber/[0.08] via-transparent to-blue-100/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative z-10">
                      <span className="inline-block h-1.5 w-8 rounded-full bg-amber/70" />
                      <p className="mt-2 text-2xl font-bold tracking-tight text-amber sm:text-3xl">
                        {item.value}
                      </p>
                      <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
            {showCroBlocks ? (
              <div className="mt-3 lg:hidden">
                <p className="text-xs text-muted-foreground">
                  Based on our last 18 client engagements (2024-2026).
                </p>
                <details className="mt-1 text-xs text-muted-foreground">
                  <summary className="cursor-pointer font-medium text-foreground/80">
                    How we calculate this
                  </summary>
                  <p className="mt-1.5 max-w-xl leading-relaxed">
                    Metrics are aggregated from project close-out reports and post-launch check-ins.
                    Time-based metrics use kickoff-to-live dates. Response metrics come from client communication logs.
                  </p>
                </details>
              </div>
            ) : null}
          </div>

          {/* Right: floating visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full min-w-0 flex-1 overflow-hidden lg:max-w-[520px]"
          >
            {visualVariant === "control" ? <HeroVisualControl /> : <HeroVisualCreative />}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.52 }}
          className="mt-10 hidden lg:grid lg:grid-cols-4 lg:gap-3"
        >
          {proofItems.map((item) => (
            <div
              key={`desktop-${item.label}`}
              className="group relative overflow-hidden rounded-2xl border border-black/8 bg-white/80 p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber/[0.08] via-transparent to-blue-100/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <span className="inline-block h-1.5 w-8 rounded-full bg-amber/70" />
                <p className="mt-2 text-2xl font-bold tracking-tight text-amber">{item.value}</p>
                <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
        {showCroBlocks ? (
          <div className="mt-3 hidden lg:block">
            <p className="text-xs text-muted-foreground">
              Based on our last 18 client engagements (2024-2026).
            </p>
            <details className="mt-1 text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium text-foreground/80">
                How we calculate this
              </summary>
              <p className="mt-1.5 max-w-xl leading-relaxed">
                Metrics are aggregated from project close-out reports and post-launch check-ins.
                Time-based metrics use kickoff-to-live dates. Response metrics come from client communication logs.
              </p>
            </details>
          </div>
        ) : null}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
