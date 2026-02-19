"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, Brain, Code, Zap, BarChart3, ArrowRight } from "lucide-react";
import { SectionHeader, SectionShell } from "@/components/section-shell";
import { scrollToSection } from "@/lib/scroll-to-section";

const services = [
  {
    icon: Globe,
    title: "Web Applications",
    description:
      "SaaS platforms, dashboards, and internal tools — built with React and Node.js to handle thousands of users without breaking a sweat.",
    features: ["React / Next.js", "Scalable APIs", "Real-time"],
    color: "from-blue-500/15 to-blue-400/5",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    accent: "group-hover:border-blue-200",
  },
  {
    icon: Smartphone,
    title: "Websites & Landing Pages",
    description:
      "Fast-loading, SEO-optimized websites designed around one goal: turning your visitors into leads and your leads into customers.",
    features: ["Responsive", "SEO-Ready", "CMS Built-in"],
    color: "from-violet-500/15 to-violet-400/5",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    accent: "group-hover:border-violet-200",
  },
  {
    icon: Brain,
    title: "AI-Powered Products",
    description:
      "Custom AI agents, chatbots, and automation tools that save your team hours every week and give your users a smarter experience.",
    features: ["Custom Agents", "NLP & Chat", "Data Pipelines"],
    color: "from-amber/15 to-amber/5",
    iconBg: "bg-amber-muted",
    iconColor: "text-amber",
    accent: "group-hover:border-amber/30",
  },
  {
    icon: Code,
    title: "Custom Integrations",
    description:
      "APIs, third-party hookups, and backend logic that connects your tools and automates the workflows slowing your team down.",
    features: ["REST / GraphQL", "Webhooks", "Automation"],
    color: "from-cyan-500/15 to-cyan-400/5",
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    accent: "group-hover:border-cyan-200",
  },
  {
    icon: Zap,
    title: "Performance Audits",
    description:
      "Slow sites lose customers. We audit your Core Web Vitals, cut load times, and fix the bottlenecks costing you conversions.",
    features: ["Core Web Vitals", "Speed Optimization", "Code Splitting"],
    color: "from-green-500/15 to-green-400/5",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    accent: "group-hover:border-green-200",
  },
  {
    icon: BarChart3,
    title: "Growth & Analytics",
    description:
      "Analytics setup, A/B tests, and conversion tracking so you know exactly what's working — and can double down on it.",
    features: ["Analytics", "A/B Testing", "Conversion Tracking"],
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
  return (
    <SectionShell id="services">
      <SectionHeader
        eyebrow="What We Build"
        title="Services designed for speed, clarity, and growth"
        description="We combine product strategy, clean design, and reliable engineering to deliver outcomes your team can measure."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((service) => (
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
          Need help choosing the right service?
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </a>
      </motion.div>
    </SectionShell>
  );
}
