"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ExternalLink, ArrowRight, X } from "lucide-react";
import { SectionHeader, SectionShell } from "@/components/section-shell";

const categories = ["All", "Web Apps", "Landing Pages", "AI Solutions"] as const;

const projects = [
  {
    title: "Law Firm Website Builder",
    category: "Landing Pages",
    description:
      "Conversion-focused legal services website template with trust-first messaging, strong call routing, and structured lead capture.",
    tags: ["Next.js", "Tailwind", "Vercel"],
    image: "linear-gradient(135deg, #11233f 0%, #24416f 45%, #3b6299 100%)",
    shimmer: "rgba(120, 165, 255, 0.35)",
    metrics: "Service Funnel UX",
    categoryColor: "text-blue-500",
    timeline: "Sample artifact",
    challenge: "Create a legal-services layout that builds trust fast and drives qualified consult requests.",
    approach: "Structured hero proof, clear service pathways, and CTA placement designed for high-intent local traffic.",
    outcomes: [
      "Clear trust-first structure above the fold",
      "Stronger consultation CTA visibility across sections",
      "Improved service-page scannability for legal buyers",
    ],
    liveUrl: "https://law-firm-website-builder.vercel.app/",
  },
  {
    title: "Modern Engaging Web App",
    category: "Web Apps",
    description:
      "Interactive web app experience demonstrating modern UX patterns for activation and engagement across key product flows.",
    tags: ["React", "Next.js", "Framer Motion"],
    image: "linear-gradient(135deg, #2a1d0f 0%, #5a3d1e 45%, #8b5d2a 100%)",
    shimmer: "rgba(232, 175, 95, 0.35)",
    metrics: "Product UX Flow",
    categoryColor: "text-amber",
    timeline: "Sample artifact",
    challenge: "Show modern interaction patterns without sacrificing speed or conversion clarity.",
    approach: "Combined progressive disclosure, intentional motion, and clear action hierarchy to keep users moving.",
    outcomes: [
      "Higher perceived product quality through polished interaction design",
      "Improved focus on primary user actions",
      "Reusable engagement patterns for future product builds",
    ],
    liveUrl: "https://modern-engaging-web-app.vercel.app/",
  },
  {
    title: "FinTrack Dashboard",
    category: "Web Apps",
    description:
      "A real-time financial analytics dashboard with AI-powered insights. Grew from 0 to 10,000+ daily active users in 6 months.",
    tags: ["Next.js", "Python", "PostgreSQL"],
    image: "linear-gradient(135deg, #0d1b3e 0%, #1a2f6b 40%, #0f2355 100%)",
    shimmer: "rgba(99, 140, 255, 0.3)",
    metrics: "10K+ DAU",
    categoryColor: "text-blue-500",
    timeline: "6 months",
    challenge: "The finance team had fragmented reports and no single source of truth for daily decisions.",
    approach: "We built a real-time dashboard with role-based views, AI alerts, and a lightweight onboarding flow.",
    outcomes: [
      "Reached 10k+ daily active users in 6 months",
      "Reduced manual reporting time by 62%",
      "Increased weekly executive adoption to 87%",
    ],
  },
  {
    title: "Luminary AI Chat",
    category: "AI Solutions",
    description:
      "Enterprise customer support AI that handles 80% of tickets automatically — reducing average response time from 4 hours to 45 seconds.",
    tags: ["GPT-4", "LangChain", "React"],
    image: "linear-gradient(135deg, #1f0a3e 0%, #3b1278 40%, #1f0a40 100%)",
    shimmer: "rgba(170, 100, 255, 0.35)",
    metrics: "80% Automated",
    categoryColor: "text-violet-500",
    timeline: "8 weeks",
    challenge: "Support queues were growing and first-response time was hurting retention.",
    approach: "We designed an AI triage and answer assistant connected to product docs and ticket history.",
    outcomes: [
      "80% of tickets handled automatically",
      "First response dropped from 4 hours to 45 seconds",
      "Support team regained 22 hours per week",
    ],
  },
  {
    title: "Greenleaf Commerce",
    category: "Landing Pages",
    description:
      "High-converting e-commerce site for a sustainable brand. 3.2× increase in conversion rate within 90 days of launch.",
    tags: ["Shopify", "Next.js", "Tailwind"],
    image: "linear-gradient(135deg, #0a2e12 0%, #145228 40%, #0c341a 100%)",
    shimmer: "rgba(74, 200, 100, 0.3)",
    metrics: "3.2× Conversions",
    categoryColor: "text-green-600",
    timeline: "10 weeks",
    challenge: "Paid traffic was expensive and the existing storefront under-converted mobile visitors.",
    approach: "We reworked messaging hierarchy, checkout friction, and product-page speed.",
    outcomes: [
      "3.2x conversion lift in 90 days",
      "Mobile checkout completion improved by 41%",
      "CPA dropped by 28%",
    ],
  },
  {
    title: "MedSync Portal",
    category: "Web Apps",
    description:
      "HIPAA-compliant patient portal connecting 200+ providers with patients through secure messaging, scheduling, and records access.",
    tags: ["React", "Node.js", "AWS"],
    image: "linear-gradient(135deg, #2e1a08 0%, #5a3510 40%, #2e1a08 100%)",
    shimmer: "rgba(242, 148, 58, 0.4)",
    metrics: "200+ Providers",
    categoryColor: "text-amber",
    timeline: "12 weeks",
    challenge: "Patient communication and scheduling lived in disconnected systems across provider groups.",
    approach: "We shipped a secure portal with scheduling, messaging, and records access under HIPAA controls.",
    outcomes: [
      "200+ providers onboarded",
      "Patient message response times improved by 52%",
      "Support tickets related to scheduling dropped by 37%",
    ],
  },
  {
    title: "DataPulse Analytics",
    category: "AI Solutions",
    description:
      "ML-powered analytics engine processing 1M+ events per day. Surfaces actionable insights that previously took analysts a full week to find.",
    tags: ["TensorFlow", "FastAPI", "React"],
    image: "linear-gradient(135deg, #082030 0%, #0f3a58 40%, #082030 100%)",
    shimmer: "rgba(56, 189, 248, 0.35)",
    metrics: "1M+ Events/Day",
    categoryColor: "text-cyan-600",
    timeline: "9 weeks",
    challenge: "Analysts were spending full weeks surfacing insights for routine growth decisions.",
    approach: "We implemented an ML-driven event processing pipeline with automated anomaly detection.",
    outcomes: [
      "Processing over 1M events daily",
      "Insight turnaround reduced from days to hours",
      "Experiment velocity increased 2.1x",
    ],
  },
  {
    title: "Artisan Studio",
    category: "Landing Pages",
    description:
      "Portfolio and booking platform for a creative agency. Immersive animations and clear UX drove a 45% increase in qualified inquiries.",
    tags: ["Next.js", "Framer Motion", "Sanity"],
    image: "linear-gradient(135deg, #2a1a06 0%, #4e3008 40%, #2a1a06 100%)",
    shimmer: "rgba(220, 160, 40, 0.4)",
    metrics: "+45% Inquiries",
    categoryColor: "text-amber",
    timeline: "7 weeks",
    challenge: "The agency had strong portfolio work but inconsistent inbound lead quality.",
    approach: "We rebuilt the site around service positioning, proof sequencing, and booking UX clarity.",
    outcomes: [
      "Qualified inquiries increased by 45%",
      "Average time-on-site increased by 39%",
      "Booked discovery calls rose by 31%",
    ],
  },
];

export default function Portfolio() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [expanded, setExpanded] = useState(false);
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);
  const visibleProjects = expanded ? filtered : filtered.slice(0, 3);
  const canExpand = filtered.length > 3;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    setExpanded(false);
  }, [active]);

  return (
    <SectionShell id="work" className="relative overflow-hidden">
      {/* Subtle background tint */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent" />

      <div className="relative z-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Selected Work"
            title="Case studies with clear outcomes"
            className="max-w-2xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-auto"
          >
            <div className="-mx-1 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="inline-flex min-w-max gap-1 rounded-xl border border-black/8 bg-white p-1 shadow-sm">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 sm:px-4 ${
                    active === cat
                      ? "bg-amber text-white shadow-sm shadow-amber/25"
                      : "text-muted-foreground hover:bg-black/[0.03] hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-3 rounded-2xl border border-black/8 bg-white/80 p-4 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/70 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
              Best Fit
            </p>
            <p className="mt-1.5 text-sm text-foreground">
              Small businesses with active traffic that need more qualified leads, faster sales flow, or clear AI time savings.
            </p>
          </div>
          <div className="rounded-xl border border-amber/25 bg-amber/[0.08] p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber">
              Not Ideal
            </p>
            <p className="mt-1.5 text-sm text-foreground">
              Teams looking only for low-cost dev hours with no growth goal, owner involvement, or KPI accountability.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.article
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_1px_3px_rgba(16,24,40,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
                onClick={() => setSelectedProject(project)}
              >
                {/* Preview area */}
                <div
                  className="relative h-48 overflow-hidden"
                  style={{ background: project.image }}
                >
                  {/* Color shimmer at bottom */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-24"
                    style={{
                      background: `radial-gradient(ellipse 80% 80% at 50% 100%, ${project.shimmer}, transparent)`,
                    }}
                  />
                  {/* Window dots */}
                  <div className="absolute left-3.5 top-3.5 flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-white/20" />
                    <div className="h-2 w-2 rounded-full bg-white/20" />
                    <div className="h-2 w-2 rounded-full bg-white/20" />
                  </div>
                  {/* Metrics badge */}
                  <div className="absolute right-3 top-3 rounded-md bg-black/40 px-2.5 py-1 font-mono text-[10px] font-semibold text-white/90 backdrop-blur-sm">
                    {project.metrics}
                  </div>
                  {/* Hover CTA */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/15 px-4 py-2 text-xs font-semibold text-white">
                      <ExternalLink size={13} />
                      Read 3-min case study
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <p className="text-sm font-semibold text-amber">
                    Result: {project.metrics}
                    {project.timeline !== "Sample artifact" ? ` in ${project.timeline}` : ""}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${project.categoryColor}`}>
                      {project.category}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-muted-foreground/40 transition-all group-hover:translate-x-1 group-hover:text-amber"
                    />
                  </div>
                  <h3 className="mt-2 text-lg font-bold">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-black/6 bg-black/[0.02] px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-amber transition hover:text-orange-600"
                  >
                    Read 3-min case study
                    <ArrowRight size={13} />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {canExpand ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="rounded-xl border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-amber/30 hover:text-amber"
            >
              {expanded ? "Show fewer case studies" : `Show all case studies (${filtered.length})`}
            </button>
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 bg-black/35 backdrop-blur-sm"
              aria-label="Close case study overlay"
            />
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-x-0 bottom-0 z-[60] h-[88vh] overflow-y-auto rounded-t-2xl border border-black/10 bg-white p-5 shadow-2xl shadow-black/20 sm:right-0 sm:top-0 sm:h-full sm:max-w-xl sm:rounded-none sm:border-l sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`text-xs font-semibold ${selectedProject.categoryColor}`}>
                    {selectedProject.category}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                    {selectedProject.title}
                  </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Timeline: {selectedProject.timeline}
                    </p>
                    {selectedProject.liveUrl ? (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-amber transition hover:text-orange-600"
                      >
                        Open live project
                        <ExternalLink size={12} />
                      </a>
                    ) : null}
                  </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-lg border border-black/10 bg-white p-2 text-muted-foreground transition hover:text-foreground"
                  aria-label="Close case study panel"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-6 space-y-5">
                <section>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Problem
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {selectedProject.challenge}
                  </p>
                </section>
                <section>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    What We Changed
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {selectedProject.approach}
                  </p>
                </section>
                <section>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Outcomes
                  </p>
                  <ul className="mt-2 space-y-2 text-sm text-foreground/85">
                    {selectedProject.outcomes.map((outcome) => (
                      <li key={outcome} className="rounded-lg border border-black/8 bg-black/[0.02] px-3 py-2">
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Stack
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-black/8 bg-white px-2.5 py-1 text-xs font-medium text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </SectionShell>
  );
}
