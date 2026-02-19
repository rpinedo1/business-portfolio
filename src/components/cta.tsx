"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle2, ShieldCheck } from "lucide-react";
import { SectionShell } from "@/components/section-shell";

const benefits = [
  "Free 30-minute strategy call with practical recommendations",
  "Custom project roadmap you keep whether we work together or not",
  "Clear fixed-scope proposal with transparent pricing",
  "Fast response times and direct communication",
];

export default function CTA() {
  return (
    <SectionShell id="contact">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-amber/20 bg-gradient-to-br from-amber/[0.08] via-white to-slate-50 p-8 sm:p-12 lg:p-16"
      >
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-amber/[0.15] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-sky-200/45 blur-3xl" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber-muted px-4 py-1.5 text-xs font-medium text-amber">
              <Calendar size={12} />
              2 spots left this quarter
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Let&apos;s build your next product with confidence
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Share your goals and constraints. You&apos;ll get a practical plan
              with clear scope, timeline, and next steps.
            </p>
            <ul className="mt-7 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-amber" />
                  {benefit}
                </li>
              ))}
            </ul>
            <p className="mt-7 inline-flex items-center gap-2 rounded-lg border border-black/8 bg-white/70 px-4 py-2.5 text-xs text-muted-foreground">
              <ShieldCheck size={14} className="text-amber" />
              100% confidential. We never share project details.
            </p>
          </div>

          <form className="rounded-2xl border border-black/8 bg-white/90 p-6 shadow-[0_1px_3px_rgba(16,24,40,0.08)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-medium text-muted-foreground">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Jane Smith"
                  autoComplete="name"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/40 focus:border-amber/40 focus:ring-1 focus:ring-amber/20"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-medium text-muted-foreground">
                  Work Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="jane@company.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/40 focus:border-amber/40 focus:ring-1 focus:ring-amber/20"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="service" className="mb-2 block text-xs font-medium text-muted-foreground">
                What Do You Need?
              </label>
              <select
                id="service"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-muted-foreground outline-none transition focus:border-amber/40 focus:ring-1 focus:ring-amber/20"
                defaultValue=""
              >
                <option value="">Pick a service...</option>
                <option value="webapp">Web Application</option>
                <option value="website">Website / Landing Page</option>
                <option value="ai">AI Product or Integration</option>
                <option value="other">Not Sure Yet</option>
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="project" className="mb-2 block text-xs font-medium text-muted-foreground">
                Tell Us About Your Project
              </label>
              <textarea
                id="project"
                rows={4}
                placeholder="What problem are you solving? Who are your users? Any timeline or budget in mind?"
                className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/40 focus:border-amber/40 focus:ring-1 focus:ring-amber/20"
              />
            </div>

            <button
              type="submit"
              className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-8 py-3.5 text-sm font-semibold text-amber-foreground shadow-sm shadow-amber/25 transition hover:brightness-105"
            >
              Book Your Free Discovery Call
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground/70">
              We respond within 2 business hours.
            </p>
          </form>
        </div>
      </motion.div>
    </SectionShell>
  );
}
