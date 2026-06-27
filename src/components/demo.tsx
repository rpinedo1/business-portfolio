"use client";

import { motion } from "framer-motion";
import { Phone, Star } from "lucide-react";
import { SectionHeader, SectionShell } from "@/components/section-shell";

const demos = [
  {
    business: "Green Valley Landscaping",
    tagline: "Get Your Free Lawn Estimate Today",
    industry: "Landscaping",
    location: "Austin, TX",
    cta: "Call for a Free Quote",
    rating: "4.9",
    reviews: "127",
    color: "from-mineral/10 to-mineral/5",
    accent: "text-mineral",
    ctaBg: "bg-mineral",
  },
  {
    business: "Radiance MedSpa",
    tagline: "Book Your Consultation — New Patient Special",
    industry: "MedSpa / Aesthetics",
    location: "Miami, FL",
    cta: "Book a Consultation",
    rating: "4.8",
    reviews: "214",
    color: "from-plum-depth/10 to-plum-depth/5",
    accent: "text-plum-depth",
    ctaBg: "bg-plum-depth",
  },
  {
    business: "Summit Roofing Co.",
    tagline: "Free Roof Inspection — 24h Response",
    industry: "Roofing",
    location: "Denver, CO",
    cta: "Schedule Free Inspection",
    rating: "4.9",
    reviews: "89",
    color: "from-accent-soft to-mineral/5",
    accent: "text-mineral",
    ctaBg: "bg-foreground",
  },
];

export default function Demo() {
  return (
    <SectionShell id="examples">
      <SectionHeader
        eyebrow="Example Pages"
        title="What your landing page could look like"
        description="These are representative examples — not real clients. Each is one page, one goal, one CTA."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo, i) => (
          <motion.div
            key={demo.business}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`overflow-hidden rounded-2xl border border-black/8 bg-gradient-to-br ${demo.color} shadow-sm`}
          >
            {/* Mock browser bar */}
            <div className="flex items-center gap-1.5 border-b border-black/6 bg-card/80 px-4 py-2.5">
              <div className="h-2 w-2 rounded-full bg-plum-depth/45" />
              <div className="h-2 w-2 rounded-full bg-mineral/55" />
              <div className="h-2 w-2 rounded-full bg-foreground/35" />
              <div className="ml-2 flex-1 rounded bg-black/[0.04] px-2 py-0.5 font-mono text-[9px] text-muted-foreground">
                {demo.business.toLowerCase().replace(/\s+/g, "")}.com
              </div>
            </div>

            {/* Mock page content */}
            <div className="p-5">
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <span className={`font-semibold ${demo.accent}`}>{demo.industry}</span>
                <span>·</span>
                <span>{demo.location}</span>
              </div>
              <h3 className="mt-2 text-base font-bold text-foreground leading-snug">
                {demo.tagline}
              </h3>

              <div className="mt-3 flex items-center gap-1">
                <Star size={11} className="fill-mineral text-mineral" />
                <span className="text-xs font-semibold text-foreground">{demo.rating}</span>
                <span className="text-xs text-muted-foreground">({demo.reviews} reviews)</span>
              </div>

              <div className={`mt-4 flex items-center gap-1.5 rounded-lg ${demo.ctaBg} px-3 py-2 text-[11px] font-semibold text-white`}>
                <Phone size={11} />
                {demo.cta}
              </div>

              {/* Mock content blocks */}
              <div className="mt-4 space-y-1.5">
                <div className="h-2 w-full rounded-full bg-black/[0.05]" />
                <div className="h-2 w-4/5 rounded-full bg-black/[0.04]" />
                <div className="h-2 w-3/5 rounded-full bg-black/[0.03]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Demos use simulated data. Visuals are representative examples only — not real businesses or
        actual client pages.
      </p>
    </SectionShell>
  );
}
