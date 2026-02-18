"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";

const categories = ["All", "Web Apps", "Websites", "AI Solutions"] as const;

const projects = [
  {
    title: "FinTrack Dashboard",
    category: "Web Apps",
    description:
      "A real-time financial analytics dashboard with AI-powered insights, serving 10,000+ daily active users.",
    tags: ["Next.js", "Python", "PostgreSQL"],
    image: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    metrics: "10K+ DAU",
  },
  {
    title: "Luminary AI Chat",
    category: "AI Solutions",
    description:
      "Custom conversational AI platform for enterprise customer support, reducing response time by 80%.",
    tags: ["GPT-4", "LangChain", "React"],
    image: "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #1a0a2e 100%)",
    metrics: "80% Faster",
  },
  {
    title: "Greenleaf E-Commerce",
    category: "Websites",
    description:
      "High-converting e-commerce platform for a sustainable brand, with 3.2x increase in conversions after launch.",
    tags: ["Shopify", "Next.js", "Tailwind"],
    image: "linear-gradient(135deg, #0a2e1a 0%, #1b4e2d 50%, #0a2e1a 100%)",
    metrics: "3.2x Conv.",
  },
  {
    title: "MedSync Portal",
    category: "Web Apps",
    description:
      "HIPAA-compliant patient portal connecting healthcare providers with patients through secure messaging and scheduling.",
    tags: ["React", "Node.js", "AWS"],
    image: "linear-gradient(135deg, #2e1a1a 0%, #4e2d1b 50%, #2e1a0a 100%)",
    metrics: "HIPAA Ready",
  },
  {
    title: "DataPulse Analytics",
    category: "AI Solutions",
    description:
      "ML-powered analytics platform that processes 1M+ events daily and surfaces actionable business intelligence.",
    tags: ["TensorFlow", "FastAPI", "React"],
    image: "linear-gradient(135deg, #0a1a2e 0%, #1b2d4e 50%, #0a1a2e 100%)",
    metrics: "1M+ Events/Day",
  },
  {
    title: "Artisan Studio",
    category: "Websites",
    description:
      "Portfolio and booking site for a creative agency, featuring immersive animations and a 45% increase in inquiries.",
    tags: ["Next.js", "Framer Motion", "Sanity"],
    image: "linear-gradient(135deg, #2e2e1a 0%, #4e4e1b 50%, #2e2e0a 100%)",
    metrics: "+45% Leads",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="relative py-24 lg:py-32">
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
              Our Work
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Projects That{" "}
              <span className="bg-gradient-to-r from-amber to-orange-400 bg-clip-text text-transparent">
                Speak for Themselves
              </span>
            </h2>
          </div>
          {/* Filter tabs */}
          <div className="flex gap-1 rounded-lg border border-white/5 bg-card p-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-md px-4 py-2 text-xs font-medium transition-all ${
                  active === cat
                    ? "bg-amber text-amber-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-card transition-all duration-300 hover:border-amber/20"
              >
                {/* Project preview */}
                <div
                  className="relative h-48 overflow-hidden"
                  style={{ background: project.image }}
                >
                  {/* Fake browser chrome */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  </div>
                  <div className="absolute top-3 right-3 rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-mono text-white/50">
                    {project.metrics}
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex items-center gap-2 rounded-lg bg-amber px-4 py-2 text-xs font-medium text-amber-foreground">
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
                        className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
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
