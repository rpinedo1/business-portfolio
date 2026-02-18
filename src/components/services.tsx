"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, Brain, Code, Zap, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Applications",
    description:
      "Full-stack web apps built for scale. From SaaS platforms to complex dashboards, we deliver performant, maintainable solutions.",
    features: ["React / Next.js", "Scalable APIs", "Real-time Features"],
  },
  {
    icon: Smartphone,
    title: "Websites & Landing Pages",
    description:
      "Conversion-optimized websites that look stunning on every device. SEO-ready, fast-loading, and built to generate leads.",
    features: ["Responsive Design", "SEO Optimized", "CMS Integration"],
  },
  {
    icon: Brain,
    title: "AI Solutions",
    description:
      "Custom AI integrations that automate workflows, enhance user experience, and unlock insights from your data.",
    features: ["Custom AI Agents", "NLP & Chat", "Data Analytics"],
  },
  {
    icon: Code,
    title: "Custom Development",
    description:
      "Bespoke software solutions tailored to your unique business requirements. APIs, integrations, and everything in between.",
    features: ["API Development", "Third-party Integrations", "Automation"],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Speed kills — slow load times, that is. We audit and optimize your existing apps for blazing-fast performance.",
    features: ["Core Web Vitals", "Load Time Reduction", "Code Splitting"],
  },
  {
    icon: BarChart3,
    title: "Growth Strategy",
    description:
      "Data-driven technical strategy to ensure your digital products don't just work — they grow your bottom line.",
    features: ["Analytics Setup", "A/B Testing", "Conversion Tracking"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-amber">
            What We Do
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Solutions Built for{" "}
            <span className="bg-gradient-to-r from-amber to-orange-400 bg-clip-text text-transparent">
              Real Results
            </span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            We don&apos;t just write code — we craft digital experiences that
            solve problems and move the needle for your business.
          </p>
        </motion.div>

        {/* Service cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative rounded-2xl border border-white/5 bg-card p-8 transition-all duration-300 hover:border-amber/20 hover:bg-card/80"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-muted text-amber">
                  <service.icon size={24} />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
