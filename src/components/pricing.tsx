"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SectionHeader, SectionShell } from "@/components/section-shell";
import { scrollToSection } from "@/lib/scroll-to-section";

const upgrades = [
  { label: "Extra Pages", price: "Scoped", description: "Additional service, location, about, or FAQ pages" },
  { label: "Booking Flow", price: "Scoped", description: "Calendar booking, routing, and confirmation copy" },
  { label: "Payments / Checkout", price: "Scoped", description: "Stripe, product setup, checkout, and receipt flow" },
  { label: "CRM or Email Integration", price: "Scoped", description: "Send leads into HubSpot, Mailchimp, Airtable, or similar" },
  { label: "AI Chat or Intake", price: "Scoped", description: "Guided visitor questions, lead qualification, or draft replies" },
  { label: "Ongoing Care", price: "Optional", description: "Hosting checks, small edits, updates, and light reporting" },
];

export default function Pricing() {
  return (
    <SectionShell id="pricing">
      <SectionHeader
        eyebrow="Simple Pricing"
        title="Custom websites, quoted after we understand the scope"
        description="A clear project price beats vague hourly work. You know the scope, timeline, and payment plan before anything begins."
        align="center"
      />

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
        {/* Main pricing card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border-2 border-mineral/30 bg-gradient-to-br from-mineral/[0.08] via-card to-card p-8 shadow-lg"
        >
          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-mineral/[0.15] blur-3xl" />

          <div className="relative z-10">
            <span className="inline-flex rounded-full bg-mineral px-3 py-1 text-xs font-bold text-white">
              Website Build
            </span>

            <div className="mt-5">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-foreground">Custom</span>
                <span className="text-lg font-semibold text-muted-foreground">quote</span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">Scoped</span>
                <span className="text-sm text-muted-foreground">to your website and goals</span>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-mineral/20 bg-mineral/[0.06] p-3">
              <p className="text-sm text-foreground">
                <span className="font-semibold">Simple payment plan:</span> 50% to reserve the build,
                50% before launch. Smaller projects can be paid in one invoice.
              </p>
            </div>

            <ul className="mt-6 space-y-2.5">
              {[
                "Custom design and responsive build",
                "Offer, services, proof, and CTA structure",
                "Contact form, click-to-call, and lead routing",
                "Fast loading, SSL, and SEO-ready metadata",
                "Basic analytics and launch checklist",
                "1-2 revision rounds depending on scope",
                "Optional hosting and care plan",
                "You own the finished site files",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-mineral" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-lg border border-plum-depth/20 bg-accent-soft p-3">
              <p className="text-sm font-semibold text-plum-depth">
                Pricing guardrail: if the scope changes, the price changes only after you approve the new estimate.
              </p>
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              className="group mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-mineral px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-mineral/25 transition hover:brightness-105 hover:shadow-lg hover:shadow-mineral/30"
            >
              Request a Quote
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              No commitment until the quote and scope are approved.
            </p>
          </div>
        </motion.div>

        {/* Optional upgrades */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-black/8 bg-card p-8"
        >
          <p className="text-sm font-bold text-foreground">Common add-ons</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Useful when the website needs to do more than explain the business and capture leads.
          </p>

          <div className="mt-5 space-y-3">
            {upgrades.map((u) => (
              <div
                key={u.label}
                className="flex items-start justify-between gap-3 rounded-xl border border-black/8 p-3.5"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{u.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{u.description}</p>
                </div>
                <span className="shrink-0 rounded-full border border-black/8 bg-black/[0.03] px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                  {u.price}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            Add-ons are discussed before they are included. Final pricing depends on content quality,
            integration complexity, and how much custom logic is required.
          </p>
        </motion.div>
      </div>
    </SectionShell>
  );
}
