"use client";

import { motion } from "framer-motion";
import { Globe, MessageSquare, Smartphone, ArrowRight } from "lucide-react";
import { SectionHeader, SectionShell } from "@/components/section-shell";
import { scrollToSection } from "@/lib/scroll-to-section";
import Tilt from "@/components/tilt";

const tiers = [
  {
    icon: Smartphone,
    title: "Landing Page",
    description:
      "A focused one-page site for a service, campaign, event, or new offer that needs to turn visitors into inquiries.",
    features: ["Offer-led hero", "Services or package section", "Contact CTA + click-to-call", "Mobile responsive", "Basic analytics"],
    color: "from-mineral/15 to-mineral/5",
    iconBg: "bg-mineral-muted",
    iconColor: "text-mineral",
    accent: "group-hover:border-mineral/25",
    badge: "Custom quote",
  },
  {
    icon: MessageSquare,
    title: "Business Website",
    description:
      "A multi-section or multi-page website that gives prospects the proof, details, and confidence to reach out.",
    features: ["Home + core pages", "Trust and testimonial flow", "Contact or booking path", "SEO-ready structure"],
    color: "from-plum-depth/14 to-mineral/5",
    iconBg: "bg-mineral-muted",
    iconColor: "text-mineral",
    accent: "group-hover:border-mineral/30",
    badge: "Most common",
  },
  {
    icon: Globe,
    title: "Advanced Builds",
    description:
      "For businesses that need booking, payments, dashboards, automations, or a more interactive web experience.",
    features: ["Online booking", "E-commerce / payments", "CRM integration", "Custom web app workflows"],
    color: "from-plum-depth/14 to-accent-soft",
    iconBg: "bg-accent-soft",
    iconColor: "text-plum-depth",
    accent: "group-hover:border-plum-depth/25",
    badge: "Custom quote",
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
        eyebrow="What You Get"
        title="Websites built with clear scope and serious polish"
        description="I start with the smallest site that can do the job well, then add complexity only where it earns its place. You always know exactly what you're paying for."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {tiers.map((tier) => (
          <motion.article key={tier.title} variants={itemVariants}>
            <Tilt
              max={5}
              className={`group relative h-full rounded-2xl border border-black/8 bg-card p-7 shadow-[0_1px_3px_rgba(16,24,40,0.06)] transition-shadow duration-300 hover:shadow-luxe ${tier.accent}`}
            >
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tier.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${tier.iconBg} ${tier.iconColor}`}
                >
                  <tier.icon size={22} />
                </div>
                <span className="rounded-full border border-black/8 bg-black/[0.03] px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                  {tier.badge}
                </span>
              </div>
              <h3 className="font-display mt-5 text-xl">{tier.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {tier.description}
              </p>
              <ul className="mt-5 space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-mineral/60" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            </Tilt>
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
          className="group inline-flex items-center gap-2 rounded-xl bg-mineral px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-mineral/25 transition hover:brightness-105 hover:shadow-lg hover:shadow-mineral/30"
        >
          Request a Quote
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </a>
        <p className="mt-3 text-xs text-muted-foreground">Final pricing depends on pages, integrations, content needs, and timeline.</p>
      </motion.div>
    </SectionShell>
  );
}
