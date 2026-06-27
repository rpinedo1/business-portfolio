"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { SectionHeader, SectionShell } from "@/components/section-shell";

const included = [
  "Responsive design and build",
  "Clear hero, offer, services, and CTA flow",
  "Contact form, click-to-call, and lead routing",
  "Mobile optimization and fast-loading structure",
  "SEO-ready title, description, and semantic HTML",
  "Basic analytics setup",
  "Launch checklist and deployment support",
  "Included revision rounds based on project size",
  "Optional hosting, care, and edit plan",
  "Ownership of the finished site files",
];

const notIncluded = [
  "Unlimited revisions",
  "Custom photography or video production",
  "Logo or full brand identity design",
  "Ongoing SEO writing or paid ad management",
  "CRM setup or third-party integrations unless scoped",
  "HIPAA-compliant forms (you're responsible for compliance; we follow best practices)",
  "Large custom app features without a separate estimate",
];

export default function WhatsIncluded() {
  return (
    <SectionShell id="included">
      <SectionHeader
        eyebrow="What's Included"
        title="Clear scope, fewer awkward surprises"
        description="Every quote lists what is included, what is not, and what counts as an add-on before work starts."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-mineral/20 bg-mineral-muted/70 p-6"
        >
          <p className="mb-4 flex items-center gap-2 text-sm font-bold text-plum-depth">
            <CheckCircle2 size={16} />
            Included in website builds
          </p>
          <ul className="space-y-2.5">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-mineral" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Not included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-black/8 bg-card p-6"
        >
          <p className="mb-4 flex items-center gap-2 text-sm font-bold text-muted-foreground">
            <XCircle size={16} className="text-muted-foreground" />
            Not included (scope boundaries)
          </p>
          <ul className="space-y-2.5">
            {notIncluded.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <XCircle size={15} className="mt-0.5 shrink-0 text-muted-foreground/60" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-lg bg-black/[0.03] p-3 text-xs leading-relaxed text-muted-foreground">
            Add-ons are priced before they are built. That keeps the project clean and protects both sides.
          </p>
        </motion.div>
      </div>
    </SectionShell>
  );
}
