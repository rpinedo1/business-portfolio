"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, Brain, Code, Zap, BarChart3, ArrowRight } from "lucide-react";

/* M4 Messaging hierarchy: pillars that map to real outcomes
   C1 Ogilvy: benefit-led, specific descriptions
   C4 Halbert: conversational, desire-driven
   D5 Visual hierarchy: icon → title → description → tags */
const services = [
  {
    icon: Globe,
    title: "Web Applications",
    description:
      "SaaS platforms, dashboards, and internal tools — built with React and Node.js to handle thousands of users without breaking a sweat.",
    features: ["React / Next.js", "Scalable APIs", "Real-time"],
  },
  {
    icon: Smartphone,
    title: "Websites & Landing Pages",
    description:
      "Fast-loading, SEO-optimized websites designed around one goal: turning your visitors into leads and your leads into customers.",
    features: ["Responsive", "SEO-Ready", "CMS Built-in"],
  },
  {
    icon: Brain,
    title: "AI-Powered Products",
    description:
      "Custom AI agents, chatbots, and automation tools that save your team hours every week and give your users a smarter experience.",
    features: ["Custom Agents", "NLP & Chat", "Data Pipelines"],
  },
  {
    icon: Code,
    title: "Custom Integrations",
    description:
      "APIs, third-party hookups, and backend logic that connects your tools and automates the workflows slowing your team down.",
    features: ["REST / GraphQL", "Webhooks", "Automation"],
  },
  {
    icon: Zap,
    title: "Performance Audits",
    description:
      "Slow sites lose customers. We audit your Core Web Vitals, cut load times, and fix the bottlenecks costing you conversions.",
    features: ["Core Web Vitals", "Speed Optimization", "Code Splitting"],
  },
  {
    icon: BarChart3,
    title: "Growth & Analytics",
    description:
      "Analytics setup, A/B tests, and conversion tracking so you know exactly what's working — and can double down on it.",
    features: ["Analytics", "A/B Testing", "Conversion Tracking"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Services() {
  return (
    <section id="services" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header — D5: clear hierarchy, scannable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-amber">
            What We Build
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Three Core Services.{" "}
            <span className="bg-gradient-to-r from-amber to-orange-400 bg-clip-text text-transparent">
              One Clear Goal.
            </span>
          </h2>
          {/* C9 StoryBrand: frame the customer's problem clearly */}
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            You need digital products that perform — not just look pretty.
            We handle the strategy, design, and engineering so you can focus
            on running your business.
          </p>
        </motion.div>

        {/* Service cards — D8 Gestalt: consistent grouping */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative rounded-2xl border border-white/[0.06] bg-surface p-8 transition-all duration-300 hover:border-amber/20 hover:bg-surface/80"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-muted text-amber">
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
                      className="rounded-md bg-white/[0.04] px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Inline CTA — D6 Fitts's: easy to find secondary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-medium text-amber transition-colors hover:text-orange-400"
          >
            Not sure which service you need? Let&apos;s figure it out together
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
