"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle2 } from "lucide-react";

const benefits = [
  "Free 30-minute discovery call",
  "No commitment required",
  "Custom project roadmap included",
  "Transparent pricing — no surprises",
];

export default function CTA() {
  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-amber/20 bg-gradient-to-br from-amber/10 via-card to-card p-10 sm:p-16 lg:p-20"
        >
          {/* Background elements */}
          <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-amber/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-60 w-60 rounded-full bg-orange-500/5 blur-[100px]" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left content */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber-muted px-4 py-1.5 text-xs font-medium text-amber">
                <Calendar size={12} />
                Limited Availability
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Ready to Build{" "}
                <span className="bg-gradient-to-r from-amber to-orange-400 bg-clip-text text-transparent">
                  Something Great?
                </span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Let&apos;s talk about your project. Book a free discovery call and
                we&apos;ll map out exactly how to bring your vision to life.
              </p>
              <ul className="mt-8 space-y-3">
                {benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 size={16} className="shrink-0 text-amber" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - form */}
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-amber/40"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-amber/40"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">
                  Project Type
                </label>
                <select className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-muted-foreground outline-none transition-colors focus:border-amber/40">
                  <option value="">Select a service...</option>
                  <option value="webapp">Web Application</option>
                  <option value="website">Website / Landing Page</option>
                  <option value="ai">AI Solution</option>
                  <option value="other">Something Else</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">
                  Tell us about your project
                </label>
                <textarea
                  rows={4}
                  placeholder="Share your vision, goals, and any key requirements..."
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-amber/40"
                />
              </div>
              <button className="group mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-amber px-7 py-3.5 text-sm font-medium text-amber-foreground transition-all hover:brightness-110 hover:shadow-lg hover:shadow-amber/20">
                Book Your Free Discovery Call
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <p className="text-center text-xs text-muted-foreground/50">
                We typically respond within 2 hours during business days.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
