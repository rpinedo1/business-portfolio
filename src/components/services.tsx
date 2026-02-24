"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, Brain, Code, Zap, BarChart3, ArrowRight } from "lucide-react";
import { SectionHeader, SectionShell } from "@/components/section-shell";
import { scrollToSection } from "@/lib/scroll-to-section";
import { useState } from "react";

const services = [
  {
    icon: Brain,
    title: "Save Time With AI",
    description:
      "We automate repetitive tasks like lead follow-up, support replies, and reporting so your team can focus on growth.",
    features: ["Lead Follow-Up", "Support Automation", "Auto Reporting"],
    color: "from-amber/15 to-amber/5",
    iconBg: "bg-amber-muted",
    iconColor: "text-amber",
    accent: "group-hover:border-amber/30",
  },
  {
    icon: Globe,
    title: "Launch Revenue Features",
    description:
      "We build custom web apps and customer flows that help you close deals faster and reduce manual admin work.",
    features: ["Sales Flows", "Custom Dashboards", "Automation-Ready"],
    color: "from-blue-500/15 to-blue-400/5",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    accent: "group-hover:border-blue-200",
  },
  {
    icon: Smartphone,
    title: "Get More Leads",
    description:
      "We redesign key pages so visitors quickly understand what you offer and book calls instead of bouncing.",
    features: ["Clear Messaging", "Mobile-First", "High-Intent CTAs"],
    color: "from-violet-500/15 to-violet-400/5",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    accent: "group-hover:border-violet-200",
  },
  {
    icon: Code,
    title: "Custom Integrations",
    description:
      "We connect your CRM, website, and internal tools so data moves automatically and your team stops copying things by hand.",
    features: ["CRM Sync", "Tool Connections", "Workflow Automation"],
    color: "from-cyan-500/15 to-cyan-400/5",
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    accent: "group-hover:border-cyan-200",
  },
  {
    icon: Zap,
    title: "Fix Slow Pages",
    description:
      "Slow websites leak revenue. We speed up your highest-traffic pages so more people stay, click, and convert.",
    features: ["Speed Audit", "Faster Load Times", "Conversion Fixes"],
    color: "from-green-500/15 to-green-400/5",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    accent: "group-hover:border-green-200",
  },
  {
    icon: BarChart3,
    title: "Track What Makes Money",
    description:
      "We set up clear dashboards and tests so you know which pages, campaigns, and automations are driving real revenue.",
    features: ["Revenue Tracking", "A/B Tests", "Simple Dashboards"],
    color: "from-rose-500/15 to-rose-400/5",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    accent: "group-hover:border-rose-200",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  const [expanded, setExpanded] = useState(false);
  const visibleServices = expanded ? services : services.slice(0, 3);

  return (
    <SectionShell id="services">
      <SectionHeader
        eyebrow="What We Build"
        title="Simple services focused on leads, sales, and time savings"
        description="Pick the outcome you want most. We design and build the fastest path to get there."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visibleServices.map((service) => (
          <motion.article
            key={service.title}
            variants={itemVariants}
            className={`group relative rounded-2xl border border-black/8 bg-white p-7 shadow-[0_1px_3px_rgba(16,24,40,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${service.accent}`}
          >
            {/* Color gradient on hover */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
            />

            <div className="relative z-10">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${service.iconBg} ${service.iconColor}`}>
                <service.icon size={22} />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-md border border-black/6 bg-black/[0.02] px-2.5 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {services.length > 3 ? (
        <div className="mt-6">
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="rounded-xl border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-amber/30 hover:text-amber"
            >
              {expanded ? "Show fewer services" : "Show all services"}
            </button>
          </div>
          {expanded ? (
            <div className="mx-auto mt-4 max-w-xl rounded-2xl border border-black/8 bg-white/85 p-4 text-center shadow-sm">
              <p className="text-sm text-muted-foreground">
                Not sure which service mix is right? Start with your goal and we&apos;ll recommend the best path.
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#contact");
                }}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-amber px-4 py-2 text-xs font-semibold text-white transition hover:brightness-105"
              >
                Get My Recommendation
                <ArrowRight size={13} />
              </a>
            </div>
          ) : null}
        </div>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12 text-center"
      >
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#contact");
          }}
          className="group inline-flex items-center gap-2 rounded-xl bg-amber px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-amber/25 transition hover:brightness-105 hover:shadow-lg hover:shadow-amber/30"
        >
          Get My Free Growth Plan
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </a>
      </motion.div>
    </SectionShell>
  );
}
