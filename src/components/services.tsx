"use client";

import { motion } from "framer-motion";
import { Globe, MessageSquare, Smartphone, ArrowRight } from "lucide-react";
import { SectionHeader, SectionShell } from "@/components/section-shell";
import { scrollToSection } from "@/lib/scroll-to-section";

const services = [
  {
    icon: Smartphone,
    title: "$0 Setup Landing Page",
    description:
      "A complete, professional landing page built for your business — at zero upfront cost. Hosted and live within 3–5 days.",
    features: ["Hero Section", "About / What You Do", "Contact CTA", "Mobile Responsive", "Hosted & Live"],
    color: "from-emerald-500/15 to-emerald-400/5",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    accent: "group-hover:border-emerald-200",
    badge: "Start Here — $0",
  },
  {
    icon: MessageSquare,
    title: "AI Features",
    description:
      "Upgrade your page with AI tools that capture leads and follow up automatically — even while you sleep.",
    features: ["24/7 Chatbot", "Lead Follow-Up", "Auto Responses"],
    color: "from-amber/15 to-amber/5",
    iconBg: "bg-amber-muted",
    iconColor: "text-amber",
    accent: "group-hover:border-amber/30",
    badge: "Add-On",
  },
  {
    icon: Globe,
    title: "Custom Features",
    description:
      "When you're ready to grow, we can add booking systems, extra pages, e-commerce, and custom web apps.",
    features: ["Online Booking", "Extra Pages", "E-Commerce", "Web Apps"],
    color: "from-blue-500/15 to-blue-400/5",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    accent: "group-hover:border-blue-200",
    badge: "When You're Ready",
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
        eyebrow="How It Works"
        title="Your page at $0 setup — grow when you're ready"
        description="Start with a free landing page. Add AI features and custom functionality when your business is ready to scale."
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
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${service.iconBg} ${service.iconColor}`}
                >
                  <service.icon size={22} />
                </div>
                <span className="rounded-full border border-black/8 bg-black/[0.03] px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                  {service.badge}
                </span>
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
          Get My Free Page
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </a>
      </motion.div>
    </SectionShell>
  );
}
