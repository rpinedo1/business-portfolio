"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle2, ShieldCheck } from "lucide-react";

/* C6 Kennedy: compelling offer, risk reversal
   M7 Objection-first: pre-handle risk, trust, timing
   D10 Conversion UX: friction reduction, microcopy, trust */
const benefits = [
  "Free 30-minute strategy call — no pitch, just clarity",
  "Walk away with a custom project roadmap (yours to keep)",
  "Transparent, fixed-scope pricing — no surprise invoices",
  "No commitment required to get started",
];

export default function CTA() {
  return (
    <section id="contact" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-amber/15 bg-gradient-to-br from-amber/[0.07] via-surface to-surface p-10 sm:p-16 lg:p-20"
        >
          {/* Background warmth */}
          <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-amber/[0.08] blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-60 w-60 rounded-full bg-orange-600/[0.04] blur-[100px]" />

          <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left content */}
            <div>
              {/* C7 Cialdini: scarcity (ethical) */}
              <span className="inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber-muted px-4 py-1.5 text-xs font-medium text-amber">
                <Calendar size={12} />
                2 Spots Left This Quarter
              </span>
              {/* C9 StoryBrand: customer as hero, clear stakes */}
              <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Let&apos;s Turn Your Idea Into{" "}
                <span className="bg-gradient-to-r from-amber to-orange-400 bg-clip-text text-transparent">
                  a Product That Performs
                </span>
              </h2>
              {/* C5 Sugarman: momentum into action */}
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Tell us what you&apos;re building. We&apos;ll tell you exactly
                how we&apos;d approach it, what it&apos;ll take, and whether
                we&apos;re the right team to do it.
              </p>
              <ul className="mt-8 space-y-3">
                {benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-amber"
                    />
                    {b}
                  </li>
                ))}
              </ul>
              {/* Risk reversal trust badge */}
              <div className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-xs text-muted-foreground">
                <ShieldCheck size={14} className="text-amber" />
                100% confidential. We never share your project details.
              </div>
            </div>

            {/* Right — form. D10 Conversion UX: minimal fields, clear labels */}
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-amber/40 focus:ring-1 focus:ring-amber/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Work Email
                  </label>
                  <input
                    type="email"
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-amber/40 focus:ring-1 focus:ring-amber/20"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">
                  What Do You Need?
                </label>
                <select className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-muted-foreground outline-none transition-all focus:border-amber/40 focus:ring-1 focus:ring-amber/20">
                  <option value="">Pick a service...</option>
                  <option value="webapp">Web Application</option>
                  <option value="website">Website / Landing Page</option>
                  <option value="ai">AI Product or Integration</option>
                  <option value="other">Not Sure Yet</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">
                  Tell Us About Your Project
                </label>
                <textarea
                  rows={4}
                  placeholder="What problem are you solving? Who are your users? Any timeline or budget in mind?"
                  className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-amber/40 focus:ring-1 focus:ring-amber/20"
                />
              </div>
              {/* Primary CTA — D6 Fitts's: large, easy to click */}
              <button className="group mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-amber px-8 py-4 text-sm font-semibold text-amber-foreground shadow-lg shadow-amber/15 transition-all hover:brightness-110 hover:shadow-xl hover:shadow-amber/20">
                Book Your Free Discovery Call
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              {/* D10 Conversion UX: reassuring microcopy */}
              <p className="text-center text-xs text-muted-foreground/50">
                We respond within 2 hours on business days. No spam, ever.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
