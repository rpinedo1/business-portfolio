"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { SectionHeader, SectionShell } from "@/components/section-shell";

const categories = ["All", "Web Apps", "Websites", "AI Solutions"] as const;

const projects = [
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
  },
  {
    title: "Greenleaf Commerce",
    category: "Websites",
    description:
      "High-converting e-commerce site for a sustainable brand. 3.2× increase in conversion rate within 90 days of launch.",
    tags: ["Shopify", "Next.js", "Tailwind"],
    image: "linear-gradient(135deg, #0a2e12 0%, #145228 40%, #0c341a 100%)",
    shimmer: "rgba(74, 200, 100, 0.3)",
    metrics: "3.2× Conversions",
    categoryColor: "text-green-600",
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
  },
  {
    title: "Artisan Studio",
    category: "Websites",
    description:
      "Portfolio and booking platform for a creative agency. Immersive animations and clear UX drove a 45% increase in qualified inquiries.",
    tags: ["Next.js", "Framer Motion", "Sanity"],
    image: "linear-gradient(135deg, #2a1a06 0%, #4e3008 40%, #2a1a06 100%)",
    shimmer: "rgba(220, 160, 40, 0.4)",
    metrics: "+45% Inquiries",
    categoryColor: "text-amber",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

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
            <div className="flex gap-1 rounded-xl border border-black/8 bg-white p-1 shadow-sm">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                    active === cat
                      ? "bg-amber text-white shadow-sm shadow-amber/25"
                      : "text-muted-foreground hover:bg-black/[0.03] hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_1px_3px_rgba(16,24,40,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
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
                      View Case Study
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
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
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
}
