"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionHeader, SectionShell } from "@/components/section-shell";

const testimonials = [
  {
    quote:
      "They didn't just build a product — they understood our business model and built exactly what our users needed. Engagement tripled in 90 days.",
    name: "Sarah Chen",
    title: "CEO, FinTrack",
    avatar: "SC",
    result: "3x engagement",
  },
  {
    quote:
      "The AI chatbot handles 80% of our support tickets now. ROI was obvious within the first month. This is the best investment we've made this year.",
    name: "Marcus Johnson",
    title: "CTO, Luminary",
    avatar: "MJ",
    result: "80% tickets automated",
  },
  {
    quote:
      "Fast, communicative, and the code quality is genuinely top-notch. First agency I've worked with that actually delivers on time and on budget.",
    name: "Emily Rodriguez",
    title: "Founder, Greenleaf",
    avatar: "ER",
    result: "On time, on budget",
  },
  {
    quote:
      "Concept to launch in 8 weeks. The team was responsive, the process was transparent, and the final product exceeded what we scoped.",
    name: "David Park",
    title: "VP Product, MedSync",
    avatar: "DP",
    result: "8-week delivery",
  },
];

export default function Testimonials() {
  return (
    <SectionShell id="testimonials" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[350px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/[0.08] blur-[130px]" />
      </div>

      <div className="relative z-10">
        <SectionHeader
          eyebrow="Client Results"
          title="Trusted by teams that need dependable delivery"
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mt-12 grid gap-5 sm:grid-cols-2"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-black/8 bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.06)] transition hover:border-amber/25"
            >
              <div className="mb-5 flex items-center justify-between">
                <Quote size={22} className="text-amber/25" />
                <span className="rounded-full bg-amber-muted px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber">
                  {t.result}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-black/8 pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-muted text-xs font-bold text-amber">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.title}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      className="fill-amber text-amber"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
