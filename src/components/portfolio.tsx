"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";

const categories = ["All", "Web Apps", "Websites", "AI Solutions"] as const;

/* C2 Hopkins: specific proof and results
   M5 Social proof: case-study structure with credibility assets
   M9 Content: pain → solution → proof */
const projects = [
  {
    title: "FinTrack Dashboard",
    category: "Web Apps",
    description:
      "A real-time financial analytics dashboard with AI-powered insights. Grew from 0 to 10,000+ daily active users in 6 months.",
    tags: ["Next.js", "Python", "PostgreSQL"],
    image: "linear-gradient(135deg, #161625 0%, #1a2035 50%, #141428 100%)",
    metrics: "10K+ DAU",
  },
  {
    title: "Luminary AI Chat",
    category: "AI Solutions",
    description:
      "Enterprise customer support AI that handles 80% of tickets automatically — reducing average response time from 4 hours to 45 seconds.",
    tags: ["GPT-4", "LangChain", "React"],
    image: "linear-gradient(135deg, #1a1428 0%, #251840 50%, #1a1428 100%)",
    metrics: "80% Automated",
  },
  {
    title: "Greenleaf Commerce",
    category: "Websites",
    description:
      "High-converting e-commerce site for a sustainable brand. 3.2x increase in conversion rate within 90 days of launch.",
    tags: ["Shopify", "Next.js", "Tailwind"],
    image: "linear-gradient(135deg, #0f2018 0%, #1a3528 50%, #0f2018 100%)",
    metrics: "3.2x Conversions",
  },
  {
    title: "MedSync Portal",
    category: "Web Apps",
    description:
      "HIPAA-compliant patient portal connecting 200+ providers with patients through secure messaging, scheduling, and records access.",
    tags: ["React", "Node.js", "AWS"],
    image: "linear-gradient(135deg, #201814 0%, #352820 50%, #201a14 100%)",
    metrics: "200+ Providers",
  },
  {
    title: "DataPulse Analytics",
    category: "AI Solutions",
    description:
      "ML-powered analytics engine processing 1M+ events per day. Surfaces actionable insights that previously took analysts a full week to find.",
    tags: ["TensorFlow", "FastAPI", "React"],
    image: "linear-gradient(135deg, #101828 0%, #182840 50%, #101828 100%)",
    metrics: "1M+ Events/Day",
  },
  {
    title: "Artisan Studio",
    category: "Websites",
    description:
      "Portfolio and booking platform for a creative agency. Immersive animations and clear UX drove a 45% increase in qualified inquiries.",
    tags: ["Next.js", "Framer Motion", "Sanity"],
    image: "linear-gradient(135deg, #201e14 0%, #353218 50%, #201e0f 100%)",
    metrics: "+45% Inquiries",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <span className="text-sm font-medium uppercase tracking-widest text-amber">
              Selected Work
            </span>
            {/* C1 Ogilvy: specific, clear headline */}
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Real Projects.{" "}
              <span className="bg-gradient-to-r from-amber to-orange-400 bg-clip-text text-transparent">
                Measurable Results.
              </span>
            </h2>
          </div>
          {/* Filter tabs — D7 Hick's: limited, clear choices */}
          <div className="flex gap-1 rounded-xl border border-white/[0.06] bg-surface p-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                  active === cat
                    ? "bg-amber text-amber-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-surface transition-all duration-300 hover:border-amber/20"
              >
                {/* Project preview */}
                <div
                  className="relative h-48 overflow-hidden"
                  style={{ background: project.image }}
                >
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  </div>
                  <div className="absolute top-3 right-3 rounded-md bg-white/10 px-2.5 py-1 text-[10px] font-mono text-white/60">
                    {project.metrics}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex items-center gap-2 rounded-lg bg-amber px-4 py-2 text-xs font-semibold text-amber-foreground shadow-lg shadow-amber/20">
                      <ExternalLink size={14} />
                      View Case Study
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-amber">
                      {project.category}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-amber"
                    />
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
